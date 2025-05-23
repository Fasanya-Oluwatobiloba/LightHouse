import { motion } from 'framer-motion';
import { FiUpload } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function FloatingButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 z-50"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate('/admin/upload')}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <FiUpload className="text-xl" />
      <span className="sr-only">Upload Sermon</span>
    </motion.button>
  );
}