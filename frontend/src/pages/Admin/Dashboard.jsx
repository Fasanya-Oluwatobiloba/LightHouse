import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiUploadCloud, FiClock, FiUser, FiCalendar, FiMusic } from "react-icons/fi";
import { SermonService } from "../../services/sermon";
import pb from "../../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import UploadSermonForm from "../../components/UploadSermonForm";
import WaveDivider from "../../components/WaveDivider";

export default function Dashboard() {
  const [recentUploads, setRecentUploads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalSermons: 0, thisMonth: 0 });
  const uploadFormRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (!pb.authStore.isValid) throw new Error("Session expired. Please login again.");
      if (!formData.title || !formData.preacher || !formData.date || !formData.audioFile) {
        throw new Error("All required fields must be filled");
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("preacher", formData.preacher);
      data.append("date", formData.date);
      data.append("description", formData.description || "");
      data.append("duration", formData.duration || "00:00");
      data.append("audio_file", formData.audioFile);
      if (formData.imageFile) data.append("cover_image", formData.imageFile);

      const newSermon = await SermonService.upload(data);
      setRecentUploads(prev => [newSermon, ...prev.slice(0, 4)]);
      setSuccess(true);
      if (uploadFormRef.current) uploadFormRef.current.resetForm();
      loadStats();
    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const sermons = await SermonService.getAll();
      const thisMonth = new Date().getMonth() + 1;
      const monthSermons = sermons.filter(s => new Date(s.date).getMonth() + 1 === thisMonth);
      setStats({ totalSermons: sermons.length, thisMonth: monthSermons.length });
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  useEffect(() => {
    const loadRecentSermons = async () => {
      try {
        const sermons = await SermonService.getAll();
        setRecentUploads(sermons.slice(0, 5));
        loadStats();
      } catch (err) {
        console.error("Failed to load recent sermons:", err);
      }
    };
    loadRecentSermons();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-900 to-purple-800 text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Admin Dashboard
          </motion.h1>
          <motion.p 
            className="text-xl opacity-90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Manage your sermons and track your ministry's impact
          </motion.p>
        </div>
        <WaveDivider />
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Form */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center">
                    <FiUploadCloud className="h-8 w-8 text-white mr-3" />
                    <h2 className="text-xl font-semibold">Upload New Sermon</h2>
                  </div>
                </div>
                
                <div className="p-6">
                  {error && (
                    <motion.div 
                      className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {error}
                    </motion.div>
                  )}

                  {success && (
                    <motion.div 
                      className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      Sermon uploaded successfully!
                    </motion.div>
                  )}

                  <UploadSermonForm
                    ref={uploadFormRef}
                    onSubmit={handleSubmit}
                    loading={loading}
                  />
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-white/20 mr-4">
                  <FiMusic className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Total Sermons</p>
                  <p className="text-3xl font-bold">{stats.totalSermons}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-purple-500 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-white/20 mr-4">
                  <FiCalendar className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm opacity-90">This Month</p>
                  <p className="text-3xl font-bold">{stats.thisMonth}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-white/20 mr-4">
                  <FiUser className="text-2xl" />
                </div>
                <div>
                  <p className="text-sm opacity-90">Recent Uploads</p>
                  <p className="text-3xl font-bold">{recentUploads.length}</p>
                </div>
              </div>
            </div>
          </motion.div>

            {/* Recent Uploads */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 text-white">
                  <h2 className="text-xl font-semibold">Recent Uploads</h2>
                </div>
                
                <div className="p-6">
                  {recentUploads.length === 0 ? (
                    <p className="text-gray-500 italic py-4">No recent uploads</p>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {recentUploads.map((upload, index) => (
                        <motion.li
                          key={upload.id}
                          className="py-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 bg-indigo-100 p-2 rounded-lg">
                              <FiClock className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="ml-4">
                              <h3 className="font-medium text-gray-900 line-clamp-1">
                                {upload.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">
                                {upload.preacher} • {new Date(upload.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}