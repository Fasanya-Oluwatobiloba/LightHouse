import { motion } from 'framer-motion';
import AnimatedText from '../components/AnimatedText';
import WaveDivider from '../components/WaveDivider';
import toby from '../assets/toby.jpg';

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
    name: 'Pastor Sarah Johnson',
    role: 'Worship Leader',
    bio: 'Anointed worship leader with a heart for ushering people into God\'s presence through music.',
    image: toby
  },
  {
    id: 3,
    name: 'Deacon Michael Brown',
    role: 'Outreach Director',
    bio: 'Passionate about community service and spreading the Gospel beyond our church walls.',
    image: toby
  }
];

export default function About() {
  return (
    <div className="relative overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedText 
            text="About Our Church" 
            className="text-4xl md:text-6xl font-bold mb-6"
          />
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover our story, mission, and the team dedicated to serving you
          </motion.p>
        </div>
        <WaveDivider />
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Journey</h2>
            <p className="text-lg text-gray-600">
              Founded in 1995 with a small group of believers, LightHouse has grown into a vibrant community 
              impacting thousands through the power of God's Word.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                year: "1995",
                title: "Humble Beginnings",
                description: "Started with 12 members meeting weekly for Bible study in a home."
              },
              {
                year: "2005",
                title: "First Building",
                description: "Purchased our first sanctuary with seating for 200 worshippers."
              },
              {
                year: "Present",
                title: "Growing Family",
                description: "Now serving 1,500+ members with multiple weekly services."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl shadow-md"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-indigo-600 text-4xl font-bold mb-4">{item.year}</div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="lg:flex gap-12">
              <motion.div 
                className="lg:w-1/2 mb-12 lg:mb-0 bg-white p-8 rounded-2xl shadow-md"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6 text-indigo-800">Our Mission</h2>
                <p className="text-lg text-gray-700 mb-4">
                  To lead people into a growing relationship with Jesus Christ through authentic worship, 
                  biblical teaching, and compassionate service.
                </p>
                <p className="text-gray-600">
                  We exist to help every person discover their God-given purpose and fulfill it through 
                  the power of the Holy Spirit.
                </p>
              </motion.div>

              <motion.div 
                className="lg:w-1/2 bg-white p-8 rounded-2xl shadow-md"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6 text-purple-800">Our Vision</h2>
                <p className="text-lg text-gray-700 mb-4">
                  To be a multicultural beacon of hope that transforms lives and communities through 
                  the Gospel of Jesus Christ.
                </p>
                <p className="text-gray-600">
                  We envision a church where every member is equipped to impact their sphere of influence 
                  with God's love and truth.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dedicated leaders committed to serving our congregation and community
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="h-64 bg-gray-200 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Beliefs */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">What We Believe</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The foundational truths that guide our church
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
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
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-indigo-700">{belief.title}</h3>
                  <p className="text-gray-700">{belief.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}