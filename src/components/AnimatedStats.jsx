import { useEffect, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
function StatCard({ value, label, delay }) {
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
      className="backdrop-blur-md bg-white/5 rounded-xl p-4 md:p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(96,165,250,0.3)]"
    >
      <motion.div
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 text-transparent bg-clip-text mb-1 md:mb-2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: delay + 0.3 }}
      >
        {count}+
      </motion.div>
      <div className="text-gray-400 text-xs md:text-sm">{label}</div>
    </motion.div>
  );
}

export default function AnimatedStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 w-full max-w-2xl px-4 md:px-0">
      <StatCard value={50} label="Projects Done" delay={0.2} />
      <StatCard value={30} label="Happy Clients" delay={0.4} />
      <StatCard value={3} label="Years Experience" delay={0.6} />
    </div>
  );
}
