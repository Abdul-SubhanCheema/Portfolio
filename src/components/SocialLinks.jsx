
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
const socialLinks = [
  { icon: Github, href: 'https://github.com/Abdul-SubhanCheema', label: 'GitHub', color: 'hover:text-gray-300' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abdulsubhan303', label: 'LinkedIn', color: 'hover:text-blue-400' },
  { icon: Mail, href: 'mailto:abdulsubhancheema97@gmail.com', label: 'Email', color: 'hover:text-red-400' },
];

export default function SocialLinks() {
  return (
    <motion.div
      className="flex gap-3 md:gap-4 mt-4 md:mt-6 justify-center md:justify-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.3 }}
    >
      {socialLinks.map((social, index) => {
        const Icon = social.icon;
        return (
          <motion.a
            key={social.label}
            href={social.href}
            className={`backdrop-blur-md bg-white/5 p-3 rounded-lg border border-white/10 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(96,165,250,0.4)]`}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.3 + index * 0.1 }}
          >
            <Icon size={20} />
          </motion.a>
        );
      })}
    </motion.div>
  );
}
