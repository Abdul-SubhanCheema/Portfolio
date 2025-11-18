
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Navbar from "../components/navbar";
import NeuralNetwork from '../components/NeuralNetwork';
import CustomCursor from '../components/CustomCursor';
import { useTheme } from '../context/ThemeContext';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaFilter, FaCode, FaDatabase, FaMobile, FaGlobe, FaLock, FaBuilding } from "react-icons/fa";

const ProjectCard = ({ title, description, link, tech, category, status, isPrivate, companyName, index, theme }) => {
  const { colors, isDarkMode } = theme || {};
  
  if (!colors) return null;

  const categoryColors = {
    'Full-Stack': 'bg-blue-500/20 text-blue-400',
    'Frontend': 'bg-green-500/20 text-green-400',
    'Backend': 'bg-purple-500/20 text-purple-400',
    'Networks': 'bg-orange-500/20 text-orange-400',
    'Mobile': 'bg-pink-500/20 text-pink-400',
    'Game': 'bg-yellow-500/20 text-yellow-400',
    'ML/AI': 'bg-cyan-500/20 text-cyan-400'
  };

  const statusColors = {
    'Complete': 'bg-green-500/20 text-green-400',
    'In Progress': 'bg-yellow-500/20 text-yellow-400',
    'Archived': 'bg-gray-500/20 text-gray-400'
  };
  
  return (
    <motion.div
      className={`group relative ${colors.glass.primary} rounded-xl p-6 transition-all duration-300 flex flex-col ${ 
        isPrivate ? 'border-yellow-500/30' : ''
      }`}
      style={{
        border: `1px solid ${
          isPrivate 
            ? 'rgba(245, 158, 11, 0.3)' 
            : isDarkMode 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(0, 0, 0, 0.1)'
        }`,
      }}
      whileHover={{ 
        scale: 1.02,
        y: -4,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1
      }}
    >
      {/* Header Section with Badges */}
      <div className="flex justify-between items-center mb-4">
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${categoryColors[category]}`}>
          {category}
        </span>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      </div>
      
      <div className="mb-4">
        <h3 className={`text-lg font-bold mb-3 ${colors.text.primary} group-hover:text-blue-400 transition-colors duration-200`}>
          {title}
        </h3>
        
        {/* Company Name for Private Projects */}
        {isPrivate && companyName && (
          <div className="mb-2 flex items-center gap-2">
            <FaBuilding className={`text-xs ${colors.text.tertiary}`} />
            <span className={`text-sm ${colors.text.tertiary} italic`}>
              {companyName}
            </span>
          </div>
        )}
        
        <p className={`${colors.text.secondary} mb-4 text-sm leading-relaxed line-clamp-3`}>
          {description}
        </p>
        
        {/* Tech Stack */}
        {tech && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tech.map((techItem, i) => (
              <span key={i} className={`px-2 py-1 text-xs bg-gray-500/20 ${colors.text.tertiary} rounded`}>
                {techItem}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Action Button */}
      {isPrivate ? (
        <div className="relative group">
          <div className={`inline-flex items-center justify-center px-4 py-2 rounded-lg bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-sm font-medium cursor-not-allowed gap-2 w-full`}>
            <FaLock className="text-xs" />
            Confidential Project
          </div>
          {/* Tooltip */}
          <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-xs ${colors.glass.primary} ${colors.text.primary} rounded-lg border ${colors.border.primary} opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10 pointer-events-none`}>
            <div className="flex items-center gap-1.5">
              <FaBuilding className="text-xs" />
              <span>Owned by {companyName}</span>
            </div>
            <div className={`text-xs ${colors.text.tertiary} mt-1`}>
              Protected under NDA
            </div>
            {/* Tooltip arrow */}
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800`}></div>
          </div>
        </div>
      ) : (
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-200 text-sm font-medium`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaGithub className="mr-2 text-sm" /> 
          View Project
          <FaExternalLinkAlt className="ml-2 text-xs opacity-70" />
        </motion.a>
      )}
    </motion.div>
  );
};

