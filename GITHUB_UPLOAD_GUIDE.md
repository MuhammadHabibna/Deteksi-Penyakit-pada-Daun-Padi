# 🚀 Panduan Upload ke GitHub

## ⚠️ PENTING: Model File Terlalu Besar!

**MASALAH UTAMA:**
- File `best_rice_model.keras` berukuran **~356MB** 
- GitHub limit: **100MB per file**
- ❌ **TIDAK BISA** langsung upload!

---

## ✅ Solusi: 3 Opsi

### **OPSI 1: Git LFS (Recommended untuk Private Repo)**

Git Large File Storage untuk file besar:

```bash
# 1. Install Git LFS
# Download: https://git-lfs.github.com/

# 2. Initialize Git LFS
git lfs install

# 3. Track model files
git lfs track "*.keras"
git lfs track "*.h5"

# 4. Commit .gitattributes
git add .gitattributes
git commit -m "Add Git LFS tracking"

# 5. Add model file
git add best_rice_model.keras
git commit -m "Add trained model via Git LFS"

# 6. Push to GitHub
git push origin main
```

**Catatan:** Git LFS gratis untuk repo private, ada limit untuk public repo.

---

### **OPSI 2: External Storage + Download Script (Recommended untuk Public Repo)**

Upload model ke Google Drive/Dropbox, download saat deployment:

#### **Langkah 1: Upload Model ke Google Drive**
1. Upload `best_rice_model.keras` ke Google Drive
2. Set sharing: "Anyone with the link can view"
3. Copy link ID dari URL: `https://drive.google.com/file/d/{FILE_ID}/view`

#### **Langkah 2: Buat download script**

File: `scripts/download_model.py`
```python
import gdown
import os

# Google Drive file ID (ganti dengan ID Anda)
FILE_ID = "YOUR_FILE_ID_HERE"
OUTPUT_PATH = "best_rice_model.keras"

# Download if model doesn't exist
if not os.path.exists(OUTPUT_PATH):
    print("Downloading model...")
    url = f"https://drive.google.com/uc?id={FILE_ID}"
    gdown.download(url, OUTPUT_PATH, quiet=False)
    print("Model downloaded successfully!")
else:
    print("Model already exists.")
```

#### **Langkah 3: Update README**
Tambahkan instruksi:
```bash
# Install gdown
pip install gdown

# Download model
python scripts/download_model.py
```

---

### **OPSI 3: Hugging Face Hub (Recommended untuk ML Projects)**

Upload model ke Hugging Face (gratis, unlimited):

```bash
# 1. Install Hugging Face Hub
pip install huggingface_hub

# 2. Login
huggingface-cli login

# 3. Upload model
huggingface-cli upload muhammadhabibna/riceguard-model best_rice_model.keras

# 4. Download dalam kode
from huggingface_hub import hf_hub_download
model_path = hf_hub_download(
    repo_id="muhammadhabibna/riceguard-model",
    filename="best_rice_model.keras"
)
```

---

## 📋 Checklist Sebelum Upload

### ✅ Yang HARUS di-commit:
- [x] Source code (client/, server/)
- [x] README.md & QUICKSTART.md
- [x] package.json files
- [x] .gitignore
- [x] requirements.txt (untuk Python dependencies)

### ❌ Yang TIDAK boleh di-commit:
- [ ] `node_modules/` (sudah di .gitignore)
- [ ] `best_rice_model.keras` (terlalu besar!)
- [ ] `server/uploads/` (temporary files)
- [ ] `.env` files (credentials)
- [ ] `package-lock.json` (opsional, bisa di-ignore)

---

## 🔧 Langkah Upload ke GitHub

### **1. Initialize Git (jika belum)**
```bash
cd "d:\Dokumen\Anti Gravity\Proyek Sains Data\Deteksi Penyakit Daun Padi"
git init
git branch -M main
```

### **2. Add & Commit**
```bash
# Add semua file (kecuali yang di .gitignore)
git add .

# Commit
git commit -m "Initial commit: RiceGuard AI - Rice Disease Detection"
```

### **3. Create GitHub Repo**
1. Buka https://github.com/new
2. Nama repo: `riceguard-ai` atau `rice-disease-detection`
3. **JANGAN** centang "Initialize with README" (sudah ada)
4. Create repository

### **4. Push ke GitHub**
```bash
# Add remote (ganti USERNAME dengan GitHub username Anda)
git remote add origin https://github.com/USERNAME/riceguard-ai.git

# Push
git push -u origin main
```

---

## 🌐 Deployment (Opsional)

Jika ingin deploy online, ikuti panduan terpisah.

**Frontend Options:**
- Vercel (recommended)
- Netlify
- GitHub Pages (static only)

**Backend Options:**
- Railway (recommended)
- Render
- Heroku

---

## 📝 Catatan Penting

1. **Model File:** Gunakan salah satu dari 3 opsi di atas
2. **Environment Variables:** Jangan commit `.env`, gunakan GitHub Secrets
3. **Dependencies:** `package.json` dan `requirements.txt` sudah cukup
4. **Documentation:** README.md sudah menjelaskan cara setup

---

## 🆘 Troubleshooting

**Error: "remote: error: File best_rice_model.keras is 356 MB; this exceeds GitHub's file size limit of 100 MB"**
- ✅ Hapus dari staging: `git rm --cached best_rice_model.keras`
- ✅ Pastikan sudah di .gitignore
- ✅ Gunakan salah satu opsi di atas

**Error: "PowerShell execution policy"**
- ✅ Gunakan Command Prompt (CMD) bukan PowerShell
- ✅ Atau aktifkan PowerShell: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`

---

**Status:** ✅ .gitignore sudah updated dan comprehensive!
