import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-2 border-primary-100">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-green-600 bg-clip-text text-transparent">
                            RiceGuard AI
                        </span>
                    </Link>

                    <div className="flex items-center space-x-8">
                        <Link
                            to="/"
                            className="text-gray-700 hover:text-primary-600 font-semibold text-lg transition-colors relative group"
                        >
                            Beranda
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-200"></span>
                        </Link>
                        <Link
                            to="/detection"
                            className="text-gray-700 hover:text-primary-600 font-semibold text-lg transition-colors relative group"
                        >
                            Deteksi
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-200"></span>
                        </Link>
                        <Link
                            to="/stats"
                            className="text-gray-700 hover:text-primary-600 font-semibold text-lg transition-colors relative group"
                        >
                            Statistik Model
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-200"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
