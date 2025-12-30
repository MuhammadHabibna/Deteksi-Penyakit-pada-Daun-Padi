# 🚀 Quick Start Guide - RiceGuard AI

## Installation Commands (Use Command Prompt, NOT PowerShell)

### 1. Install Frontend Dependencies
```cmd
cd "d:\Dokumen\Anti Gravity\Proyek Sains Data\Deteksi Penyakit Daun Padi\client"
npm install
```

### 2. Install Backend Dependencies
```cmd
cd "d:\Dokumen\Anti Gravity\Proyek Sains Data\Deteksi Penyakit Daun Padi\server"
npm install
```

### 3. Install Python Dependencies
```cmd
cd "d:\Dokumen\Anti Gravity\Proyek Sains Data\Deteksi Penyakit Daun Padi"
pip install -r requirements.txt
```

---

## Running the Application

### Terminal 1: Start Backend Server
```cmd
cd "d:\Dokumen\Anti Gravity\Proyek Sains Data\Deteksi Penyakit Daun Padi\server"
npm start
```

**Expected output:**
```
🚀 RiceGuard AI Server running on http://localhost:5000
📁 Uploads directory: ...
```

### Terminal 2: Start Frontend Dev Server
```cmd
cd "d:\Dokumen\Anti Gravity\Proyek Sains Data\Deteksi Penyakit Daun Padi\client"
npm run dev
```

**Expected output:**
```
VITE vX.X.X  ready in XXX ms

➜  Local:   http://localhost:5173/
```

### Access the App
Open browser to: **http://localhost:5173**

---

## Troubleshooting

**PowerShell Error:**
> ✅ Use Command Prompt (cmd.exe), NOT PowerShell

**Python not found:**
```cmd
python --version
pip --version
```
If not found, install Python 3.8+ and add to PATH

**Port already in use:**
- Backend (5000): Close other apps using port 5000
- Frontend (5173): Close other Vite instances

**Model not found:**
- Ensure `best_rice_model.keras` is in the ROOT directory
- Path: `d:\Dokumen\Anti Gravity\Proyek Sains Data\Deteksi Penyakit Daun Padi\best_rice_model.keras`

---

## 📁 File Structure Reference

```
Deteksi Penyakit Daun Padi/
├── best_rice_model.keras  ← Must be here
├── client/                 ← React frontend
├── server/                 ← Node.js backend
└── README.md              ← Full documentation
```

---

## Quick Test

1. Go to http://localhost:5173
2. Navigate to "Deteksi" page
3. Upload a rice leaf image (drag & drop or browse)
4. Click "🔍 Analisis Gambar"
5. View disease detection result with bilingual names!

---

**Need help?** Check the full README.md for detailed documentation.
