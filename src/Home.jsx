import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Server, Database, Code, Terminal, Layout, Figma, Git, Docker } from 'lucide-react';
import Navbar from './components/navbar';

// Particle component
const Particle = ({ id }) => {
  return (
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
};

// Skill Component
const Skill = ({ icon, name, level }) => {
  const Icon = icon;
  
  return (
    <motion.div 
      className="flex flex-col items-center p-4 bg-gray-800 bg-opacity-50 rounded-lg"
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-3 text-blue-300">
        <Icon size={36} />
      </div>
      <h3 className="text-lg font-medium mb-1">{name}</h3>
      <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
        <div 
          className="bg-blue-500 h-2 rounded-full" 
          style={{ width: `${level}%` }}
        />
      </div>
    </motion.div>
  );
};

// Custom icon components for skills without direct Lucide equivalents
const JavaIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.93.828-.93-1.087-.765-7.514 1.611-3.226 2.31 11.761 1.9 21.42-.848 15.56-1.406M9.292 13.21s-5.329 1.267-1.886 1.728c1.452.194 4.347.15 7.042-.077 2.204-.185 4.416-.578 4.416-.578s-.778.333-1.341.717c-5.426 1.428-15.849.765-12.779-.697 2.575-1.225 4.548-1.093 4.548-1.093M17.127 17.208c5.6-2.898 3.009-5.938 1.205-5.505-.44.108-.637.2-.637.2s.164-.255.478-.365c3.578-1.255 6.337 3.831-1.157 5.863 0 0 .087-.078.111-.193M14.401 0s3.098 3.099-2.94 7.86c-4.841 3.82-1.104 5.999-.001 8.479-2.825-2.548-4.898-4.79-3.506-6.882 2.055-3.092 7.741-4.595 6.447-9.457M9.734 23.924c5.384.346 13.661-.191 13.85-2.751 0 0-.378.97-4.452 1.741-4.603.872-10.286.769-13.66.211 0 0 .691.572 4.262.799" fill="currentColor"/>
  </svg>
);

const SQLIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3C7.58 3 4 4.79 4 7V17C4 19.21 7.58 21 12 21S20 19.21 20 17V7C20 4.79 16.42 3 12 3Z" fill="none" stroke="currentColor" />
    <path d="M4 12C4 14.21 7.58 16 12 16S20 14.21 20 12" fill="none" stroke="currentColor" />
    <path d="M4 7C4 9.21 7.58 11 12 11S20 9.21 20 7" fill="none" stroke="currentColor" />
  </svg>
);

const JenkinsIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.6 7.2c5.6 3.2 4.9 9.5 4.9 9.5-.3 4.7-6.1 6.1-6.1 6.1l-1.7-16.9c0 .1.8.2 2.9 1.3z" fill="none" stroke="currentColor" />
    <path d="M15.9 24h-1.9s.4-4.8-3.6-6.3c-1.1-1.1 4.3-1.7.6-9C9.4 4.5 18 3.1 18 3.1s-2 4.3 3.2 5.1c5.2.8 5.6 6.1 5.6 6.1s.8 5.1-5.8 4-5.1 5.7-5.1 5.7" fill="none" stroke="currentColor" />
    <path d="M12.4 24h-1.5s.1-2.8-1.1-3.3c-1.3-1 .6-.5-1.4-5C7.3 12.9 5 11.1 5 11.1S6.5 7.7.8 9.9c0 0-1.6 1.9 0 3.6 1.6 1.7 5.8.2 5.4 1.8-.4 1.5-4.1 1.4-2.8 3.9 1.3 2.5 4.8 1.9 4.8 1.9s1.5 2.8 4.2 2.9" fill="none" stroke="currentColor" />
  </svg>
);

const CIcon = () => (
  <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.5 8.25L12 3.75L7.5 8.25L12 12.75L16.5 8.25Z" stroke="currentColor" />
    <path d="M3 15.75L7.5 20.25L12 15.75L7.5 11.25L3 15.75Z" stroke="currentColor" />
    <path d="M12 15.75L16.5 20.25L21 15.75L16.5 11.25L12 15.75Z" stroke="currentColor" />
  </svg>
);

