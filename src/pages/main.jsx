import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import NeuralNetwork from '../components/NeuralNetwork';
import CustomCursor from '../components/CustomCursor';
import TypedText from '../components/TypedText';
import MagneticButton from '../components/MagneticButton';
import AnimatedStats from '../components/AnimatedStats';
import SocialLinks from '../components/SocialLinks';
import { useTheme } from '../context/ThemeContext';
import profileImg from '../assets/profile.jpg'

export default function Portfolio() {
  const { colors } = useTheme();
  
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

      <main className="flex-grow flex items-center justify-center px-4 md:px-6 py-8 md:py-0 relative z-10">
        <div className="flex flex-col items-center justify-center gap-6 md:gap-10 max-w-6xl w-full">
          {/* Main Content Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 w-full">
            <motion.div
              className="md:w-1/2 text-center md:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 text-transparent bg-clip-text">Abdul Subhan</span>
              </motion.h1>
              <motion.h2
                className="text-lg sm:text-xl md:text-3xl mb-4 md:mb-6 font-semibold min-h-[2rem] md:min-h-[2.5rem]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <TypedText
                  texts={['Software Engineer', 'Full Stack Developer', 'DevOps Enthusiast', 'Creative Problem Solver']}
                  className="bg-gradient-to-r from-gray-300 to-gray-400 text-transparent bg-clip-text"
                />
              </motion.h2>
              <motion.p
                className="text-gray-400 mb-6 md:mb-8 text-base md:text-lg leading-relaxed px-2 md:px-0"
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
                <MagneticButton className="relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-2.5 px-6 md:py-3 md:px-8 rounded-lg shadow-lg overflow-hidden group hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-shadow duration-300">
                  <span className="relative z-10">View My Work</span>
                  <motion.div
                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5 }}
                  />
                </MagneticButton>
              </motion.div>

              <SocialLinks />
            </motion.div>

            <motion.div
              className="md:w-1/2 flex justify-center order-first md:order-last mb-6 md:mb-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="relative">
                {/* Animated glow rings */}
                <motion.div
                  className="absolute inset-0 bg-blue-500 rounded-full blur-2xl opacity-40"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.6, 0.4]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-30"
                  animate={{
                    scale: [1.1, 1.3, 1.1],
                    opacity: [0.3, 0.5, 0.3]
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
                  className="rounded-full h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64 object-cover relative border-4 border-blue-400 shadow-2xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Animated Stats Section */}
          <AnimatedStats />
        </div>
      </main>
    </div>
  );
}
