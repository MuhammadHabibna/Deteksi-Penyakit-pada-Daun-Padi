import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Hardcoded dataset statistics
const DATASET_STATS = {
    totalImages: 15023,
    testAccuracy: 97.52,
    classes: [
        { name: 'Bacterial Leaf Blight', nameId: 'Hawar Daun Bakteri', count: 1386, color: '#ef4444' },
        { name: 'Brown Spot', nameId: 'Bercak Coklat', count: 1480, color: '#f97316' },
        { name: 'Healthy', nameId: 'Sehat', count: 1491, color: '#22c55e' },
        { name: 'Leaf Blast', nameId: 'Blas Daun', count: 1801, color: '#eab308' },
        { name: 'Leaf Scald', nameId: 'Hawar Pelepah Daun', count: 1670, color: '#a855f7' },
        { name: 'Narrow Brown Spot', nameId: 'Bercak Coklat Sempit', count: 1416, color: '#ec4899' },
        { name: 'Neck Blast', nameId: 'Blas Leher', count: 1000, color: '#f43f5e' },
        { name: 'Rice Hispa', nameId: 'Hispa Padi', count: 1461, color: '#8b5cf6' },
        { name: 'Sheath Blight', nameId: 'Hawar Pelepah', count: 1578, color: '#06b6d4' },
        { name: 'Tungro', nameId: 'Tungro', count: 1740, color: '#3b82f6' }
    ]
}

export default function ModelStats() {
    return (
        <div className="min-h-[calc(100vh-80px)] py-12 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-14">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-green-600 bg-clip-text text-transparent">
                        📊 Statistik Performa Model
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Tinjauan komprehensif metrik pelatihan dan validasi model AI kami
                    </p>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-14">
                    {/* Total Dataset */}
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-shadow border-2 border-blue-400">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Total Dataset</h3>
                            <svg className="w-12 h-12 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-6xl font-black mb-2 drop-shadow-lg">
                            {DATASET_STATS.totalImages.toLocaleString()}
                        </p>
                        <p className="text-blue-100 text-lg font-semibold">Gambar Terverifikasi</p>
                    </div>

                    {/* Test Accuracy */}
                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl transition-shadow border-2 border-green-400">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Akurasi Test</h3>
                            <svg className="w-12 h-12 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-6xl font-black mb-2 drop-shadow-lg">
                            {DATASET_STATS.testAccuracy}%
                        </p>
                        <p className="text-green-100 text-lg font-semibold">Performa Model</p>
                    </div>

                    {/* Disease Classes */}
                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-shadow border-2 border-purple-400">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold">Kelas Penyakit</h3>
                            <svg className="w-12 h-12 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <p className="text-6xl font-black mb-2 drop-shadow-lg">
                            {DATASET_STATS.classes.length}
                        </p>
                        <p className="text-purple-100 text-lg font-semibold">Kategori Terdeteksi</p>
                    </div>
                </div>

                {/* Dataset Distribution Chart */}
                <div className="card mb-10 shadow-xl border-2 border-gray-200">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
                        <span className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mr-4">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </span>
                        Distribusi Kelas Dataset
                    </h2>
                    <div className="h-[450px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={DATASET_STATS.classes}
                                margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="nameId"
                                    angle={-45}
                                    textAnchor="end"
                                    height={120}
                                    interval={0}
                                    tick={{ fontSize: 13, fontWeight: 600 }}
                                />
                                <YAxis
                                    label={{ value: 'Jumlah Gambar', angle: -90, position: 'insideLeft', style: { fontSize: 14, fontWeight: 600 } }}
                                    tick={{ fontSize: 13 }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', border: '2px solid #22c55e', borderRadius: '12px', padding: '12px', fontWeight: 600 }}
                                    cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
                                />
                                <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: 600 }} />
                                <Bar
                                    dataKey="count"
                                    fill="#22c55e"
                                    name="Jumlah Gambar"
                                    radius={[10, 10, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Detailed Class Breakdown */}
                <div className="card shadow-xl border-2 border-gray-200 mb-10">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
                        <span className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mr-4">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </span>
                        Rincian Detail Kelas
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {DATASET_STATS.classes.map((cls, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:shadow-md transition-shadow border-2 border-gray-200 hover:border-primary-300"
                            >
                                <div className="flex items-center space-x-4">
                                    <div
                                        className="w-6 h-6 rounded-full shadow-md"
                                        style={{ backgroundColor: cls.color }}
                                    ></div>
                                    <span className="font-bold text-gray-800 text-lg">{cls.nameId}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-gray-900">{cls.count.toLocaleString()}</p>
                                    <p className="text-sm text-gray-500 font-semibold">
                                        {((cls.count / DATASET_STATS.totalImages) * 100).toFixed(1)}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Training Details */}
                <div className="card bg-gradient-to-br from-gray-50 via-white to-green-50 shadow-xl border-2 border-primary-200">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 flex items-center">
                        <span className="w-12 h-12 gradient-bg rounded-lg flex items-center justify-center mr-4">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </span>
                        Informasi Pelatihan
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="font-bold text-gray-700 mb-3 text-xl">Arsitektur Model</h3>
                            <p className="text-gray-600 text-lg">Deep Convolutional Neural Network (CNN)</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="font-bold text-gray-700 mb-3 text-xl">Framework</h3>
                            <p className="text-gray-600 text-lg">TensorFlow / Keras</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="font-bold text-gray-700 mb-3 text-xl">Augmentasi Data</h3>
                            <p className="text-gray-600 text-lg">Rotasi, Flip, Zoom, Kecerahan</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                            <h3 className="font-bold text-gray-700 mb-3 text-xl">Metode Validasi</h3>
                            <p className="text-gray-600 text-lg">Pembagian 80/20 Train-Test</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
