import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

// Disease advice mapping (Indonesian) - keys MUST match backend snake_case format
const DISEASE_ADVICE = {
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

// Display name mapping for user-friendly output (Indonesian + English)
const DISPLAY_NAMES = {
    'bacterial_leaf_blight': 'Hawar Daun Bakteri (Bacterial Leaf Blight)',
    'brown_spot': 'Bercak Coklat (Brown Spot)',
    'healthy': 'Sehat (Healthy)',
    'leaf_blast': 'Blas Daun (Leaf Blast)',
    'leaf_scald': 'Hawar Pelepah Daun (Leaf Scald)',
    'narrow_brown_spot': 'Bercak Coklat Sempit (Narrow Brown Spot)',
    'neck_blast': 'Blas Leher (Neck Blast)',
    'rice_hispa': 'Hispa Padi (Rice Hispa)',
    'sheath_blight': 'Hawar Pelepah (Sheath Blight)',
    'tungro': 'Tungro (Tungro)'
}

// Loading animation component
function LoadingAnimation() {
    const [step, setStep] = useState(0)
    const steps = [
        { icon: '📤', text: 'Mengunggah gambar...' },
        { icon: '🔍', text: 'Memproses gambar...' },
        { icon: '🤖', text: 'Menganalisis dengan AI...' },
        { icon: '📊', text: 'Menghitung tingkat kepercayaan...' }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prev) => (prev + 1) % steps.length)
        }, 1500)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="card mb-8 bg-gradient-to-br from-blue-50 to-green-50 border-2 border-primary-200">
            <div className="text-center py-12">
                {/* Animated Icon */}
                <div className="mb-6">
                    <div className="w-24 h-24 mx-auto bg-primary-100 rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-5xl animate-bounce">{steps[step].icon}</span>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        Sedang Menganalisis...
                    </h3>
                    <p className="text-lg text-gray-600 font-medium">
                        {steps[step].text}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="max-w-md mx-auto mb-6">
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                            className="h-full gradient-bg transition-all duration-300 ease-linear"
                            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Spinning Loader */}
                <div className="flex justify-center items-center gap-2">
                    <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>

                {/* Tip */}
                <p className="text-sm text-gray-500 mt-6 italic">
                    💡 Tip: Pastikan gambar daun padi jelas dan fokus untuk hasil terbaik
                </p>
            </div>
        </div>
    )
}

