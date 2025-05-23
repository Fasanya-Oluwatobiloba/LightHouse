import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';
import AnimatedText from '../components/AnimatedText';
import WaveDivider from '../components/WaveDivider';

const events = [
  {
    id: 1,
    title: "Sunday Worship Service",
    date: "2023-07-16",
    time: "08:30",
    location: "Main Sanctuary",
    description: "Join us for our weekly worship service with inspiring music and message.",
    image: "/images/service.jpg"
  },
  // Add more events...
];

export default function Events() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-purple-800 text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <AnimatedText 
            text="Upcoming Events" 
            className="text-4xl md:text-6xl font-bold mb-6"
          />
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Join us for worship, fellowship, and community events
          </motion.p>
        </div>
        <WaveDivider />
      </section>

      {/* Events List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 h-48 md:h-auto bg-gray-200 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
                      
                      <div className="flex items-center text-gray-600 mb-3">
                        <FiCalendar className="mr-2" />
                        <span className="mr-4">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <FiClock className="mr-2" />
                        <span>{event.time} AM</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 mb-4">
                        <FiMapPin className="mr-2" />
                        <span>{event.location}</span>
                      </div>
                      
                      <p className="text-gray-700 mb-4">{event.description}</p>
                      
                      <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Learn More
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Want to stay updated on all events?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            Subscribe to our newsletter to receive weekly updates
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}