import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { SermonService } from '../services/sermon';
import SermonCard from '../components/SermonCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AnimatedText from '../components/AnimatedText';
import WaveDivider from '../components/WaveDivider';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function MonthSermons() {
  const { year, month } = useParams();
  const navigate = useNavigate();
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSermons = async () => {
      try {
        const data = await SermonService.getByYearAndMonth(year, month);
        setSermons(data);
      } finally {
        setLoading(false);
      }
    };
    loadSermons();
  }, [year, month]);

  const monthName = monthNames[parseInt(month) - 1];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" />
        <AnimatedText 
          text={`Loading ${monthName} ${year} messages...`} 
          className="mt-4 text-lg text-gray-600"
        />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {monthName} {year}
          </motion.h1>
          <motion.p 
            className="text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Messages from this month
          </motion.p>
        </div>
        <WaveDivider />
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="flex items-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button 
              onClick={() => navigate(`/sermons/${year}`)}
              className="mr-6 px-5 py-2.5 bg-white shadow-md rounded-xl hover:bg-gray-50 flex items-center transition-colors"
              whileHover={{ x: -3 }}
            >
              <FiArrowLeft className="mr-2" />
              Back to {year}
            </motion.button>
            
            <h2 className="text-3xl font-bold text-gray-800">
              <AnimatedText text={`${monthName} ${year} Messages`} />
            </h2>
          </motion.div>

          {sermons.length === 0 ? (
            <motion.div 
              className="text-center py-16 bg-white rounded-2xl shadow-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <AnimatedText 
                text={`No messages found for ${monthName} ${year}`}
                className="text-xl text-gray-500"
              />
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.1 }}
              viewport={{ once: true }}
            >
              {sermons.map((sermon) => (
                <SermonCard 
                  key={sermon.id} 
                  sermon={sermon} 
                  audioUrl={SermonService.getFileUrl(sermon, sermon.audio_file)}
                  imageUrl={SermonService.getFileUrl(sermon, sermon.cover_image)}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}