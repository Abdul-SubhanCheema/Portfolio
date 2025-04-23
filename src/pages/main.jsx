import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import profileImg from '../assets/profile.jpg'

const Particle = ({ id }) => (
  <div 
    key={id}
    className="absolute rounded-full bg-blue-300 opacity-30"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 8 + 2}px`,
      height: `${Math.random() * 8 + 2}px`,
      animation: `float ${Math.random() * 10 + 10}s linear infinite`,
    }}
  />
);

export default function Portfolio() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
    setParticles(Array.from({ length: particleCount }, (_, i) => i));

    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(10px, 10px) rotate(5deg); }
        50% { transform: translate(0, 20px) rotate(0deg); }
        75% { transform: translate(-10px, 10px) rotate(-5deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(id => <Particle key={id} id={id} />)}
      </div>

      <Navbar />

      <main className="flex-grow flex items-center justify-center px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-5xl w-full">
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hi, I'm <span className="text-blue-300">Your Name</span>
            </h1>
            <h2 className="text-xl md:text-2xl mb-6 text-gray-300">
              Web Developer & Designer
            </h2>
            <p className="text-gray-400 mb-8">
              I create beautiful, functional websites with modern technologies.
              Specializing in React, Tailwind CSS, and creating interactive user experiences.
            </p>
            <motion.button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.button>
          </motion.div>

          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-30 scale-110" />
              <img 
                src={profileImg}
                alt="Profile" 
                className="rounded-full h-64 w-64 object-cover relative border-4 border-blue-500" 
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
