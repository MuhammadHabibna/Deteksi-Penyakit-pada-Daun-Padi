const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'));
        }
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'RiceGuard AI Server is running' });
});

// Prediction endpoint
app.post('/api/predict', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file provided' });
    }

    const imagePath = req.file.path;
    console.log(`Processing image: ${imagePath}`);

    // Spawn Python process
    const pythonProcess = spawn('python', ['predict.py', imagePath], {
        cwd: __dirname
    });

    let dataString = '';
    let errorString = '';

    // Collect data from Python script
    pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
        console.error('Python stderr:', data.toString());
    });

    // Handle process completion
    pythonProcess.on('close', (code) => {
        // Delete the uploaded file
        fs.unlink(imagePath, (err) => {
            if (err) console.error('Error deleting file:', err);
            else console.log('File deleted:', imagePath);
        });

        if (code !== 0) {
            console.error('Python process failed with code:', code);
            console.error('Error output:', errorString);
            return res.status(500).json({
                error: 'Prediction failed. Please try again.',
                details: errorString
            });
        }

        try {
            const result = JSON.parse(dataString);
            console.log('Prediction result:', result);
            res.json(result);
        } catch (err) {
            console.error('Failed to parse Python output:', dataString);
            console.error('Parse error:', err);
            res.status(500).json({
                error: 'Invalid response from prediction model',
                details: dataString
            });
        }
    });

    // Handle process errors
    pythonProcess.on('error', (err) => {
        console.error('Failed to start Python process:', err);

        // Delete the uploaded file
        fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) console.error('Error deleting file:', unlinkErr);
        });

        res.status(500).json({
            error: 'Failed to start prediction process',
            details: err.message
        });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        error: err.message || 'Internal server error'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 RiceGuard AI Server running on http://localhost:${PORT}`);
    console.log(`📁 Uploads directory: ${uploadsDir}`);
});
