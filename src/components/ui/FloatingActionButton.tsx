
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export const FloatingActionButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-8 right-8 p-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full shadow-lg cursor-pointer z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Plus size={24} />
    </motion.button>
  );
};
