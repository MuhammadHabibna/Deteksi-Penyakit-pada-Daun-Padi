import sys
import json
import numpy as np
from tensorflow import keras
from PIL import Image
import os

# Disease class names (CRITICAL: must match exact training order and format)
# Model expects these exact snake_case labels
CLASS_NAMES = [
    'bacterial_leaf_blight',
    'brown_spot',
    'healthy',
    'leaf_blast',
    'leaf_scald',
    'narrow_brown_spot',
    'neck_blast',
    'rice_hispa',
    'sheath_blight',
    'tungro'
]

# Disease-specific advice (keys must match CLASS_NAMES)
DISEASE_ADVICE = {
    'bacterial_leaf_blight': 'Aplikasikan bakterisida berbasis tembaga. Buang dan hancurkan tanaman yang terinfeksi. Gunakan varietas yang tahan dan jaga drainase lapangan yang baik.',
    'brown_spot': 'Aplikasikan fungisida yang mengandung mancozeb atau tembaga. Tingkatkan kesuburan tanah dan hindari stres air. Buang debris yang terinfeksi.',
    'healthy': 'Tanaman padi Anda tampak sehat! Lanjutkan praktik pertanian yang baik, jaga irigasi yang tepat, dan pantau secara berkala.',
    'leaf_blast': 'Aplikasikan fungisida seperti tricyclazole atau azoxystrobin. Gunakan varietas tahan blast dan hindari pemupukan nitrogen berlebihan.',
    'leaf_scald': 'Gunakan varietas yang tahan. Aplikasikan fungisida jika diperlukan. Jaga pemupukan nitrogen seimbang dan jarak tanam yang tepat.',
    'narrow_brown_spot': 'Aplikasikan pupuk kalium untuk meningkatkan kesehatan tanaman. Gunakan fungisida jika infeksi parah. Jaga manajemen air yang tepat.',
    'neck_blast': 'Aplikasikan fungisida sistemik segera. Gunakan varietas tahan dan hindari penanaman padat. Kontrol blast selama fase vegetatif.',
    'rice_hispa': 'Buang dan hancurkan massa telur dan larva. Aplikasikan insektisida yang direkomendasikan. Hindari pemupukan nitrogen berlebihan.',
    'sheath_blight': 'Aplikasikan fungisida seperti validamycin atau hexaconazole. Keringkan sawah secara berkala. Hindari nitrogen berlebihan dan penanaman padat.',
    'tungro': 'Kontrol vektor wereng hijau dengan insektisida. Buang dan hancurkan tanaman yang terinfeksi. Gunakan varietas yang tahan.'
}

# Disease causes/explanations (Indonesian)
DISEASE_CAUSES = {
    'bacterial_leaf_blight': 'Disebabkan oleh bakteri Xanthomonas oryzae pv. oryzae. Penyakit ini menyebar melalui air irigasi, angin, dan alat pertanian yang terkontaminasi. Berkembang pesat pada kondisi lembab dengan suhu 25-34°C, terutama saat musim hujan.',
    'brown_spot': 'Disebabkan oleh jamur Bipolaris oryzae (Helminthosporium oryzae). Penyakit ini muncul karena kekurangan nutrisi, terutama nitrogen dan silikon. Spora jamur menyebar melalui angin dan percikan air hujan.',
    'healthy': 'Tanaman dalam kondisi sehat tanpa tanda-tanda penyakit. Faktor pendukung: nutrisi seimbang, irigasi tepat, drainase baik, dan praktik budidaya yang benar.',
    'leaf_blast': 'Disebabkan oleh jamur Pyricularia oryzae (Magnaporthe grisea). Penyakit ini berkembang pada kelembaban tinggi (>90%), suhu 20-28°C, dan pemupukan nitrogen berlebihan. Spora menyebar melalui angin dan percikan air.',
    'leaf_scald': 'Disebabkan oleh bakteri Microdochium oryzae. Penyakit ini terjadi karena pemupukan nitrogen berlebihan, kelembaban tinggi, dan penanaman terlalu padat. Menyebar melalui air dan kontak langsung antar tanaman.',
    'narrow_brown_spot': 'Disebabkan oleh jamur Cercospora janseana. Penyakit ini muncul karena kekurangan kalium dan kondisi kelembaban tinggi. Spora jamur menyebar melalui angin dan percikan air pada musim hujan.',
    'neck_blast': 'Disebabkan oleh jamur Pyricularia oryzae yang menyerang leher malai. Terjadi karena kelembaban sangat tinggi saat fase pembungaan, pemupukan nitrogen berlebihan, dan varietas rentan. Menyebabkan malai kosong (gabah hampa).',
    'rice_hispa': 'Disebabkan oleh serangga hama Dicladispa armigera. Larva dan dewasa memakan daun sehingga hanya tersisa epidermis. Hama aktif pada musim hujan dan panas. Populasi meningkat pada tanaman yang terlalu rimbun.',
    'sheath_blight': 'Disebabkan oleh jamur Rhizoctonia solani. Berkembang pada kelembaban tinggi, penanaman padat, pemupukan nitrogen berlebihan, dan genangan air. Jamur hidup di tanah dan menyerang dari pangkal batang ke atas.',
    'tungro': 'Disebabkan oleh kombinasi Rice Tungro Spherical Virus (RTSV) dan Rice Tungro Bacilliform Virus (RTBV). Ditularkan oleh serangga wereng hijau (Nephotettix virescens). Penyakit ini tidak dapat diobati, hanya dicegah dengan mengendalikan vektor.'
}

