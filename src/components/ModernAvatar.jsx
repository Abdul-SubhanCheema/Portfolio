// 2D modern avatar matching site theme (dark + blue/cyan accents)
// Glassmorphic circular container with minimal friendly face + subtle animated accents.
// Avoids congestion: generous padding and breathing space.
// No 3D / heavy rendering; purely SVG + framer-motion.

// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ModernAvatar() {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Outer soft glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)' }}
        animate={{
          opacity: hovered ? [0.4, 0.6, 0.4] : 0.4,
          scale: hovered ? [1, 1.05, 1] : 1
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Glass layer */}
      <div className="absolute inset-2 rounded-full backdrop-blur-xl bg-white/5 border border-white/15 shadow-[0_8px_30px_-5px_rgba(0,0,0,0.5)] overflow-hidden" />

      {/* Inner subtle gradient ring */}
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400/10 via-cyan-300/10 to-blue-600/10"
        animate={{ rotate: hovered ? 360 : 0 }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />

      {/* Accent rotating dashed ring */}
      <motion.div
        className="absolute inset-6 rounded-full border border-cyan-400/30"
        style={{ borderStyle: 'dashed' }}
        animate={{ rotate: hovered ? -360 : 0, opacity: hovered ? 0.6 : 0.35 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* SVG avatar content */}
      <svg viewBox="0 0 200 200" className="relative z-10 w-[70%] h-[70%]">
        <defs>
          <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
        </defs>

        {/* Head container (rounded rectangle) */}
        <motion.rect
          x="40"
          y="40"
          width="120"
          height="120"
          rx="32"
          fill="url(#faceGrad)"
          stroke="url(#accentGrad)"
          strokeWidth={hovered ? 3 : 2}
          filter="url(#glow)"
          animate={{ y: hovered ? [40, 38, 40] : 40 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Eyes */}
        <motion.rect
          x="70"
          y="85"
          width="24"
          height="14"
          rx="7"
          fill="#0f172a"
          stroke="#3b82f6"
          strokeWidth="2"
          animate={{ scaleY: hovered ? [1, 0.3, 1] : 1 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.rect
          x="106"
          y="85"
          width="24"
          height="14"
          rx="7"
          fill="#0f172a"
          stroke="#3b82f6"
          strokeWidth="2"
          animate={{ scaleY: hovered ? [1, 0.3, 1] : 1 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
        />
        {/* Eye glow */}
        <circle cx="82" cy="92" r="4" fill="#60a5fa" opacity="0.8" />
        <circle cx="118" cy="92" r="4" fill="#60a5fa" opacity="0.8" />

        {/* Mouth */}
        <motion.path
          d={hovered ? 'M75 120 Q100 128 125 120' : 'M78 122 Q100 125 122 122'}
          stroke="#60a5fa"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          animate={{ opacity: hovered ? [0.8, 1, 0.8] : 0.8 }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        {/* Chest indicator */}
        <motion.circle
          cx="100"
          cy="138"
          r="10"
          fill="#0f172a"
          stroke="url(#accentGrad)"
          strokeWidth="2"
          animate={{ scale: hovered ? [1, 1.15, 1] : 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="100"
          cy="138"
          r="4"
          fill="#3b82f6"
          animate={{ opacity: hovered ? [0.6, 1, 0.6] : [0.4, 0.7, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />

        {/* Floating accent particles */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            cx={60 + i * 20}
            cy={60}
            r={2}
            fill="#60a5fa"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0],
              cy: [60, 52, 48]
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
      </svg>

      {/* Minimal inner shadow ring */}
      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
    </motion.div>
  );
}