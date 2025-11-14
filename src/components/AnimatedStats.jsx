import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

function StatCard({ value, label, delay, colors, isDarkMode }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={`${colors.glass.primary} rounded-xl p-4 md:p-6 transition-all duration-300 cursor-pointer`}
      style={{
        border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.15)'}`
      }}
      whileHover={{
        scale: 1.05,
        y: -4,
        boxShadow: isDarkMode 
          ? '0 0 30px rgba(96,165,250,0.5)' 
          : '0 0 30px rgba(96,165,250,0.25)',
        borderColor: isDarkMode ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.8)'
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={`text-3xl md:text-4xl font-bold ${colors.gradient.text} mb-1 md:mb-2`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: delay + 0.3 }}
      >
        {count}+
      </motion.div>
      <div className={`${colors.text.tertiary} text-xs md:text-sm`}>{label}</div>
    </motion.div>
  );
}

export default function AnimatedStats() {
  const theme = useTheme();
  const { colors, isDarkMode } = theme;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl px-4 md:px-0">
      <StatCard value={50} label="Projects Done" delay={0.2} colors={colors} isDarkMode={isDarkMode} />
      <StatCard value={30} label="Happy Clients" delay={0.4} colors={colors} isDarkMode={isDarkMode} />
      <StatCard value={3} label="Years Experience" delay={0.6} colors={colors} isDarkMode={isDarkMode} />
    </div>
  );
}
