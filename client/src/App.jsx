import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Detection from './pages/Detection'
import ModelStats from './pages/ModelStats'

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/detection" element={<Detection />} />
                        <Route path="/stats" element={<ModelStats />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    )
}

export default App
