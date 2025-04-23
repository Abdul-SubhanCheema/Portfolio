import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './pages/main';
import About from './pages/about';
import Contact from './pages/contact';
import Projects from './pages/projects';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
