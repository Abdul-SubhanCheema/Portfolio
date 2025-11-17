import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { IoLogoJavascript } from 'react-icons/io';
import { 
  FaDocker, FaGithub, FaJenkins, FaReact, FaFigma, FaCode, FaJava, 
  FaDatabase, FaCheckCircle, FaNodeJs, FaBriefcase, FaGraduationCap,
  FaEnvelope, FaLinkedin, FaAward,
  FaSmile
} from 'react-icons/fa';
import { AiOutlineKubernetes } from "react-icons/ai";
import { SiMongodb, SiFlutter, SiAngular, SiDotnet, SiCplusplus, SiPython } from "react-icons/si";

import Navbar from '../components/navbar';
import NeuralNetwork from '../components/NeuralNetwork';
import CustomCursor from '../components/CustomCursor';
import { useTheme } from '../context/ThemeContext';



// Modern Skill Card Component
// eslint-disable-next-line no-unused-vars
const SkillCard = ({ name, icon: Icon, theme }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { colors } = theme;

  return (
    <motion.div
      className={`${colors.glass.secondary} rounded-xl p-6 border ${colors.border.secondary} hover:${colors.border.primary} transition-all duration-300 cursor-pointer group`}
      whileHover={{ y: -5, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="text-center">
        <motion.div
          className={`inline-block p-4 ${colors.glass.hover} rounded-lg mb-4 transition-all duration-300`}
          animate={{ rotate: isHovered ? [0, -10, 10, 0] : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className={`text-3xl ${colors.text.accent} group-hover:scale-110 transition-transform`} />
        </motion.div>
        
        <h3 className={`font-semibold ${colors.text.primary} text-base`}>{name}</h3>
      </div>
    </motion.div>
  );
};

// Timeline Item Component
// eslint-disable-next-line no-unused-vars
const TimelineItem = ({ title, company, period, description, icon: Icon, isLast, theme }) => {
  const { colors } = theme;
  
  return (
    <motion.div
      className="relative flex items-start gap-6 pb-10"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Timeline dot and line */}
      <div className="flex-shrink-0 relative">
        <div className={`w-14 h-14 ${colors.glass.hover} rounded-full border-2 ${colors.border.primary} flex items-center justify-center backdrop-blur-sm`}>
          <Icon className={`${colors.text.accent} text-xl`} />
        </div>
        {!isLast && (
          <div className={`absolute left-7 top-14 w-0.5 h-full ${colors.border.secondary}`} />
        )}
      </div>
      
      {/* Content */}
      <div className="flex-grow">
        <motion.div 
          className={`${colors.glass.secondary} rounded-xl p-6 border ${colors.border.secondary} hover:${colors.border.primary} transition-all duration-300`}
          whileHover={{ x: 5 }}
        >
          <h3 className={`text-xl font-bold ${colors.text.primary} mb-2`}>{title}</h3>
          <p className={`${colors.text.accent} font-semibold mb-2`}>{company}</p>
          <p className={`${colors.text.tertiary} text-sm mb-4 flex items-center gap-2`}>
            <FaBriefcase className="text-xs" />
            {period}
          </p>
          <p className={`${colors.text.secondary} leading-relaxed`}>{description}</p>
        </motion.div>
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
  const theme = useTheme();
  const { colors } = theme;

  const skills = [
    { name: 'React', icon: FaReact },
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'JavaScript', icon: IoLogoJavascript },
    { name: 'Angular', icon: SiAngular },
    { name: '.NET', icon: SiDotnet },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Docker', icon: FaDocker },
    { name: 'Java', icon: FaJava },
    { name: 'Python', icon: SiPython },
    { name: 'C++', icon: SiCplusplus },
    { name: 'Kubernetes', icon: AiOutlineKubernetes },
    { name: 'Figma', icon: FaFigma },
    { name: 'Git', icon: FaGithub },
    { name: 'Flutter', icon: SiFlutter },
    { name: 'QA', icon: FaCheckCircle }
  ];

  const experiences = [
    {
      title: 'Software Engineer',
      company: 'CareCloud',
      period: '2025 - Present',
      description: 'Developing and maintaining healthcare technology solutions with focus on scalable architecture and high-quality medical software products.',
      icon: FaBriefcase
    },
    {
      title: 'Full Stack Developer',
      company: 'CareCloud & CodexCue Solutions',
      period: '2024 - 2025',
      description: 'Built end-to-end applications using React, Node.js, and various databases. Focused on user experience and system reliability.',
      icon: FaCode
    },
    {
      title: 'Bachelor of Software Engineering',
      company: 'FAST National University, Islamabad',
      period: '2021 - 2025',
      description: 'Graduated with expertise in software development, algorithms, and modern programming practices.',
      icon: FaGraduationCap
    }
  ];

  return (
    <div className={`min-h-screen w-screen ${colors.primary} relative overflow-x-hidden`}>
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <NeuralNetwork />
      <Navbar />

      <main className="relative z-10 pt-20 pb-20">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Hero Section */}
          <motion.section 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${colors.text.primary}`}>
              About <span className={colors.gradient.text}>Me</span>
            </h1>
            <p className={`text-xl ${colors.text.secondary} max-w-3xl mx-auto leading-relaxed`}>
              Software Engineer passionate about creating innovative solutions that solve real-world problems.
            </p>
          </motion.section>

          {/* Personal Info Section */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={`${colors.glass.primary} rounded-2xl p-8 md:p-12 border ${colors.border.secondary} hover:${colors.border.primary} transition-all duration-500`}>
              <div className="max-w-4xl mx-auto">
                <h2 className={`text-3xl md:text-4xl font-bold mb-8 text-center ${colors.gradient.text}`}>
                  Hello, I'm Abdul Subhan
                </h2>
                <p className={`${colors.text.primary} mb-6 text-lg leading-relaxed text-center`}>
                  A passionate software engineer with expertise in full-stack development and modern technologies. 
                  Currently working at CareCloud, developing healthcare solutions that make a real impact.
                </p>
                <p className={`${colors.text.secondary} leading-relaxed text-center mb-8`}>
                  I love creating efficient, scalable applications and staying up-to-date with the latest 
                  technologies. My goal is to build software that not only works well but also provides 
                  exceptional user experiences.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.a 
                    href="mailto:abdulsubhancheema97@gmail.com"
                    className={`flex items-center gap-2 px-5 py-3 ${colors.glass.hover} rounded-xl transition-all duration-300 ${colors.text.accent} border ${colors.border.accent}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaEnvelope />
                    <span className="font-medium">Email</span>
                  </motion.a>
                  <motion.a 
                    href="https://www.linkedin.com/in/abdulsubhan303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-5 py-3 ${colors.glass.hover} rounded-xl transition-all duration-300 ${colors.text.accent} border ${colors.border.accent}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaLinkedin />
                    <span className="font-medium">LinkedIn</span>
                  </motion.a>
                  <motion.a 
                    href="https://github.com/Abdul-SubhanCheema"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-5 py-3 ${colors.glass.hover} rounded-xl transition-all duration-300 ${colors.text.accent} border ${colors.border.accent}`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub />
                    <span className="font-medium">GitHub</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Experience Timeline */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-4xl font-bold text-center mb-16 ${colors.text.primary}`}>
              My <span className={colors.gradient.text}>Journey</span>
            </h2>
            <div className={`${colors.glass.secondary} rounded-2xl p-8 md:p-12 border ${colors.border.secondary}`}>
              <div className="max-w-4xl mx-auto">
                {experiences.map((exp, index) => (
                  <TimelineItem 
                    key={index}
                    {...exp}
                    isLast={index === experiences.length - 1}
                    theme={theme}
                  />
                ))}
              </div>
            </div>
          </motion.section>

          {/* Quick Stats Section */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-4xl font-bold text-center mb-12 ${colors.text.primary}`}>
              Quick <span className={colors.gradient.text}>Stats</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { number: '50+', label: 'Projects Completed', icon: FaCode },
                { number: '3+', label: 'Years Experience', icon: FaBriefcase },
                { number: '15+', label: 'Technologies', icon: FaDatabase },
                { number: '30+', label: 'Happy Clients', icon: FaSmile },
                { number: '100%', label: 'Dedication', icon: FaAward }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className={`${colors.glass.secondary} rounded-xl p-8 border ${colors.border.secondary} text-center group hover:${colors.glass.hover} hover:${colors.border.primary} transition-all duration-300`}
                  whileHover={{ y: -5, scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <stat.icon className={`text-5xl ${colors.text.accent} mx-auto mb-4 transition-colors duration-300`} />
                  <div className={`text-4xl font-bold ${colors.text.primary} mb-2`}>{stat.number}</div>
                  <div className={`${colors.text.secondary} font-medium`}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Skills Section */}
          <motion.section 
            className="mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-4xl font-bold text-center mb-16 ${colors.text.primary}`}>
              Technical <span className={colors.gradient.text}>Skills</span>
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                >
                  <SkillCard {...skill} theme={theme} />
                </motion.div>
              ))}
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  );
}