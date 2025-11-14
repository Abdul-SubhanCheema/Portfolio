import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme, colors } = useTheme();

  const navLinks = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Projects", to: "/projects" },
    { name: "Contact", to: "/contact" },
  ];

  return (
    <nav className="relative z-50 px-4 md:px-6 pt-6">
      <motion.div 
        className={`container mx-auto ${colors.glass.primary} rounded-2xl px-6 py-4 shadow-2xl relative overflow-hidden`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated border effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(59, 130, 246, 0.2) 25%, 
              rgba(34, 211, 238, 0.3) 50%, 
              rgba(59, 130, 246, 0.2) 75%, 
              transparent 100%
            )`,
            backgroundSize: '200% 100%'
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 0%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              'inset 0 0 20px rgba(59, 130, 246, 0.1)',
              'inset 0 0 30px rgba(34, 211, 238, 0.15)',
              'inset 0 0 20px rgba(59, 130, 246, 0.1)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="relative flex justify-between items-center">
          {/* Mobile Menu Button - Left Side (Mobile Only) */}
          <div className="md:hidden relative z-10">
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`relative p-3 rounded-xl ${colors.glass.secondary} ${colors.text.accent} hover:${colors.text.accent.replace('text-', 'text-blue-')}200 transition-all duration-300 hover:${colors.glass.hover} focus:outline-none`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: menuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
              
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>

          {/* Enhanced Logo - Left on Desktop, Center on Mobile */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative group cursor-pointer md:flex-none flex-1 md:text-left text-center"
          >
            <motion.div
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 text-transparent bg-clip-text relative z-10"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              RK
            </motion.div>
            {/* Logo glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-300/20 blur-lg rounded-lg opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Enhanced Desktop Links */}
          <motion.ul 
            className="hidden md:flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.to;
              return (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 group ${
                      isActive 
                        ? `${colors.text.accent} bg-blue-500/20 border border-blue-400/30` 
                        : `${colors.text.primary} hover:${colors.text.accent} hover:bg-white/10`
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    
                    {/* Animated underline */}
                    <motion.span 
                      className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"
                      initial={{ width: 0, x: '-50%' }}
                      animate={{ 
                        width: isActive ? '60%' : '0%',
                        x: '-50%'
                      }}
                      whileHover={{ width: '60%' }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className={`relative p-3 rounded-xl ${colors.glass.secondary} ${colors.text.accent} hover:${colors.text.accent.replace('text-', 'text-blue-')}200 transition-all duration-300 hover:${colors.glass.hover} focus:outline-none group`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div
              animate={{ rotate: isDarkMode ? 0 : 180 }}
              transition={{ duration: 0.5 }}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </motion.div>
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, scale: 0.95 }}
            animate={{ height: "auto", opacity: 1, scale: 1 }}
            exit={{ height: 0, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`md:hidden mt-4 ${colors.glass.primary} rounded-xl shadow-2xl p-4 space-y-1 relative overflow-hidden`}
          >
            {/* Mobile menu background effect */}
            <motion.div
              className={`absolute inset-0 ${colors.glass.secondary} rounded-xl`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.to;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`relative block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive 
                        ? `${colors.text.accent} bg-blue-500/20 border border-blue-400/30` 
                        : `${colors.text.primary} hover:bg-white/10 hover:${colors.text.accent}`
                    }`}
                  >
                    <span className="relative z-10">{link.name}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute left-2 top-1/2 w-1 h-6 bg-gradient-to-b from-blue-400 to-cyan-300 rounded-full"
                        initial={{ height: 0, y: '-50%' }}
                        animate={{ height: 24, y: '-50%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
