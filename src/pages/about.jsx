import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {   IoLogoJavascript  } from 'react-icons/io';
import { FaDocker, FaGithub,FaJenkins, FaReact, FaFigma, FaCode, FaJava ,FaDatabase,FaCheckCircle} from 'react-icons/fa';
import { AiOutlineKubernetes } from "react-icons/ai";
import { SiMongodb ,SiFlutter} from "react-icons/si";

import ProfileImg from '../assets/profile.jpg'

import Navbar from '../components/navbar';

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
        { name: "Docker", icon: FaDocker, level: 85 },
        { name: "Git", icon: FaGithub, level: 90 },
        { name: "Jenkins", icon: FaJenkins, level: 75 },
        { name: "Kubernetes", icon: AiOutlineKubernetes, level: 85 }
      ]
    },
    {
      title: "Web Development",
      skills: [
        { name: "React", icon: FaReact, level: 90 },
        { name: "JavaScript", icon: IoLogoJavascript, level: 85 },
        { name: "HTML/CSS", icon: FaCode, level: 95 }
      ]
    },
    {
      title: "Programming Languages",
      skills: [
        { name: "C/C++/C#", icon: CIcon, level: 80 },
        { name: "Java", icon: FaJava, level: 75 }
      ]
    },
    {
      title: "Database & Design",
      skills: [
        { name: "SQL", icon: FaDatabase, level: 85 },
        { name: "MongoDB", icon: SiMongodb, level: 85 },
        { name: "Figma", icon: FaFigma, level: 70 }
      ]
    },
    {
        title: "Testing ",
        skills: [
          { name: "Quality Assurance", icon: FaCheckCircle, level: 85 },
          
        ]
      },
      {
        title: "Mobile Development",
        skills: [
          { name: "React Native", icon: FaReact, level: 85 },
          { name: "Flutter", icon: SiFlutter, level: 85 },
          
        ]
      },
  ];

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-x-hidden">
      
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(id => (
          <Particle key={id} id={id} />
        ))}
      </div>
      
    
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
                    src={ProfileImg}
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