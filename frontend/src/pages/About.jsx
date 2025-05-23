import { motion } from 'framer-motion';
import AnimatedText from '../components/AnimatedText';
import WaveDivider from '../components/WaveDivider';
import toby from '../assets/toby.jpg'

const teamMembers = [
  {
    id: 1,
    name: 'Pastor John Smith',
    role: 'Senior Pastor',
    bio: 'With over 20 years of ministry experience, Pastor John brings wisdom and passion to our congregation.',
    image: toby
  },
   {
    id: 2,
    name: 'Pastor John Smith',
    role: 'Senior Pastor',
    bio: 'With over 20 years of ministry experience, Pastor John brings wisdom and passion to our congregation.',
    image: toby
  },
  // Add more team members...
];

export default function About() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-purple-800 text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <AnimatedText 
            text="About Our Church" 
            className="text-4xl md:text-6xl font-bold mb-6"
          />
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Learn about our mission, vision, and the team that makes it all possible
          </motion.p>
        </div>
        <WaveDivider />
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg text-gray-600">          Our church was founded in 1995 with a small group of believers gathering in a living room. Through God's grace, we've grown into a vibrant community impacting thousands of lives with the Gospel message.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <motion.div 
          className="bg-gray-50 p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="text-blue-600 text-4xl font-bold mb-4">1995</div>
          <h3 className="text-xl font-semibold mb-3">Humble Beginnings</h3>
          <p className="text-gray-600">
            Started with just 12 members meeting weekly for Bible study and prayer in a home.
          </p>
        </motion.div>

        <motion.div 
          className="bg-gray-50 p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-blue-600 text-4xl font-bold mb-4">2005</div>
          <h3 className="text-xl font-semibold mb-3">First Building</h3>
          <p className="text-gray-600">
            Purchased our first church building with seating for 200 people.
          </p>
        </motion.div>

        <motion.div 
          className="bg-gray-50 p-8 rounded-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-blue-600 text-4xl font-bold mb-4">Today</div>
          <h3 className="text-xl font-semibold mb-3">Growing Family</h3>
          <p className="text-gray-600">
            Now serving over 1,500 members with multiple weekly services and ministries.
          </p>
        </motion.div>
      </div>
    </div>
  </section>

  {/* Mission & Vision */}
  <section className="py-20 bg-gray-100">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <div className="md:flex gap-12">
          <motion.div 
            className="md:w-1/2 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-4">
              To lead people into a growing relationship with Jesus Christ through worship, discipleship, and service.
            </p>
            <p className="text-gray-600">
              We believe every person has a God-given purpose and we exist to help them discover and fulfill it.
            </p>
          </motion.div>

          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-gray-700 mb-4">
              To be a multicultural community that transforms lives through the power of the Gospel.
            </p>
            <p className="text-gray-600">
              We envision a church where every member is equipped to impact their sphere of influence for Christ.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  </section>

  {/* Leadership Team */}
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-16">Meet Our Team</h2>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <motion.div
            key={member.id}
            className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="h-64 bg-gray-300 overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>

  {/* Core Beliefs */}
  <section className="py-20 bg-gray-100">
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-16">What We Believe</h2>
      
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {[
            {
              title: "The Bible",
              content: "We believe the Bible is the inspired, infallible Word of God and the final authority for faith and life."
            },
            {
              title: "The Trinity",
              content: "We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit."
            },
            {
              title: "Salvation",
              content: "We believe salvation is by grace through faith in Jesus Christ alone, not by works."
            },
            {
              title: "The Church",
              content: "We believe the Church is the body of Christ called to worship, fellowship, and evangelism."
            }
          ].map((belief, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm"
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-3 text-blue-700">{belief.title}</h3>
              <p className="text-gray-700">{belief.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
</div>			
)}