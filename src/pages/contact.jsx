import { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Navbar from "../components/navbar";
import NeuralNetwork from '../components/NeuralNetwork';
import CustomCursor from '../components/CustomCursor';
import { useTheme } from '../context/ThemeContext';
import { FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle, FaExclamationTriangle, FaTimes, FaGlobe, FaBolt } from "react-icons/fa";

export default function Contact() {
  const theme = useTheme();
  const { colors } = theme;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const formRef = useRef();

  // Real-time validation function
  const validateField = (name, value) => {
    switch (name) {
      case 'user_name':
        if (!value.trim()) {
          return 'Name is required';
        } else if (value.trim().length < 2) {
          return 'Name must be at least 2 characters';
        }
        return '';
      
      case 'user_email': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          return 'Email is required';
        } else if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      }
      
      case 'message':
        if (!value.trim()) {
          return 'Message is required';
        } else if (value.trim().length < 10) {
          return 'Message must be at least 10 characters';
        }
        return '';
      
      default:
        return '';
    }
  };

  // Validation function for form submission
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    const nameError = validateField('user_name', formData.user_name);
    if (nameError) newErrors.user_name = nameError;

    // Email validation
    const emailError = validateField('user_email', formData.user_email);
    if (emailError) newErrors.user_email = emailError;

    // Message validation
    const messageError = validateField('message', formData.message);
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes with real-time validation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Real-time validation - show error immediately if field has been touched
    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  // Handle blur events for additional validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const fieldError = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    
    // Validate form before sending
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError(false);
    setSuccess(false);

    // Check if environment variables are set
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log('EmailJS Config Check:', {
      serviceId: serviceId ? 'Set' : 'Missing',
      templateId: templateId ? 'Set' : 'Missing',
      publicKey: publicKey ? 'Set' : 'Missing'
    });

    if (!serviceId || !templateId || !publicKey) {
      console.error('EmailJS environment variables are not set properly');
      setError('Email service is not configured. Please check environment variables.');
      setIsLoading(false);
      return;
    }

    // Initialize EmailJS
    emailjs.init(publicKey);

    console.log('Sending email with form data:', formData);

    emailjs
      .sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      )
      .then(
        (result) => {
          console.log('EmailJS Success:', result);
          setSuccess(true);
          setIsLoading(false);
          setFormData({
            user_name: '',
            user_email: '',
            message: ''
          });
          formRef.current.reset();

          // Hide success message after 5 seconds
          setTimeout(() => setSuccess(false), 5000);
        },
        (error) => {
          console.error("EmailJS Error Details:", {
            status: error.status,
            text: error.text,
            message: error.message
          });
          
          let errorMessage = 'Failed to send message. ';
          
          if (error.text && error.text.includes('Invalid grant')) {
            errorMessage += 'Gmail authorization has expired. Please contact me directly via WhatsApp or email.';
          } else if (error.status === 400) {
            errorMessage += 'Invalid request. Please check your form data.';
          } else if (error.status === 401) {
            errorMessage += 'Authentication failed. Please contact me directly.';
          } else if (error.status === 402) {
            errorMessage += 'Service temporarily unavailable. Please try again later.';
          } else if (error.status === 404) {
            errorMessage += 'Service configuration error. Please contact me directly.';
          } else {
            errorMessage += 'Please try again or contact me directly via WhatsApp.';
          }
          
          setError(errorMessage);
          setIsLoading(false);
          
          // Hide error message after 10 seconds
          setTimeout(() => setError(false), 10000);
        }
      );
  };

  return (
    <div className={`min-h-screen w-screen ${colors.primary} ${colors.text.primary} relative overflow-x-hidden flex flex-col`}>
      {/* Custom Cursor - Hidden on touch devices */}
      <div className="hidden md:block">
        <CustomCursor />
      </div>

      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [-20, 20, -20],
            y: [20, -20, 20],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Neural Network Background */}
      <NeuralNetwork />

      <Navbar />
      
      {/* Main content with better spacing */}
      <main className="flex-grow container mx-auto px-4 md:px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Compact Hero Section */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-2 mb-6"
            >
              <FaEnvelope className="text-blue-400 text-sm" />
              <span className={`${colors.text.secondary} font-medium text-sm`}>Let's Connect</span>
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Get In{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h1>
            
            <motion.p 
              className={`text-lg md:text-xl ${colors.text.secondary} max-w-2xl mx-auto leading-relaxed`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Ready to bring your ideas to life? Let's discuss your project.
            </motion.p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form - Compact */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl" />
                
                <div className={`relative ${colors.glass.primary} backdrop-blur-xl rounded-xl p-6 md:p-8 border border-white/10`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <FaPaperPlane className="text-white text-lg" />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${colors.text.primary}`}>Send Message</h2>
                      <p className={`${colors.text.secondary} text-sm`}>I'll reply within 24 hours</p>
                    </div>
                  </div>

                  <form ref={formRef} onSubmit={sendEmail} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="relative group"
                    >
                      <label className={`block text-sm font-medium ${colors.text.secondary} mb-2`}>
                        Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="user_name"
                          value={formData.user_name}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Your full name"
                          className={`w-full px-4 py-3 rounded-lg ${colors.glass.secondary} backdrop-blur-sm ${colors.text.primary} placeholder-gray-500 border transition-all duration-300 ${
                            errors.user_name 
                              ? 'border-red-400' 
                              : formData.user_name && !errors.user_name 
                                ? 'border-green-400' 
                                : `border-gray-600 hover:border-blue-500/50 focus:border-blue-500 ${colors.border.secondary}`
                          } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                        />
                        {formData.user_name && !errors.user_name && (
                          <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                        )}
                      </div>
                      {errors.user_name && (
                        <motion.p 
                          className="text-red-400 text-sm mt-2 flex items-center gap-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <FaExclamationTriangle className="text-xs" />
                          {errors.user_name}
                        </motion.p>
                      )}
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="relative group"
                    >
                      <label className={`block text-sm font-medium ${colors.text.secondary} mb-2`}>
                        Email *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="user_email"
                          value={formData.user_email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="your.email@example.com"
                          className={`w-full px-4 py-3 rounded-lg ${colors.glass.secondary} backdrop-blur-sm ${colors.text.primary} placeholder-gray-500 border transition-all duration-300 ${
                            errors.user_email 
                              ? 'border-red-400' 
                              : formData.user_email && !errors.user_email 
                                ? 'border-green-400' 
                                : `border-gray-600 hover:border-blue-500/50 focus:border-blue-500 ${colors.border.secondary}`
                          } focus:ring-2 focus:ring-blue-500/20 focus:outline-none`}
                        />
                        {formData.user_email && !errors.user_email && (
                          <FaCheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400" />
                        )}
                      </div>
                      {errors.user_email && (
                        <motion.p 
                          className="text-red-400 text-sm mt-2 flex items-center gap-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <FaExclamationTriangle className="text-xs" />
                          {errors.user_email}
                        </motion.p>
                      )}
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="relative group"
                    >
                      <label className={`block text-sm font-medium ${colors.text.secondary} mb-2`}>
                        Message *
                      </label>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          placeholder="Tell me about your project..."
                          rows="5"
                          className={`w-full px-4 py-3 rounded-lg ${colors.glass.secondary} backdrop-blur-sm ${colors.text.primary} placeholder-gray-500 border transition-all duration-300 ${
                            errors.message 
                              ? 'border-red-400' 
                              : formData.message && !errors.message 
                                ? 'border-green-400' 
                                : `border-gray-600 hover:border-blue-500/50 focus:border-blue-500 ${colors.border.secondary}`
                          } focus:ring-2 focus:ring-blue-500/20 focus:outline-none resize-none`}
                        />
                        {formData.message && !errors.message && (
                          <FaCheckCircle className="absolute right-3 top-3 text-green-400" />
                        )}
                      </div>
                      {errors.message && (
                        <motion.p 
                          className="text-red-400 text-sm mt-2 flex items-center gap-2"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <FaExclamationTriangle className="text-xs" />
                          {errors.message}
                        </motion.p>
                      )}
                    </motion.div>
                    
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-500 disabled:to-gray-600 transition-all duration-300 py-3 rounded-lg text-white font-semibold shadow-lg hover:shadow-xl overflow-hidden group"
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <FaPaperPlane className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </div>
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Information - Sidebar */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Contact Details */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl blur-xl" />
                <div className={`relative ${colors.glass.primary} backdrop-blur-xl rounded-xl p-6 border border-white/10`}>
                  <div className="flex items-center gap-3 mb-4">
                    <FaEnvelope className="text-blue-400" />
                    <h3 className={`text-lg font-bold ${colors.text.primary}`}>Contact Info</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { icon: FaEnvelope, label: "Email", value: "abdulsubhancheema97@gmail.com", href: "mailto:abdulsubhancheema97@gmail.com" },
                      { icon: FaPhone, label: "Phone", value: "+92 343 8903037", href: "tel:+923438903037" },
                      { icon: FaMapMarkerAlt, label: "Location", value: "Islamabad, Pakistan" }
                    ].map((item) => (
                      <div key={item.label} className="group">
                        {item.href ? (
                          <a href={item.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                              <item.icon className="text-blue-400 text-sm" />
                            </div>
                            <div>
                              <p className={`text-xs ${colors.text.tertiary}`}>{item.label}</p>
                              <p className={`${colors.text.primary} text-sm font-medium`}>{item.value}</p>
                            </div>
                          </a>
                        ) : (
                          <div className="flex items-center gap-3 p-3">
                            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                              <item.icon className="text-purple-400 text-sm" />
                            </div>
                            <div>
                              <p className={`text-xs ${colors.text.tertiary}`}>{item.label}</p>
                              <p className={`${colors.text.primary} text-sm font-medium`}>{item.value}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-cyan-500/5 rounded-xl blur-xl" />
                <div className={`relative ${colors.glass.primary} backdrop-blur-xl rounded-xl p-6 border border-white/10`}>
                  <div className="flex items-center gap-3 mb-4">
                    <FaGlobe className="text-purple-400" />
                    <h3 className={`text-lg font-bold ${colors.text.primary}`}>Social Links</h3>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: FaWhatsapp, href: "https://wa.me/923438903037", label: "WhatsApp", color: "green" },
                      { icon: FaFacebook, href: "https://www.facebook.com/share/16RRTzFgnh/", label: "Facebook", color: "blue" },
                      { icon: FaInstagram, href: "https://www.instagram.com/abdulsubhancheema?igsh=em92Y3VnajZlenpt", label: "Instagram", color: "pink" }
                    ].map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex flex-col items-center justify-center p-3 rounded-lg bg-${social.color}-500/10 hover:bg-${social.color}-500/20 border border-${social.color}-500/20 transition-all duration-300`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className={`text-${social.color}-400 text-xl mb-1`} />
                        <span className={`text-xs ${colors.text.secondary}`}>{social.label}</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl blur-xl" />
                <div className={`relative ${colors.glass.primary} backdrop-blur-xl rounded-xl p-6 border border-white/10 text-center`}>
                  <FaBolt className="text-cyan-400 text-2xl mx-auto mb-3" />
                  <h4 className={`text-lg font-bold ${colors.text.primary} mb-2`}>Quick Response</h4>
                  <p className={`${colors.text.secondary} text-sm`}>
                    Usually respond within 24 hours. For urgent queries, WhatsApp me!
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Compact Animated Alerts */}
      <AnimatePresence>
        {success && (
          <motion.div
            className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl shadow-xl z-50"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-lg" />
              <div>
                <p className="font-semibold text-sm">Message Sent!</p>
                <p className="text-xs opacity-90">I'll reply soon.</p>
              </div>
            </div>
          </motion.div>
        )}
        {error && (
          <motion.div
            className="fixed bottom-6 right-6 bg-gradient-to-r from-red-500 to-rose-500 text-white px-6 py-3 rounded-xl shadow-xl z-50 max-w-sm"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex items-start gap-3">
              <FaTimes className="text-lg mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Send Failed</p>
                <p className="text-xs opacity-90">{typeof error === 'string' ? error : 'Please try again.'}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}