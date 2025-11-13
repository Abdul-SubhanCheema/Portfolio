
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import NeuralNetwork from '../components/NeuralNetwork';
import CustomCursor from '../components/CustomCursor';
import { useTheme } from '../context/ThemeContext';
import { FaGithub } from "react-icons/fa";

const ProjectCard = ({ title, description, link, index }) => (
  <motion.div
    className="group relative backdrop-blur-xl bg-gradient-to-br from-slate-700/50 to-slate-800/30 rounded-xl p-6 border border-white/20 transition-all duration-300 hover:border-blue-400/40"
    whileHover={{ 
      scale: 1.02,
      y: -4,
      boxShadow: "0 10px 40px -10px rgba(59, 130, 246, 0.3)"
    }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 0.5,
      delay: index * 0.1
    }}
  >
    {/* Subtle accent overlay */}
    <motion.div
      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10"
      style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), transparent 50%, rgba(34, 211, 238, 0.12))'
      }}
      transition={{ duration: 0.3 }}
    />
    
    <div className="relative z-10">
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-200 transition-colors duration-200">{title}</h3>
      <p className="text-slate-300 mb-6 leading-relaxed">{description}</p>
      <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-400/30 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaGithub className="mr-2" /> View on GitHub
      </motion.a>
    </div>
  </motion.div>
);

export default function Projects() {
  const { colors } = useTheme();

  const projects = [
    {
      title: "Management System",
      description:
        "A full-stack web app for managing customers, employees, and billing using MongoDB, Express, React, and Node.js.",
      link: "https://github.com/Abdul-SubhanCheema/Bhata-System",
    },
    {
      title: "Pharmacy Management System",
      description:
        "A comprehensive system designed to manage medication inventory, prescription processing, billing & insurance, and generate real-time analytics.",
      link: "https://github.com/bilal-akbar-9/SPM",
    },
    {
      title: "Weather App (MERN)",
      description:
        "Live weather forecast app with location-based weather details, built with React frontend and Express backend.",
      link: "https://github.com/Abdul-SubhanCheema/Weather-App",
    },
    {
      title: "Car Wash Management",
      description:
        "A web-based system to manage bookings, billing, and services for a car wash using SQL Server and ASP.NET Web Forms.",
      link: "https://github.com/Abdul-SubhanCheema/Car-Wash-Management-System",
    },
    {
      title: "Course Registration System",
      description:
        "Java-based desktop application to manage course enrollments with advisor approval and prerequisite checking.",
      link: "https://github.com/Abdul-SubhanCheema/Course_Registration_System",
    },
    {
      title: "Tic Tac Toe Game",
      description:
        "Classic 2-player Tic Tac Toe game built with HTML, CSS, and JavaScript with smooth interactions.",
      link: "https://github.com/Abdul-SubhanCheema/Tic-Tac-Toe-",
    },
    {
      title: "Grocery Management System ",
      description:
        "Console-based C++ application to manage products, stock updates, billing, and reports for a grocery store.",
      link: "https://github.com/Abdul-SubhanCheema/Grocery-Management-System",
    },
    {
      title: "Snake and Ladder Game",
      description:
        "Text-based C++ implementation of the Snake and Ladder board game with two-player support.",
      link: "https://github.com/Abdul-SubhanCheema/Snake-and-Ladder-Game",
    },
    {
      title: "Job Listing & Filtering",
      description:
        "Frontend-only project to display and filter job listings dynamically using HTML, CSS, and JavaScript.",
      link: "https://github.com/Abdul-SubhanCheema/Job-Listening-and-Filtering-Application",
    },
    {
      title: "Home Price Predictor",
      description:
        "Machine learning app to predict house prices using Python & Flask, with a user-friendly HTML/JS frontend.",
      link: "https://github.com/Abdul-SubhanCheema/MLOPS_Project",
    },
    {
      title: "Blog Application",
      description:
        "Full-featured blog platform where users can create, edit, and delete posts, with MongoDB and Node.js backend.",
      link: "https://github.com/fast-isb/Blog-Application/tree/master",
    },
    {
      title: "E-Commerce Platform",
      description:
        "Modern e-commerce web application with Angular frontend and .NET Core backend, featuring product catalog, shopping cart, user authentication, and payment integration.",
      link: "https://github.com/Abdul-SubhanCheema/Ecommerce",
    },
    {
      title: "POS System for Fertilizer Company",
      description:
        "Comprehensive Point of Sale system with dual interfaces - Admin dashboard for inventory management, sales analytics, and user control, plus Cashier interface for transaction processing and billing operations.",
      link: "https://github.com/Abdul-SubhanCheema/POS",
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
          className="max-w-7xl mx-auto"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            My <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 text-transparent bg-clip-text">Projects</span>
          </motion.h1>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                link={project.link}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
