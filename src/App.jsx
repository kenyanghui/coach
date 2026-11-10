import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Growth from './pages/Growth'
import Classics from './pages/Classics'
import Guide from './pages/Guide'
import Buddy from './pages/Buddy'
import Tools from './pages/Tools'
import Skills from './pages/Skills'
import Experts from './pages/Experts'
import Appstory from './pages/Appstory'
import Workshops from './pages/Workshops'
import Coai from './pages/Coai'
import About from './pages/About'

function App() {
  return (
    <div className="min-h-screen bg-dark-bg flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/growth" element={<Growth />} />
          <Route path="/classics" element={<Classics />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/buddy" element={<Buddy />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/appstory" element={<Appstory />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/coai" element={<Coai />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
