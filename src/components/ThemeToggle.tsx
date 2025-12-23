import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-secondary/50 backdrop-blur-sm border border-border p-1 transition-colors hover:bg-secondary"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="absolute w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg"
        animate={{ x: theme === 'dark' ? 0 : 24 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 text-primary-foreground" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-primary-foreground" />
        )}
      </motion.div>
      <div className="flex justify-between items-center px-1">
        <Moon className="w-3 h-3 text-muted-foreground" />
        <Sun className="w-3 h-3 text-muted-foreground" />
      </div>
    </motion.button>
  );
}
