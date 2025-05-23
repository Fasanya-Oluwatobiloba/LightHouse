import { motion } from 'framer-motion';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-gray-900 text-white py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">LightHouse Sermons</h3>
            <p className="text-gray-400">
              Bringing God's word to life through powerful messages and teachings.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/sermons" className="text-gray-400 hover:text-white">Sermons</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Bible Study</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Devotionals</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Prayer Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiInstagram className="text-xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiYoutube className="text-xl" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Sunday Sermons. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}