// About Page Component
export default function About() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate particles based on screen size
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
    setParticles(Array.from({ length: particleCount }, (_, i) => i));

    // Add keyframes for floating animation
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(10px, 10px) rotate(5deg); }
        50% { transform: translate(0, 20px) rotate(0deg); }
        75% { transform: translate(-10px, 10px) rotate(-5deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
      html, body, #root {
        height: 100%;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Skill categories with their respective skills
  const skillCategories = [
    {
      title: "DevOps",
      skills: [
        { name: "Docker", icon: Docker, level: 85 },
        { name: "Git", icon: Git, level: 90 },
        { name: "Jenkins", icon: JenkinsIcon, level: 75 }
      ]
    },
    {
      title: "Web Development",
      skills: [
        { name: "React", icon: Code, level: 90 },
        { name: "JavaScript", icon: Terminal, level: 85 },
        { name: "HTML/CSS", icon: Layout, level: 95 }
      ]
    },
    {
      title: "Programming Languages",
      skills: [
        { name: "C", icon: CIcon, level: 80 },
        { name: "Java", icon: JavaIcon, level: 75 }
      ]
    },
    {
      title: "Database & Design",
      skills: [
        { name: "SQL", icon: SQLIcon, level: 85 },
        { name: "Figma", icon: Figma, level: 70 }
      ]
    }
  ];

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-x-hidden">
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(id => (
          <Particle key={id} id={id} />
        ))}
      </div>
      
      {/* Navbar Component */}
      <Navbar />
      
      {/* Main content */}
      <main className="container mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            About <span className="text-blue-300">Me</span>
          </h1>
          
          {/* About section */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <motion.div 
                className="md:w-1/3 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-30 scale-110" />
                  <img 
                    src="/api/placeholder/300/300" 
                    alt="Profile" 
                    className="rounded-full h-48 w-48 object-cover relative border-4 border-blue-500" 
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="md:w-2/3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-4">Who I Am</h2>
                <p className="text-gray-300 mb-4">
                  Hello! I'm <span className="text-blue-300 font-medium">Your Name</span>, a passionate 
                  developer with expertise in web development and DevOps. With over 5 years of experience 
                  in the technology field, I've worked on a variety of projects ranging from 
                  responsive web applications to scalable infrastructure solutions.
                </p>
                <p className="text-gray-300">
                  My journey into technology began when I was studying computer science and 
                  discovered my passion for creating practical solutions to real-world problems. 
                  I'm constantly learning and exploring new technologies to stay at the forefront 
                  of this ever-evolving industry.
                </p>
              </motion.div>
            </div>
          </div>
          
          {/* Skills section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold mb-10 text-center">
              My <span className="text-blue-300">Skills</span>
            </h2>
            
            <div className="space-y-12">
              {skillCategories.map((category, index) => (
                <div key={index} className="mb-10">
                  <motion.h3 
                    className="text-2xl font-semibold mb-6 border-b border-blue-500 pb-2 inline-block"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    {category.title}
                  </motion.h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * skillIndex + 0.2 * index }}
                      >
                        <Skill 
                          icon={skill.icon} 
                          name={skill.name} 
                          level={skill.level}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Additional Info */}
          <motion.div
            className="mt-16 bg-gray-800 bg-opacity-50 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">Education & Experience</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-medium text-blue-300">Bachelor of Computer Science</h3>
                <p className="text-gray-400">University Name, 2015-2019</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-medium text-blue-300">Senior Developer</h3>
                <p className="text-gray-400">Company Name, 2019-Present</p>
                <p className="text-gray-300 mt-2">
                  Leading development of web applications and implementing DevOps practices to streamline 
                  development and deployment processes.
                </p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-xl font-medium text-blue-300">Junior Developer</h3>
                <p className="text-gray-400">Previous Company, 2017-2019</p>
                <p className="text-gray-300 mt-2">
                  Contributed to frontend and backend development for various client projects using 
                  modern web technologies.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}