# Model configuration
MODEL_PATH = 'best_rice_model.keras'
IMG_SIZE = 224  # Common size for CNN models, adjust if your model uses different dimensions

# Cache the model to avoid reloading on every prediction
_model = None

def load_model():
    """Load the Keras model (cached after first load)"""
    global _model
    if _model is None:
        try:
            # Get the path to the model file (one directory up from server/)
            model_path = os.path.join(os.path.dirname(__file__), '..', MODEL_PATH)
            _model = keras.models.load_model(model_path)
            print(f"Model loaded successfully from {model_path}", file=sys.stderr)
        except Exception as e:
            print(f"Error loading model: {str(e)}", file=sys.stderr)
            raise
    return _model

def preprocess_image(image_path):
    """Preprocess the image for model prediction"""
    try:
        # Load and resize image
        img = Image.open(image_path)
        img = img.convert('RGB')  # Ensure strict 3 channels (RGB)
        img = img.resize((IMG_SIZE, IMG_SIZE))
        
        # Convert to numpy array
        img_array = np.array(img)
        
        # CRITICAL: DO NOT NORMALIZE - Model trained on 0-255 pixel values!
        # Keep values in range [0, 255]
        img_array = img_array.astype('float32')  # Convert to float32, but NO division by 255
        
        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)
        
        return img_array
    except Exception as e:
        print(f"Error preprocessing image: {str(e)}", file=sys.stderr)
        raise

def predict(image_path):
    """Run prediction on the image"""
    try:
        # Load model
        model = load_model()
        
        # Preprocess image
        img_array = preprocess_image(image_path)
        
        # Make prediction
        predictions = model.predict(img_array, verbose=0)
        
        # Get predicted class and confidence
        predicted_class_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class_idx])
        
        # Get disease name
        disease_name = CLASS_NAMES[predicted_class_idx]
        
        # Get advice and causes
        advice = DISEASE_ADVICE.get(disease_name, 'Konsultasikan dengan ahli pertanian untuk rekomendasi pengobatan spesifik.')
        causes = DISEASE_CAUSES.get(disease_name, 'Informasi penyebab tidak tersedia.')
        
        # Prepare result
        result = {
            'disease': disease_name,
            'confidence': confidence,
            'causes': causes,
            'advice': advice,
            'all_predictions': {
                CLASS_NAMES[i]: float(predictions[0][i]) 
                for i in range(len(CLASS_NAMES))
            }
        }
        
        return result
    except Exception as e:
        print(f"Error during prediction: {str(e)}", file=sys.stderr)
        raise

def main():
    """Main function"""
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No image path provided'}))
        sys.exit(1)
    
    image_path = sys.argv[1]
    
    if not os.path.exists(image_path):
        print(json.dumps({'error': f'Image file not found: {image_path}'}))
        sys.exit(1)
    
    try:
        result = predict(image_path)
        # Output JSON to stdout (this is what Node.js will capture)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)

if __name__ == '__main__':
    main()
