// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import NeuralNetwork from '../components/NeuralNetwork';
import CustomCursor from '../components/CustomCursor';
import TypedText from '../components/TypedText';
import MagneticButton from '../components/MagneticButton';
import SocialLinks from '../components/SocialLinks';
import { useTheme } from '../context/ThemeContext';
import profileImg from '../assets/Media.jpg'

export default function Portfolio() {
  const theme = useTheme();
  const { colors } = theme;
  
  return (
    <div className={`min-h-screen w-screen ${colors.primary} relative overflow-x-hidden flex flex-col`}>
      {/* Custom Cursor - Hidden on touch devices */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Neural Network Background */}
      <NeuralNetwork />

      <Navbar />

      <main className="flex flex-col items-center justify-center px-4 md:px-6 pt-24 md:pt-28 pb-8 md:pb-12 relative z-10">
        <div className="flex flex-col items-center justify-center gap-10 md:gap-16 max-w-6xl w-full">
          {/* Main Content Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 w-full">
            <motion.div
              className="md:w-1/2 text-center md:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <motion.h1
                className={`text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4 ${colors.text.primary}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Hi, I'm <span className={colors.gradient.text}>Abdul Subhan</span>
              </motion.h1>
              <motion.h2
                className={`text-lg sm:text-xl md:text-3xl mb-4 md:mb-6 font-semibold min-h-[2rem] md:min-h-[2.5rem] ${colors.text.secondary}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <TypedText
                  texts={['Software Engineer', 'Full Stack Developer', 'DevOps Enthusiast', 'Creative Problem Solver']}
                  className={colors.gradient.textLight}
                />
              </motion.h2>
              <motion.p
                className={`${colors.text.secondary} mb-6 md:mb-8 text-base md:text-lg leading-relaxed px-2 md:px-0`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                Software engineer with a passion for clean code and user-centric design. I specialize in creating
                scalable applications that solve real-world problems with modern technologies and best practices.
              </motion.p>

              <motion.div
                className="flex justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                {/* <MagneticButton className={`relative ${colors.glass.hover} ${colors.text.accent} font-semibold py-2.5 px-6 md:py-3 md:px-8 rounded-lg shadow-lg overflow-hidden group border ${colors.border.primary} hover:scale-105 transition-all duration-300`}>
                  <span className="relative z-10">View My Work</span>
                </MagneticButton> */}
              </motion.div>

              <SocialLinks />
            </motion.div>

            <motion.div
              className="md:w-1/2 flex justify-center order-first md:order-last mb-0 md:mb-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="relative">
                {/* Animated glow rings - theme aware */}
                <motion.div
                  className="absolute inset-0 bg-blue-500/40 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl"
                  animate={{
                    scale: [1.1, 1.3, 1.1],
                    opacity: [0.2, 0.4, 0.2]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                <motion.img
                  src={profileImg}
                  alt="Profile"
                  className={`rounded-full h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 object-cover relative border-4 ${colors.border.primary} shadow-2xl`}
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
