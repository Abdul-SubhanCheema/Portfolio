
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Abdul-SubhanCheema', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abdulsubhan303', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:abdulsubhancheema97@gmail.com', label: 'Email' },
];

export default function SocialLinks() {
  const theme = useTheme();
  const { colors } = theme;
  
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
            target="_blank"
            rel="noopener noreferrer"
            className={`${colors.glass.secondary} p-3 rounded-lg border ${colors.border.secondary} ${colors.text.accent} hover:${colors.border.primary} transition-all duration-300`}
            whileHover={{ y: -5, scale: 1.1 }}
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
