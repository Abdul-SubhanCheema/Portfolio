import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Navbar from "../components/navbar";
import NeuralNetwork from '../components/NeuralNetwork';
import CustomCursor from '../components/CustomCursor';
import { useTheme } from '../context/ThemeContext';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  const theme = useTheme();
  const { colors } = theme;
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          setIsLoading(false);
          formRef.current.reset();

          // Hide alert after 5 seconds
          setTimeout(() => setSuccess(false), 5000);
        },
        (error) => {
          console.error("EmailJS Error:", error.text);
          setIsLoading(false);
        }
      );
  };

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
          className="max-w-6xl mx-auto"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Get In <span className={colors.gradient.text}>Touch</span>
          </motion.h1>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className={`${colors.glass.primary} rounded-xl p-8`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Send a Message</h2>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Your Name"
                    required
                    className={`w-full px-4 py-3 rounded-lg ${colors.glass.secondary} ${colors.text.primary} placeholder-gray-400 border-2 ${colors.border.secondary} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200`}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <input
                    type="email"
                    name="user_email"
                    placeholder="Your Email"
                    required
                    className={`w-full px-4 py-3 rounded-lg ${colors.glass.secondary} ${colors.text.primary} placeholder-gray-400 border-2 ${colors.border.secondary} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200`}
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    required
                    rows="6"
                    className={`w-full px-4 py-3 rounded-lg ${colors.glass.secondary} ${colors.text.primary} placeholder-gray-400 border-2 ${colors.border.secondary} focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 resize-none`}
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-slate-500 disabled:to-slate-600 transition-all duration-300 py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2"
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaEnvelope className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className={`${colors.glass.primary} rounded-xl p-6`}>
                <h3 className={`text-xl font-bold mb-4 ${colors.text.primary}`}>Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <FaEnvelope className={colors.text.accent} />
                    </div>
                    <div>
                      <p className={`text-sm ${colors.text.tertiary}`}>Email</p>
                      <p className={`${colors.text.primary} font-medium`}>abdulsubhancheema97@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <FaPhone className="text-green-400" />
                    </div>
                    <div>
                      <p className={`text-sm ${colors.text.tertiary}`}>Phone</p>
                      <p className={`${colors.text.primary} font-medium`}>+92 343 8903037</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <FaMapMarkerAlt className="text-purple-400" />
                    </div>
                    <div>
                      <p className={`text-sm ${colors.text.tertiary}`}>Location</p>
                      <p className={`${colors.text.primary} font-medium`}>Islamabad, Pakistan</p>
                    </div>
                  </div>
                </div>
              </div>

          {/* Animated Alert */}
          <AnimatePresence>
            {success && (
              <motion.div
                className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
              >
                ✅ Message sent successfully!
              </motion.div>
            )}
          </AnimatePresence>

              <div className={`${colors.glass.primary} rounded-xl p-6`}>
                <h3 className={`text-xl font-bold mb-4 ${colors.text.primary}`}>Connect With Me</h3>
                <div className="flex gap-4">
                  <motion.a
                    href="https://wa.me/923438903037"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg text-green-300 hover:bg-green-500/30 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaWhatsapp className="text-xl" />
                  </motion.a>
                  
                  <motion.a
                    href="https://www.facebook.com/share/16RRTzFgnh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaFacebook className="text-xl" />
                  </motion.a>
                  
                  <motion.a
                    href="https://www.instagram.com/abdulsubhancheema?igsh=em92Y3VnajZlenpt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-pink-500/20 rounded-lg text-pink-300 hover:bg-pink-500/30 transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaInstagram className="text-xl" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
