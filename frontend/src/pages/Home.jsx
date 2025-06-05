import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import pb from "../lib/pocketbase";
import WaveDivider from "../components/WaveDivider";
import AnimatedText from "../components/AnimatedText";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaPlay, FaDownload } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSwipeable } from "react-swipeable";

export default function Home() {
  const [featuredSermon, setFeaturedSermon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const controls = useAnimation();

  const testimonials = [
    {
      id: 1,
      quote: "The sermon on forgiveness changed my life. I was able to reconcile with my family after years of bitterness.",
      author: "Sarah M.",
      role: "Member since 2020",
      initials: "SM"
    },
    {
      id: 2,
      quote: "Listening to these messages during my commute has transformed my spiritual life. I've grown more than ever before.",
      author: "David J.",
      role: "First-time visitor",
      initials: "DJ"
    },
    {
      id: 3,
      quote: "When I was going through depression, these sermons were my lifeline. The message on God's faithfulness pulled me through.",
      author: "Aisha L.",
      role: "Online listener",
      initials: "AL"
    }
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => nextTestimonial(),
    onSwipedRight: () => prevTestimonial(),
    trackMouse: true
  });

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
    controls.start({
      x: '-100%',
      opacity: 0,
      transition: { duration: 0.3 }
    }).then(() => {
      controls.start({
        x: '0%',
        opacity: 1,
        transition: { duration: 0.3 }
      });
    });
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    controls.start({
      x: '100%',
      opacity: 0,
      transition: { duration: 0.3 }
    }).then(() => {
      controls.start({
        x: '0%',
        opacity: 1,
        transition: { duration: 0.3 }
      });
    });
  };

  return (
    <div className="relative overflow-hidden bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <AnimatedText 
            text="Welcome to LightHouse Media" 
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          />
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover transformative messages that illuminate your spiritual journey
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link 
              to='/sermons' 
              className="inline-block bg-white text-indigo-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
            >
              Explore Sermons
            </Link>
          </motion.div>
        </div>
        <WaveDivider />
      </section>

      {/* Featured Sermon */}
      {featuredSermon && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="text-3xl font-bold text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Featured Message
            </motion.h2>
            
            <motion.div 
              className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="md:flex">
                <div className="md:w-2/5 bg-gradient-to-b from-indigo-700 to-purple-600 flex items-center justify-center p-8 relative">
                  {featuredSermon.cover_image ? (
                    <img 
                      src={pb.getFileUrl(featuredSermon, featuredSermon.cover_image)} 
                      alt={featuredSermon.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-20"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-700 opacity-90"></div>
                  )}
                  <div className="relative z-10 text-center">
                    <div className="w-40 h-40 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{featuredSermon.title}</h3>
                    <p className="text-indigo-100">
                      {featuredSermon.expand?.preacher?.name || featuredSermon.preacher}
                    </p>
                  </div>
                </div>
                <div className="md:w-3/5 p-8 md:p-10">
                  <div className="flex items-center mb-4">
                    <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
                      {new Date(featuredSermon.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6 text-lg">
                    {featuredSermon.description || "Listen to this powerful message from our collection."}
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={pb.getFileUrl(featuredSermon, featuredSermon.audio_file)}
                      download
                      className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
                    >
                      <FaDownload className="mr-2" /> Download
                    </a>
                    <Link 
                      to={`/sermons/${featuredSermon.id}`}
                      className="flex items-center border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
                    >
                      <FaPlay className="mr-2" /> Listen Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-4xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">Lives Transformed</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear what people are saying about how these messages have impacted them
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto" {...handlers}>
            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors hover:scale-110 active:scale-95"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft className="text-indigo-600 text-xl" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-colors hover:scale-110 active:scale-95"
              aria-label="Next testimonial"
            >
              <FaChevronRight className="text-indigo-600 text-xl" />
            </button>

            {/* Testimonial Carousel */}
            <div className="overflow-hidden relative h-auto min-h-[300px]">
              <motion.div
                key={testimonials[activeTestimonial].id}
                className="bg-white p-8 md:p-10 rounded-2xl shadow-lg absolute inset-0 flex flex-col"
                animate={controls}
                initial={{ x: 0, opacity: 1 }}
              >
                <FaQuoteLeft className="text-indigo-500 text-3xl mb-6 opacity-20" />
                <p className="text-gray-700 mb-8 text-lg md:text-xl italic flex-grow">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="flex items-center">
                  <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mr-4">
                    {testimonials[activeTestimonial].initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{testimonials[activeTestimonial].author}</h4>
                    <p className="text-gray-500">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Indicator Dots */}
            <div className="flex justify-center mt-10 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTestimonial(index);
                    controls.start({
                      x: index > activeTestimonial ? '-100%' : '100%',
                      opacity: 0,
                      transition: { duration: 0.3 }
                    }).then(() => {
                      controls.start({
                        x: '0%',
                        opacity: 1,
                        transition: { duration: 0.3 }
                      });
                    });
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeTestimonial ? 'bg-indigo-600 scale-125' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Email Subscription CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-800 to-purple-700 text-white">
        <div className="container mx-auto px-6">
          <motion.div 
            className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-white/20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-10">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Stay Connected With Us
              </motion.h2>
              <motion.p
                className="text-lg md:text-xl max-w-2xl mx-auto opacity-90"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Get the latest sermons and updates delivered straight to your inbox
              </motion.p>
            </div>

            <motion.div
              className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-6 py-5 rounded-xl bg-white/10 border-2 border-white/20 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 text-white placeholder-white/70 transition-all"
                />
                <motion.div 
                  className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none"
                  whileFocus={{ borderColor: "rgba(255,255,255,0.4)" }}
                />
              </div>
              <button className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-3">
                <span className="text-lg">Subscribe</span>
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                  />
                </svg>
              </button>
            </motion.div>

            <motion.p
              className="text-sm text-center mt-8 opacity-80 max-w-md mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              We'll never share your email. Unsubscribe at any time.
            </motion.p>

            <motion.div 
              className="flex flex-wrap justify-center mt-10 gap-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center bg-white/5 px-5 py-3 rounded-full backdrop-blur-sm">
                <svg
                  className="w-6 h-6 mr-3 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Weekly updates</span>
              </div>
              <div className="flex items-center bg-white/5 px-5 py-3 rounded-full backdrop-blur-sm">
                <svg
                  className="w-6 h-6 mr-3 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>No spam</span>
              </div>
              <div className="flex items-center bg-white/5 px-5 py-3 rounded-full backdrop-blur-sm">
                <svg
                  className="w-6 h-6 mr-3 text-emerald-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Exclusive content</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}