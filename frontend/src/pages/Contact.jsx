import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from 'react-icons/fi';
import WaveDivider from '../components/WaveDivider';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            We'd love to hear from you and answer any questions
          </motion.p>
        </div>
        <WaveDivider />
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="lg:flex gap-12">
            {/* Contact Form */}
            <motion.div 
              className="lg:w-1/2 mb-12 lg:mb-0"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <motion.div
                  className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}
              
              {submitStatus === 'error' && (
                <motion.div
                  className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  There was an error sending your message. Please try again.
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${
                      isSubmitting 
                        ? 'bg-indigo-400' 
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    <FiSend />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              className="lg:w-1/2 bg-white p-8 md:p-10 rounded-2xl shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <FiMapPin className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Location</h3>
                    <p className="text-gray-600">
                      123 Church Street<br />
                      Cityville, ST 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <FiPhone className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
                    <p className="text-gray-600">
                      Main Office: (123) 456-7890<br />
                      Prayer Line: (123) 456-7891
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <FiMail className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600">
                      General: info@lighthousemedia.org<br />
                      Support: help@lighthousemedia.org
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-indigo-100 p-3 rounded-lg">
                    <FiClock className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Times</h3>
                    <p className="text-gray-600">
                      Sunday: 8:30 AM & 11:00 AM<br />
                      Wednesday Bible Study: 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Follow Us</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: 'Facebook', color: 'bg-blue-600 hover:bg-blue-700' },
                    { icon: 'Twitter', color: 'bg-blue-400 hover:bg-blue-500' },
                    { icon: 'Instagram', color: 'bg-pink-600 hover:bg-pink-700' },
                    { icon: 'YouTube', color: 'bg-red-600 hover:bg-red-700' }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      className={`w-12 h-12 ${social.color} text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all`}
                      whileHover={{ y: -3 }}
                    >
                      {social.icon[0]}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}