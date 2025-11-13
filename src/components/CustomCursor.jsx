import { useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorOuterX = useMotionValue(-100);
  const cursorOuterY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const outerSpringConfig = { damping: 15, stiffness: 150 };
  const cursorOuterXSpring = useSpring(cursorOuterX, outerSpringConfig);
  const cursorOuterYSpring = useSpring(cursorOuterY, outerSpringConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 6);
      cursorY.set(e.clientY - 6);
      cursorOuterX.set(e.clientX - 20);
      cursorOuterY.set(e.clientY - 20);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY, cursorOuterX, cursorOuterY]);

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: cursorOuterXSpring,
          top: cursorOuterYSpring,
          width: '40px',
          height: '40px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-full h-full rounded-full border-2 border-blue-400 opacity-50" />
      </motion.div>
      
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          width: '12px',
          height: '12px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="w-full h-full rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.8)]" />
      </motion.div>
    </>
  );
}
