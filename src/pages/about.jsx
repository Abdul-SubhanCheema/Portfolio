import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { IoLogoJavascript } from 'react-icons/io';
import { FaDocker, FaGithub, FaJenkins, FaReact, FaFigma, FaCode, FaJava, FaDatabase, FaCheckCircle, FaNodeJs } from 'react-icons/fa';
import { AiOutlineKubernetes } from "react-icons/ai";
import { SiMongodb, SiFlutter, SiAngular, SiDotnet } from "react-icons/si";

import Navbar from '../components/navbar';
import NeuralNetwork from '../components/NeuralNetwork';
import CustomCursor from '../components/CustomCursor';
import ModernAvatar from '../components/ModernAvatar';
import { useTheme } from '../context/ThemeContext';



// Expandable Skills Grid Component
const SkillsGrid = ({ skills, title, skillInfo, colors }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="mb-20">
      {/* Category Title */}
      <motion.h3 
        className={`text-3xl font-bold mb-12 text-center ${colors.gradient.text}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {title}
      </motion.h3>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            layout
            className={`relative cursor-pointer ${
              expandedCard === index ? 'col-span-2 row-span-2' : ''
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              layout: { type: "spring", stiffness: 300, damping: 30 }
            }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            onClick={() => setExpandedCard(expandedCard === index ? null : index)}
          >
            <ExpandableSkillCard 
              icon={skill.icon} 
              name={skill.name} 
              isExpanded={expandedCard === index}
              isHovered={hoveredCard === index}
              index={index}
              skillInfo={skillInfo}
              colors={colors}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Modern Electric Border Component - Clean & Aesthetic
const ElectricBorder = ({ isActive }) => {
  return (
    <>
      {/* Subtle animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(90deg, 
            transparent 0%, 
            rgba(34, 211, 238, 0.4) 25%, 
            rgba(59, 130, 246, 0.6) 50%, 
            rgba(34, 211, 238, 0.4) 75%, 
            transparent 100%
          )`,
          backgroundSize: '200% 100%',
          mask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
          maskComposite: 'xor',
          WebkitMask: 'linear-gradient(white, white) content-box, linear-gradient(white, white)',
          WebkitMaskComposite: 'xor',
          padding: '1px'
        }}
        animate={isActive ? {
          backgroundPosition: ['0% 0%', '100% 0%'],
          opacity: [0.3, 0.8, 0.3]
        } : {
          opacity: 0
        }}
        transition={{
          backgroundPosition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          },
          opacity: {
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      />
      
      {/* Subtle glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={isActive ? {
          boxShadow: [
            '0 0 20px rgba(34, 211, 238, 0.2)',
            '0 0 30px rgba(59, 130, 246, 0.3)',
            '0 0 20px rgba(34, 211, 238, 0.2)'
          ]
        } : {
          boxShadow: '0 0 0px rgba(34, 211, 238, 0)'
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );
};

// Clean Expandable Skill Card Component
const ExpandableSkillCard = ({ icon, name, isExpanded, isHovered, skillInfo, colors }) => {
  const Icon = icon;
  
  return (
    <motion.div 
      className={`relative group backdrop-blur-sm rounded-xl transition-all duration-300 overflow-hidden cursor-pointer ${
        isExpanded 
          ? 'h-80 bg-gradient-to-br from-slate-700/70 to-slate-800/50' 
          : 'h-40 bg-gradient-to-br from-slate-700/50 to-slate-800/30'
      }`}
      style={{
        border: isExpanded || isHovered 
          ? '1px solid rgba(59, 130, 246, 0.6)'
          : '1px solid rgba(255, 255, 255, 0.2)'
      }}
      whileHover={!isExpanded ? { 
        scale: 1.02,
        y: -4,
        boxShadow: "0 8px 25px -5px rgba(0, 0, 0, 0.4)"
      } : {}}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Modern Electric Border */}
      <ElectricBorder isActive={isHovered || isExpanded} />
      {/* Subtle accent overlay */}
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          opacity: isExpanded || isHovered ? 0.15 : 0
        }}
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), transparent 50%, rgba(34, 211, 238, 0.12))'
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Clean expansion indicator */}
      {isExpanded && (
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-blue-300 rounded-full"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      {/* Content container */}
      <div className={`relative z-10 h-full flex flex-col items-center p-6 ${
        isExpanded ? 'justify-start pt-8' : 'justify-center'
      }`}>
        
        {/* Clean icon container */}
        <motion.div 
          className={`relative mb-4 p-3 rounded-lg z-10 ${
            isExpanded 
              ? 'bg-gradient-to-br from-blue-500/25 to-blue-600/20'
              : 'bg-gradient-to-br from-slate-600/60 to-slate-700/40'
          }`}
          animate={{
            scale: isExpanded ? 1.2 : isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <motion.div
            className={`${
              isExpanded || isHovered ? 'text-blue-300' : 'text-slate-200'
            } transition-colors duration-200`}
            animate={{ 
              rotate: isHovered ? [0, -5, 5, 0] : 0
            }}
            transition={{ duration: 0.4 }}
          >
            <Icon size={isExpanded ? 48 : 32} />
          </motion.div>
        </motion.div>
        
        {/* Clean skill name */}
        <motion.h3 
          className={`text-center font-semibold text-white ${
            isExpanded ? 'text-xl mb-4' : 'text-base'
          }`}
          animate={{ 
            scale: isExpanded ? 1.05 : 1,
            color: isExpanded || isHovered ? '#93c5fd' : '#ffffff'
          }}
          transition={{ duration: 0.3 }}
        >
          {name}
        </motion.h3>
        
        {/* Expanded content with unique information */}
        <motion.div
          className="text-center px-2"
          animate={{ 
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? 0 : 20
          }}
          transition={{ duration: 0.4, delay: isExpanded ? 0.2 : 0 }}
        >
          {isExpanded && skillInfo[name] && (
            <div className={`${colors.text.secondary} text-sm leading-relaxed`}>
              {skillInfo[name].description}
            </div>
          )}
        </motion.div>
        
        {/* Simple accent line */}
        {isExpanded && (
          <motion.div
            className="absolute bottom-6 left-6 right-6 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        )}
        
        {/* Simple click indicator */}
        {!isExpanded && (
          <motion.div
            className="absolute bottom-3 right-3 text-xs text-slate-300"
            animate={{ 
              opacity: isHovered ? 0.9 : 0
            }}
            transition={{ duration: 0.2 }}
          >
            Click to expand
          </motion.div>
        )}
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
  const { colors } = useTheme();

  // Detailed skill information with unique descriptions
  const skillInfo = {
    "Docker": {
      description: "Containerization expert with experience in multi-stage builds, orchestration, and deployment strategies."
    },
    "Git": {
      description: "Version control mastery including branching strategies, merge conflict resolution, and collaborative workflows."
    },
    "Jenkins": {
      description: "CI/CD pipeline automation, build optimization, and deployment orchestration across multiple environments."
    },
    "Kubernetes": {
      description: "Container orchestration, service mesh implementation, and cloud-native application deployment."
    },
    "React": {
      description: "Modern React development with hooks, context API, state management, and performance optimization."
    },
    "Angular": {
      description: "Enterprise-scale applications using Angular framework, TypeScript, and reactive programming patterns."
    },
    "Node.js": {
      description: "Server-side JavaScript development, API design, microservices architecture, and real-time applications."
    },
    "JavaScript": {
      description: "Modern ES6+ JavaScript, async programming, functional programming, and browser API integration."
    },
    "HTML/CSS": {
      description: "Semantic HTML5, advanced CSS3, responsive design, animations, and modern layout techniques."
    },
    "C/C++/C#": {
      description: "System programming, memory management, object-oriented design, and performance-critical applications."
    },
    ".NET": {
      description: "Full-stack .NET development, Web API creation, Entity Framework, and cloud integration."
    },
    "Java": {
      description: "Object-oriented programming, Spring framework, enterprise applications, and design patterns."
    },
    "SQL": {
      description: "Database design, complex queries, performance optimization, and data modeling across multiple platforms."
    },
    "MongoDB": {
      description: "NoSQL database design, aggregation pipelines, indexing strategies, and document-based data modeling."
    },
    "Figma": {
      description: "UI/UX design, prototyping, component systems, design tokens, and collaborative design workflows."
    },
    "Quality Assurance": {
      description: "Test automation, manual testing strategies, bug tracking, and quality process implementation."
    },
    "React Native": {
      description: "Cross-platform mobile development, native module integration, and performance optimization."
    },
    "Flutter": {
      description: "Dart-based mobile development, widget composition, state management, and native performance."
    }
  };

  // Skill categories with their respective skills
  const skillCategories = [
    {
      title: "DevOps",
      skills: [
        { name: "Docker", icon: FaDocker },
        { name: "Git", icon: FaGithub },
        { name: "Jenkins", icon: FaJenkins },
        { name: "Kubernetes", icon: AiOutlineKubernetes }
      ]
    },
    {
      title: "Web Development",
      skills: [
        { name: "React", icon: FaReact },
        { name: "Angular", icon: SiAngular },
        { name: "Node.js", icon: FaNodeJs },
        { name: "JavaScript", icon: IoLogoJavascript },
        { name: "HTML/CSS", icon: FaCode }
      ]
    },
    {
      title: "Programming Languages",
      skills: [
        { name: "C/C++/C#", icon: CIcon },
        { name: ".NET", icon: SiDotnet },
        { name: "Java", icon: FaJava }
      ]
    },
    {
      title: "Database & Design",
      skills: [
        { name: "SQL", icon: FaDatabase },
        { name: "MongoDB", icon: SiMongodb },
        { name: "Figma", icon: FaFigma }
      ]
    },
    {
        title: "Testing",
        skills: [
          { name: "Quality Assurance", icon: FaCheckCircle }
        ]
      },
      {
        title: "Mobile Development",
        skills: [
          { name: "React Native", icon: FaReact },
          { name: "Flutter", icon: SiFlutter }
        ]
      },
  ];

  return (
    <div className={`min-h-screen w-screen ${colors.primary} ${colors.text.primary} relative overflow-x-hidden flex flex-col`}>
      {/* Custom Cursor - Hidden on touch devices */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Neural Network Background */}
      <NeuralNetwork />

      <Navbar />
      
      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 text-transparent bg-clip-text">Me</span>
          </motion.h1>
          
          {/* About section
          <div className={`${colors.glass.primary} rounded-2xl p-8 mb-16 shadow-2xl`}>
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <motion.div 
                className="md:w-1/3 flex justify-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ModernAvatar />
              </motion.div>
              
              <motion.div 
                className="md:w-2/3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Who I Am</h2>
                <p className={`${colors.text.secondary} mb-6 text-lg leading-relaxed`}>
                  Hello! I'm <span className={`${colors.text.accent} font-semibold`}>Abdul Subhan</span>, a passionate 
                  software engineer with expertise in full-stack development and DevOps. With extensive experience 
                  in the technology field, I've worked on a variety of projects ranging from 
                  responsive web applications to scalable infrastructure solutions.
                </p>
                <p className={`${colors.text.secondary} text-lg leading-relaxed`}>
                  My journey into technology began with a fascination for problem-solving and creating 
                  digital solutions that make a real impact. I'm constantly learning and exploring 
                  cutting-edge technologies to deliver innovative, user-centric applications.
                </p>
              </motion.div>
            </div>
          </div> */}
          
          {/* Education & Experience Section */}
          <motion.div
            className={`mt-20 ${colors.glass.primary} rounded-2xl p-8 shadow-2xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className={`text-3xl font-bold mb-8 ${colors.gradient.text}`}>Education & Experience</h2>
            <div className="space-y-8">
              {/* Education Section */}
              <motion.div 
                className="border-l-4 border-blue-400 pl-6 backdrop-blur-sm bg-white/5 rounded-r-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className={`text-xl font-semibold ${colors.text.accent}`}>Bachelor of Software Engineering</h3>
                <p className={`${colors.text.tertiary}`}>FAST National University of Computer and Emerging Sciences (NUCES), Islamabad</p>
                <p className={`text-sm ${colors.text.muted} mt-1`}>Graduate in Software Engineering</p>
              </motion.div>
              
              {/* Work Experience Section */}
              <motion.div 
                className="border-l-4 border-blue-400 pl-6 backdrop-blur-sm bg-white/5 rounded-r-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <h3 className={`text-xl font-semibold ${colors.text.accent}`}>Software Engineer</h3>
                <p className={`${colors.text.tertiary}`}>CareCloud - Present</p>
                <p className={`${colors.text.secondary} mt-3 leading-relaxed`}>
                  Currently working as a Software Engineer, developing and maintaining healthcare technology solutions. 
                  Focusing on scalable software architecture, system optimization, and delivering high-quality medical software products.
                </p>
              </motion.div>
              <motion.div 
                className="border-l-4 border-blue-400 pl-6 backdrop-blur-sm bg-white/5 rounded-r-xl p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className={`text-xl font-semibold ${colors.text.accent}`}>Full Stack Developer</h3>
                <p className={`${colors.text.tertiary}`}>CareCloud & CodexCue Solutions</p>
                <p className={`${colors.text.secondary} mt-3 leading-relaxed`}>
                  Worked as a Full Stack Developer across both companies, building end-to-end applications 
                  using modern technologies including React, Node.js, and various databases. Contributed to 
                  healthcare and business solutions with focus on user experience and system reliability.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills section */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h2 className={`text-4xl font-bold mb-12 text-center ${colors.text.primary}`}>
              My <span className={colors.gradient.text}>Skills</span>
            </h2>
            
            <div className="space-y-16">
              {skillCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + (0.2 * index) }}
                >
                  <SkillsGrid 
                    skills={category.skills}
                    title={category.title}
                    skillInfo={skillInfo}
                    colors={colors}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}