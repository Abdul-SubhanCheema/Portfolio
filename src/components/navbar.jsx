import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Projects", to: "/projects" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="relative z-50 px-6 pt-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-white"
        >
          RK
        </motion.div>

        {/* Desktop Links */}
        <motion.ul 
          className="hidden md:flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.to}
                className="hover:text-blue-300 transition-colors duration-300 text-white"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </motion.ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-blue-400 hover:text-blue-300 transition duration-300 p-2 rounded-lg focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-blue-950/60 backdrop-blur-md rounded-xl shadow-lg p-4 space-y-2"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-white rounded-md hover:bg-blue-800 hover:text-blue-300 transition-all duration-300"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
