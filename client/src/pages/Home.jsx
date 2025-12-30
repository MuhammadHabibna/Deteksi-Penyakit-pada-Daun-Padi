import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="min-h-[calc(100vh-80px)]">
            {/* Hero Section */}
            <section className="gradient-bg text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-8">
                            <span className="inline-block bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold mb-4">
                                🌾 Platform Deteksi Penyakit Padi Berbasis AI
                            </span>
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black mb-6 drop-shadow-lg">
                            RiceGuard AI
                        </h1>
                        <p className="text-3xl md:text-4xl font-bold mb-4">
                            Deteksi Penyakit Daun Padi Secara Instan
                        </p>
                        <p className="text-xl md:text-2xl mb-10 text-green-50 font-light">
                            Tanpa Login. Hasil Instan. Fokus Privasi.
                        </p>
                        <Link
                            to="/detection"
                            className="inline-block bg-white text-primary-600 font-bold py-5 px-10 rounded-xl text-xl hover:bg-green-50 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
                        >
                            Mulai Deteksi Sekarang →
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-4 text-gray-800">
                        Mengapa Memilih RiceGuard AI?
                    </h2>
                    <p className="text-center text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
                        Platform deteksi penyakit padi paling canggih dengan teknologi AI terdepan
                    </p>

                    <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {/* Feature 1 */}
                        <div className="card text-center group hover:scale-105 border-2 border-transparent hover:border-primary-300">
                            <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Fokus Privasi</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Gambar diproses secara instan dan tidak pernah disimpan. Data Anda tetap milik Anda.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card text-center group hover:scale-105 border-2 border-transparent hover:border-primary-300">
                            <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Akurasi Tinggi</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Dilatih dengan 15.000+ gambar terverifikasi menggunakan deep learning terkini.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card text-center group hover:scale-105 border-2 border-transparent hover:border-primary-300">
                            <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform shadow-lg">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-800">Hasil Real-time</h3>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Dapatkan deteksi penyakit dan rekomendasi pengobatan instan dalam hitungan detik.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-5xl font-bold text-center mb-4 text-gray-800">
                        Cara Kerjanya
                    </h2>
                    <p className="text-center text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
                        Tiga langkah sederhana untuk melindungi tanaman padi Anda
                    </p>

                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-8 mb-10 group">
                            <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center text-white text-4xl font-black flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                                1
                            </div>
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-3 text-gray-800">Upload atau Ambil Foto</h3>
                                <p className="text-gray-600 text-xl leading-relaxed">
                                    Ambil foto daun padi Anda atau upload gambar yang sudah ada.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-8 mb-10 group">
                            <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center text-white text-4xl font-black flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                                2
                            </div>
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-3 text-gray-800">Analisis AI</h3>
                                <p className="text-gray-600 text-xl leading-relaxed">
                                    Model AI kami menganalisis gambar untuk pola penyakit secara real-time.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-8 group">
                            <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center text-white text-4xl font-black flex-shrink-0 shadow-xl group-hover:scale-110 transition-transform">
                                3
                            </div>
                            <div className="flex-1">
                                <h3 className="text-3xl font-bold mb-3 text-gray-800">Dapatkan Hasil</h3>
                                <p className="text-gray-600 text-xl leading-relaxed">
                                    Terima identifikasi penyakit, skor kepercayaan, dan saran pengobatan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 gradient-bg text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                </div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">Siap Melindungi Tanaman Padi Anda?</h2>
                    <p className="text-2xl mb-10 text-green-50 font-light max-w-3xl mx-auto">
                        Mulai deteksi penyakit pada tanaman padi Anda sekarang - tanpa perlu mendaftar!
                    </p>
                    <Link
                        to="/detection"
                        className="inline-block bg-white text-primary-600 font-bold py-5 px-10 rounded-xl text-xl hover:bg-green-50 transition-all duration-200 shadow-2xl hover:shadow-3xl transform hover:scale-105 hover:-translate-y-1"
                    >
                        Luncurkan Alat Deteksi →
                    </Link>
                </div>
            </section>
        </div>
    )
}