export default function Detection() {
    const [selectedImage, setSelectedImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)
    const [error, setError] = useState(null)
    const fileInputRef = useRef(null)

    const handleFileSelect = (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file)
            setPreview(URL.createObjectURL(file))
            setResult(null)
            setError(null)
        } else {
            setError('Silakan pilih file gambar yang valid')
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file && file.type.startsWith('image/')) {
            setSelectedImage(file)
            setPreview(URL.createObjectURL(file))
            setResult(null)
            setError(null)
        } else {
            setError('Silakan drop file gambar yang valid')
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }



    const handleUpload = async () => {
        if (!selectedImage) {
            setError('Silakan pilih gambar terlebih dahulu')
            return
        }

        setLoading(true)
        setError(null)
        setResult(null)

        const formData = new FormData()
        formData.append('image', selectedImage)

        try {
            const response = await axios.post('/api/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            setResult(response.data)
        } catch (err) {
            setError(err.response?.data?.error || 'Gagal memproses gambar. Silakan coba lagi.')
            console.error('Upload error:', err)
        } finally {
            setLoading(false)
        }
    }

    const resetDetection = () => {
        setSelectedImage(null)
        setPreview(null)
        setResult(null)
        setError(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="min-h-[calc(100vh-80px)] py-12 bg-gradient-to-b from-gray-50 to-green-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-green-700 bg-clip-text text-transparent">
                        🔬 Deteksi Penyakit
                    </h1>
                    <p className="text-xl text-gray-700">
                        Unggah gambar daun padi untuk deteksi penyakit berbasis AI secara instan
                    </p>
                </div>

                {/* Loading Animation */}
                {loading && <LoadingAnimation />}

                {/* Upload Area */}
                {!preview && !loading && (
                    <div className="card mb-8 hover:shadow-2xl transition-shadow duration-300">
                        <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            className="border-4 border-dashed border-primary-300 rounded-xl p-16 text-center hover:border-primary-500 hover:bg-primary-50 transition-all cursor-pointer group"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <svg className="w-20 h-20 mx-auto mb-6 text-primary-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <p className="text-2xl font-bold mb-3 text-gray-800">
                                Letakkan gambar di sini atau klik untuk browse
                            </p>
                            <p className="text-lg text-gray-600 mb-2">
                                Format: JPG, PNG, JPEG
                            </p>
                            <p className="text-sm text-gray-500">
                                Maksimal 10MB
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>
                    </div>
                )}



                {/* Image Preview */}
                {preview && !result && !loading && (
                    <div className="card mb-8 hover:shadow-2xl transition-shadow duration-300">
                        <div className="bg-gray-100 rounded-lg p-4 mb-6">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full max-h-96 object-contain rounded-lg shadow-md"
                            />
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={handleUpload}
                                disabled={loading}
                                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg px-10 py-4 font-bold"
                            >
                                🔍 Analisis Gambar
                            </button>
                            <button onClick={resetDetection} className="btn-secondary text-lg px-8 py-4">
                                ↻ Coba Lagi
                            </button>
                        </div>
                    </div>
                )}

                {/* Error Display */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-5 mb-8 rounded-lg shadow-md">
                        <div className="flex items-center">
                            <svg className="w-7 h-7 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-red-700 font-semibold text-lg">{error}</p>
                        </div>
                    </div>
                )}

                {/* Results Display */}
                {result && !loading && (
                    <div className="card mb-8 bg-gradient-to-br from-white via-green-50 to-blue-50 border-2 border-primary-200 hover:shadow-2xl transition-shadow duration-300">
                        <div className="bg-gray-100 rounded-lg p-4 mb-6">
                            <img
                                src={preview}
                                alt="Analyzed"
                                className="w-full max-h-64 object-contain rounded-lg shadow-md"
                            />
                        </div>

                        <div className="text-center mb-6">
                            <div className="inline-block bg-primary-100 px-6 py-2 rounded-full mb-4">
                                <p className="text-sm font-bold text-primary-700 uppercase tracking-wide">Hasil Deteksi</p>
                            </div>

                            <div className="mb-8">
                                <p className="text-lg font-semibold text-gray-600 mb-3">Penyakit Terdeteksi</p>
                                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-primary-300">
                                    <p className="text-5xl font-black text-primary-700 mb-2">
                                        {DISPLAY_NAMES[result.disease] || result.disease}
                                    </p>
                                </div>
                            </div>

                            {/* Confidence Score */}
                            <div className="mb-8">
                                <p className="text-lg font-semibold text-gray-600 mb-4">Tingkat Kepercayaan</p>
                                <div className="max-w-md mx-auto">
                                    <div className="bg-gray-200 rounded-full h-10 overflow-hidden relative shadow-inner">
                                        <div
                                            className="gradient-bg h-full transition-all duration-1000 ease-out flex items-center justify-end pr-6"
                                            style={{ width: `${(result.confidence * 100).toFixed(1)}%` }}
                                        >
                                            <span className="text-white font-bold text-lg drop-shadow-md">
                                                {(result.confidence * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {result.confidence >= 0.9 ? '✅ Sangat Yakin' : result.confidence >= 0.7 ? '✓ Cukup Yakin' : '⚠ Perlu Verifikasi'}
                                    </p>
                                </div>
                            </div>

                            {/* Treatment Advice */}
                            <div className="bg-gradient-to-br from-white to-primary-50 rounded-xl p-8 shadow-xl text-left border-2 border-primary-200">
                                <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                                    <span className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center mr-3">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                    Rekomendasi Pengobatan
                                </h3>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {result.advice || DISEASE_ADVICE[result.disease] || 'Konsultasikan dengan ahli pertanian untuk rekomendasi pengobatan spesifik.'}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={resetDetection}
                            className="btn-primary w-full text-lg py-4 font-bold"
                        >
                            ↻ Analisis Gambar Lain
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
