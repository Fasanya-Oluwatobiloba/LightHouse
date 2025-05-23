import { motion } from 'framer-motion';
import AnimatedText from '../components/AnimatedText';
import WaveDivider from '../components/WaveDivider';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-red-500">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-purple-800 text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <AnimatedText 
            text="Welcome to LightHouse Media" 
            className="text-4xl md:text-6xl font-bold mb-6"
          />
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Access inspiring messages from our Sunday services
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to='/sermons'><button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              Explore Sermons
              </button>
            </Link>
          </motion.div>
        </div>
        <WaveDivider />
      </section>

      {/* Featured Sermon */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Featured Sermon</h2>
          
          <motion.div 
            className="max-w-4xl mx-auto bg-gray-50 rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="md:flex">
              <div className="md:w-1/3 bg-blue-800 flex items-center justify-center p-8">
                <div className="w-32 h-32 rounded-full bg-blue-700 flex items-center justify-center">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" />
                  </svg>
                </div>
              </div>
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold mb-2">The Power of Faith</h3>
                <p className="text-gray-600 mb-4">Pastor John Smith - June 5, 2023</p>
                <p className="text-gray-700 mb-6">
                  In this powerful message, we explore how faith can move mountains and transform lives...
                </p>
                <div className="flex space-x-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Download
                  </button>
                  <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    Listen Now
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Additional Sections */}
      <section className="py-20 bg-gray-100">
        {/* ... other sections ... */}
      </section>
    </div>
  );
}