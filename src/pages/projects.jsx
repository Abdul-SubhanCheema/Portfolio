import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/navbar";
import { FaGithub } from "react-icons/fa";

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

const ProjectCard = ({ title, description, link }) => (
  <motion.div
    className="bg-gray-800 bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-5 hover:shadow-lg transition duration-300"
    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300 mb-4">{description}</p>
    <a
      href={link}
      className="flex items-center text-blue-400 hover:underline mt-2"
    >
      <FaGithub className="mr-2" /> View on GitHub
    </a>
  </motion.div>
);

export default function Projects() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
    setParticles(Array.from({ length: particleCount }, (_, i) => i));

    const style = document.createElement("style");
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

  const projects = [
    {
      title: "Management System (MERN)",
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
      title: "Car Wash Management (C#, ASP.NET)",
      description:
        "A web-based system to manage bookings, billing, and services for a car wash using SQL Server and ASP.NET Web Forms.",
      link: "https://github.com/Abdul-SubhanCheema/Car-Wash-Management-System",
    },
    {
      title: "Course Registration System (Java)",
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
      title: "Grocery Management System (C++)",
      description:
        "Console-based C++ application to manage products, stock updates, billing, and reports for a grocery store.",
      link: "https://github.com/Abdul-SubhanCheema/Grocery-Management-System",
    },
    {
      title: "Snake and Ladder Game (C++)",
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
      title: "Blog Application (MERN)",
      description:
        "Full-featured blog platform where users can create, edit, and delete posts, with MongoDB and Node.js backend.",
      link: "https://github.com/fast-isb/Blog-Application/tree/master",
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden px-6 pt-4 pb-16">
      <div className="absolute inset-0 overflow-hidden z-0">
        {particles.map((id) => (
          <Particle key={id} id={id} />
        ))}
      </div>

      <div className="relative z-10">
        <Navbar />

        <motion.div
          className="container mx-auto mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-center mb-10">My Projects</h2>
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
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
