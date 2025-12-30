export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-auto border-t-4 border-primary-500">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Copyright */}
                    <div className="mb-4 md:mb-0 text-center md:text-left">
                        <p className="text-lg font-semibold mb-1">
                            🌾 RiceGuard AI
                        </p>
                        <p className="text-gray-300 text-sm">
                            © 2025 <span className="text-primary-400 font-bold">@muhammadhabibna</span>. All rights reserved.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center gap-6">
                        <a
                            href="https://www.linkedin.com/in/muhammad-habib-nur-aiman-b82b07313/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            <span className="font-semibold">LinkedIn</span>
                        </a>

                        <a
                            href="https://www.tiktok.com/@muhammadhabibna"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-black hover:bg-gray-900 px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                            <span className="font-semibold">TikTok</span>
                        </a>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-6 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
                    <p>Dibuat dengan ❤️ untuk petani Indonesia | AI-Powered Rice Disease Detection</p>
                </div>
            </div>
        </footer>
    )
}
