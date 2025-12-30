# RiceGuard AI 🌾

Modern, stateless web application for Rice Leaf Disease Detection using AI. Built with React.js, Node.js/Express, and Python for AI inference.

## Features

- ✨ **Instant Detection**: No login required, privacy-focused
- 🎯 **High Accuracy**: 95.2% test accuracy on 15,023+ verified images
- 📸 **Multiple Input Methods**: Upload images or use camera
- 🔒 **Privacy First**: Images processed temporarily and immediately deleted
- 💡 **Treatment Advice**: Get disease-specific recommendations
- 📊 **Model Transparency**: View training statistics and performance

## Disease Classes Detected

1. Bacterial Leaf Blight
2. Brown Spot
3. Healthy
4. Leaf Blast
5. Leaf Scald
6. Narrow Brown Spot
7. Neck Blast
8. Rice Hispa
9. Sheath Blight
10. Tungro

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS for styling
- Recharts for data visualization
- React Router for navigation
- Axios for HTTP requests

### Backend
- Node.js with Express.js
- Multer for file uploads
- CORS enabled

### AI Integration
- Python 3.x
- TensorFlow/Keras for model inference
- PIL for image preprocessing

## Prerequisites

Before running this application, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Python** (3.8 or higher)
- **pip** (Python package manager)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "Deteksi Penyakit Daun Padi"
```

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

### 3. Install Python Dependencies

```bash
# Make sure you're in the server directory
pip install -r requirements.txt
```

### 4. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## Model Setup

The application requires a trained Keras model file named `best_rice_model.keras`. This file should be placed in the **root directory** of the project:

```
Deteksi Penyakit Daun Padi/
├── best_rice_model.keras  ← Place model here
├── client/
├── server/
└── README.md
```

## Running the Application

### Start the Backend Server

Open a terminal and run:

```bash
cd server
npm start
```

The server will start on `http://localhost:5000`

### Start the Frontend Development Server

Open a **new terminal** and run:

```bash
cd client
npm run dev
```

The frontend will start on `http://localhost:5173`

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## Project Structure

```
Deteksi Penyakit Daun Padi/
├── best_rice_model.keras       # Trained Keras model
├── client/                      # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Detection.jsx
│   │   │   └── ModelStats.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                      # Node.js backend
│   ├── uploads/                 # Temporary upload directory
│   ├── server.js                # Express server
│   ├── predict.py               # Python inference script
│   ├── requirements.txt         # Python dependencies
│   └── package.json
└── README.md
```

## API Endpoints

### POST `/api/predict`

Upload an image for disease detection.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with `image` field

**Response:**
```json
{
  "disease": "Bacterial Leaf Blight",
  "confidence": 0.95,
  "advice": "Apply copper-based bactericides...",
  "all_predictions": {
    "Bacterial Leaf Blight": 0.95,
    "Brown Spot": 0.02,
    ...
  }
}
```

### GET `/api/health`

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "RiceGuard AI Server is running"
}
```

## How It Works

1. **Upload**: User uploads a rice leaf image via drag-drop or camera
2. **Processing**: Image is sent to Express backend via `/api/predict`
3. **AI Inference**: Backend spawns Python process to run `predict.py`
4. **Prediction**: Python loads the Keras model, preprocesses image, and returns JSON
5. **Display**: Frontend shows disease name, confidence score, and advice
6. **Cleanup**: Image is automatically deleted from server

## Model Information

- **Dataset**: 15,023 verified images
- **Test Accuracy**: 95.2%
- **Architecture**: Deep Convolutional Neural Network (CNN)
- **Framework**: TensorFlow/Keras
- **Input Size**: 224x224 RGB images
- **Preprocessing**: Resize, normalize to [0, 1]

## Troubleshooting

### Backend Issues

**Server won't start:**
- Ensure Node.js is installed: `node --version`
- Check if port 5000 is available
- Install dependencies: `npm install`

**Python errors:**
- Ensure Python is in PATH: `python --version`
- Install dependencies: `pip install -r requirements.txt`
- Check model file exists in root directory

### Frontend Issues

**Development server won't start:**
- Ensure Node.js is installed: `node --version`
- Install dependencies: `npm install`
- Check if port 5173 is available

**API errors:**
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify CORS is enabled on backend

### Model Issues

**Model not found:**
- Ensure `best_rice_model.keras` is in the root directory
- Check file permissions

**Low accuracy:**
- Ensure images are clear and well-lit
- Rice leaf should be the main subject
- Avoid blurry or distant images

## Development

### Frontend Development

```bash
cd client
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
```

### Backend Development

```bash
cd server
npm start         # Start server
npm run dev       # Start with nodemon (auto-restart)
```

## Production Deployment

### Build Frontend

```bash
cd client
npm run build
```

The built files will be in `client/dist/`

### Serve Frontend

You can serve the built frontend using:
- Nginx
- Apache
- Vercel
- Netlify
- Any static hosting service

### Deploy Backend

For production, consider:
- Using PM2 for process management
- Setting up environment variables
- Using a reverse proxy (Nginx)
- Implementing rate limiting
- Adding authentication if needed

## License

MIT License

## Contact

For questions or issues, please open an issue on the repository.

---

**Built with ❤️ for farmers and agricultural researchers**
