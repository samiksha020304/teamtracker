import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { motion } from 'framer-motion';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="ml-[280px] p-8 transition-all duration-300"
      >
        {children}
      </motion.main>
    </div>
  );
}