export default function Projects() {
  const theme = useTheme();
  const { colors } = theme;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPrivate, setShowPrivate] = useState(true);

  const projects = [
    {
      title: "Bricks Company Management System",
      description: "Full-stack web app for managing customers, employees, and billing with real-time analytics.",
      link: "https://github.com/Abdul-SubhanCheema/Bhata-System",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      category: "Full-Stack",
      status: "Complete"
    },
    {
      title: "Pharmacy Management",
      description: "Comprehensive system for medication inventory, prescription processing, and analytics.",
      link: "https://github.com/bilal-akbar-9/SPM",
      tech: ["React", "Node.js", "SQL", "Chart.js"],
      category: "Full-Stack",
      status: "Complete"
    },
    {
      title: "Weather App",
      description: "Live weather forecast app with location-based weather details and beautiful UI.",
      link: "https://github.com/Abdul-SubhanCheema/Weather-App",
      tech: ["React", "Express", "API", "CSS"],
      category: "Full-Stack",
      status: "Complete"
    },
    {
      title: "Quantum-Ready Cryptography",
      description: "Post-quantum cryptography web application implementing Kyber512 algorithm for quantum-resistant encryption and decryption with secure Flask backend.",
      link: "https://github.com/Abdul-SubhanCheema/Information_Security_Project",
      tech: ["Python", "Flask", "Kyber512", "AES-GCM", "Bootstrap", "WTForms", "Cryptography"],
      category: "Full-Stack",
      status: "Complete"
    },
    {
      title: "Car Wash Management",
      description: "Web-based system for managing bookings, billing, and services efficiently.",
      link: "https://github.com/Abdul-SubhanCheema/Car-Wash-Management-System",
      tech: ["ASP.NET", "SQL Server", "C#", "Web Forms"],
      category: "Full-Stack",
      status: "Complete"
    },
    {
      title: "E-Commerce Platform",
      description: "Modern e-commerce platform with product catalog, cart, and payment integration.",
      link: "https://github.com/Abdul-SubhanCheema/Ecommerce",
      tech: ["Angular", ".NET Core", "SQL", "Stripe"],
      category: "Full-Stack",
      status: "Complete"
    },
    {
      title: "POS System",
      description: "Point of Sale system with admin dashboard and cashier interface for fertilizer company.",
      link: "https://github.com/Abdul-SubhanCheema/POS",
      tech: ["React", "Node.js", "MongoDB", "Chart.js"],
      category: "Full-Stack",
      status: "Complete"
    },
    {
      title: "Course Registration",
      description: "Java desktop app for managing course enrollments with advisor approval system.",
      link: "https://github.com/Abdul-SubhanCheema/Course_Registration_System",
      tech: ["Java", "Swing", "MySQL", "JDBC"],
      category: "Backend",
      status: "Complete"
    },
    {
      title: "Blog Application",
      description: "Full-featured blog platform for creating, editing, and managing posts.",
      link: "https://github.com/fast-isb/Blog-Application/tree/master",
      tech: ["Node.js", "MongoDB", "Express", "EJS"],
      category: "Full-Stack",
      status: "Complete"
    },
    {
      title: "Home Price Predictor",
      description: "ML app for predicting house prices using regression models and Flask.",
      link: "https://github.com/Abdul-SubhanCheema/MLOPS_Project",
      tech: ["Python", "Flask", "Scikit-learn", "HTML"],
      category: "ML/AI",
      status: "Complete"
    },
    {
      title: "Job Listing Portal",
      description: "Frontend application for displaying and filtering job listings dynamically.",
      link: "https://github.com/Abdul-SubhanCheema/Job-Listening-and-Filtering-Application",
      tech: ["HTML", "CSS", "JavaScript", "JSON"],
      category: "Frontend",
      status: "Complete"
    },
    {
      title: "Tic Tac Toe Game",
      description: "Classic 2-player game with smooth animations and responsive design.",
      link: "https://github.com/Abdul-SubhanCheema/Tic-Tac-Toe-",
      tech: ["HTML", "CSS", "JavaScript"],
      category: "Game",
      status: "Complete"
    },
    {
      title: "Grocery Management",
      description: "Console-based C++ app for managing products, stock, and billing operations.",
      link: "https://github.com/Abdul-SubhanCheema/Grocery-Management-System",
      tech: ["C++", "File I/O", "OOP"],
      category: "Backend",
      status: "Complete"
    },
    {
      title: "Snake and Ladder",
      description: "Text-based C++ implementation of classic board game with multiplayer support.",
      link: "https://github.com/Abdul-SubhanCheema/Snake-and-Ladder-Game",
      tech: ["C++", "Game Logic", "OOP"],
      category: "Game",
      status: "Complete"
    },
    {
      title: "Enterprise Network Design",
      description: "Complete network infrastructure design for enterprise using Cisco Packet Tracer with VLANs, routing protocols, and security configurations.",
      link: "https://github.com/Abdul-SubhanCheema/Computer-Networks-Project",
      tech: ["Cisco Packet Tracer", "VLANs", "OSPF", "ACLs", "Subnetting"],
      category: "Networks",
      status: "Complete"
    },
    {
      title: "React Counter App",
      description: "Interactive counter application built with React hooks, featuring increment, decrement, and reset functionality with smooth animations.",
      link: "https://github.com/Abdul-SubhanCheema/Counter_App",
      tech: ["React", "Hooks", "CSS3", "JavaScript"],
      category: "Frontend",
      status: "Complete"
    },
    {
      title: "Hifz Quran Mobile App",
      description: "AI-powered mobile application for Quran memorization with personalized learning paths, progress tracking, and intelligent revision reminders.",
      link: null,
      isPrivate: true,
      companyName: "Planet Beyond",
      tech: ["Flutter", "Node.js", "AI/ML", "MongoDB", "Python", "Firebase"],
      category: "Mobile",
      status: "Complete"
    },
    {
      title: "Talk EHR System",
      description: "Comprehensive Electronic Health Records system with patient management, appointment scheduling, and medical data analytics for healthcare providers.",
      link: null,
      isPrivate: true,
      companyName: "Carecloud",
      tech: ["Angular", ".NET Core", "SQL Server", "Azure", "TypeScript"],
      category: "Full-Stack",
      status: "Complete"
    },
    {
    title: "Wedding Venue Booking System",
    description: "Cross-platform mobile app for wedding venue management with booking calendar, vendor coordination, and real-time availability tracking.",
    link: null,
    isPrivate: true,
    companyName: "Independent Client",
    tech: ["React Native", "Node.js", "MongoDB", "Firebase"],
    category: "Mobile",
    status: "Complete"
  }
  ];

  const categories = ["All", "Full-Stack", "Frontend", "Backend", "Mobile", "Networks", "ML/AI", "Game"];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tech.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesPrivacy = showPrivate || !project.isPrivate;
    return matchesSearch && matchesCategory && matchesPrivacy;
  });

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
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1 
              className={`text-3xl md:text-5xl font-bold mb-4 ${colors.text.primary}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              My <span className={colors.gradient.text}>Projects</span>
            </motion.h1>
            <motion.p
              className={`text-lg ${colors.text.secondary} max-w-2xl mx-auto`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              A collection of projects showcasing my skills across different technologies and domains.
            </motion.p>
          </div>

          {/* Search and Filter */}
          <motion.div
            className="flex flex-col md:flex-row gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Search Bar */}
            <div className="relative flex-1">
              <FaSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.text.tertiary} text-sm`} />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg ${colors.glass.secondary} ${colors.text.primary} placeholder-gray-500 border ${colors.border.secondary} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300`}
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category
                      ? 'bg-blue-500 text-white'
                      : `${colors.glass.secondary} ${colors.text.secondary} hover:bg-blue-500/20 hover:text-blue-400`
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Privacy Filter */}
            <div className="flex items-center gap-3">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPrivate}
                  onChange={(e) => setShowPrivate(e.target.checked)}
                  className="sr-only"
                />
                <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
                  showPrivate ? 'bg-blue-500' : 'bg-gray-600'
                }`}>
                  <div className={`absolute w-4 h-4 bg-white rounded-full top-1 transition-transform duration-300 ${
                    showPrivate ? 'translate-x-6' : 'translate-x-1'
                  }`}></div>
                </div>
                <span className={`ml-2 text-sm ${colors.text.secondary}`}>
                  Show Private Projects
                </span>
              </label>
            </div>
          </motion.div>

          {/* Projects Count with Privacy Info */}
          <motion.div
            className="flex items-center justify-between mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <p className={`${colors.text.secondary} text-sm`}>
                Showing {filteredProjects.length} of {projects.length} projects
              </p>
              <div className="flex items-center gap-4 text-xs">
                <span className={`flex items-center gap-1 ${colors.text.tertiary}`}>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  Public: {projects.filter(p => !p.isPrivate).length}
                </span>
                <span className={`flex items-center gap-1 ${colors.text.tertiary}`}>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  Private: {projects.filter(p => p.isPrivate).length}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <FaFilter className={`${colors.text.tertiary} text-sm`} />
              <span className={`${colors.text.tertiary} text-sm`}>Filter by category</span>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence>
            {filteredProjects.length > 0 ? (
              <motion.div
                className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
                layout
              >
                {filteredProjects.map((project, index) => (
                  <div key={project.title} className="break-inside-avoid mb-6">
                    <ProjectCard
                      title={project.title}
                      description={project.description}
                      link={project.link}
                      tech={project.tech}
                      category={project.category}
                      status={project.status}
                      isPrivate={project.isPrivate}
                      companyName={project.companyName}
                      index={index}
                      theme={theme}
                    />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <FaSearch className={`mx-auto text-4xl ${colors.text.tertiary} mb-4`} />
                <h3 className={`text-xl font-semibold ${colors.text.primary} mb-2`}>
                  No projects found
                </h3>
                <p className={`${colors.text.secondary}`}>
                  Try adjusting your search or filter criteria
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
