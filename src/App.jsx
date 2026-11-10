import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Applicant from './pages/Applicant.jsx';
import Coach from './pages/Coach.jsx';
import Review from './pages/Review.jsx';
import Policies from './pages/Policies.jsx';
import Materials from './pages/Materials.jsx';
import Workshops from './pages/Workshops.jsx';
import Cases from './pages/Cases.jsx';
import About from './pages/About.jsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#1d1d1f] antialiased">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/applicant" element={<Applicant />} />
        <Route path="/coach" element={<Coach />} />
        <Route path="/review" element={<Review />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/cases" element={<Cases />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}
