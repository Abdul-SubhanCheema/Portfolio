import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Navbar from "../components/navbar";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Particle = ({ id }) => (
  <div
    key={id}
    className="absolute rounded-full bg-blue-300 opacity-30"
    style={{
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      width: `${Math.random() * 8 + 2}px`,
      height: `${Math.random() * 8 + 2}px`,
      animation: `float ${Math.random() * 10 + 10}s linear infinite`,
    }}
  />
);

export default function Contact() {
  const [particles, setParticles] = useState([]);
  const [success, setSuccess] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
    setParticles(Array.from({ length: particleCount }, (_, i) => i));

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(10px, 10px) rotate(5deg); }
        50% { transform: translate(0, 20px) rotate(0deg); }
        75% { transform: translate(-10px, 10px) rotate(-5deg); }
        100% { transform: translate(0, 0) rotate(0deg); }
      }
    `;
    document.head.appendChild(style);

    return () => document.head.removeChild(style);
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

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
          formRef.current.reset();

          // Hide alert after 3 seconds
          setTimeout(() => setSuccess(false), 3000);
        },
        (error) => {
          console.error("EmailJS Error:", error.text);
        }
      );
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 overflow-hidden z-0">
        {particles.map((id) => (
          <Particle key={id} id={id} />
        ))}
      </div>

      <div className="relative z-10">
        <Navbar />

        <motion.div
          className="max-w-2xl mx-auto mt-12 bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold text-center mb-6">Contact Me</h2>

          <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
            <motion.input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-2 rounded bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-2 rounded bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.textarea
              name="message"
              placeholder="Your Message"
              required
              rows="5"
              className="w-full px-4 py-2 rounded bg-white bg-opacity-20 backdrop-blur-md text-white placeholder-gray-300 focus:outline-none"
              whileFocus={{ scale: 1.02 }}
            />
            <motion.button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition duration-300 py-2 rounded text-white font-semibold"
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>

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

          <motion.div
            className="mt-6 text-center space-x-4 text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href="https://wa.me/your_number"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:text-green-400"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://facebook.com/your_page"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:text-blue-400"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com/your_profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:text-pink-400"
            >
              <FaInstagram />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
