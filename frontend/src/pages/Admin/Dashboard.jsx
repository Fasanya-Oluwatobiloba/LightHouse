import { useState, useEffect, useRef } from "react";
import UploadSermonForm from "../../components/UploadSermonForm";
import { FiUploadCloud } from "react-icons/fi";
import { SermonService } from "../../services/sermon";
import pb from "../../lib/pocketbase";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [sermons, setSermons] = useState([]);
  const [recentUploads, setRecentUploads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    thisMonth: 0,
    preachers: 0,
  });

  const uploadFormRef = useRef();
  const navigate = useNavigate();
  const subscriptionRef = useRef(null);

  const updateStats = (sermons) => {
    const now = new Date();
    const thisMonthSermons = sermons.filter((s) => {
      const sermonDate = new Date(s.date);
      return (
        sermonDate.getMonth() === now.getMonth() &&
        sermonDate.getFullYear() === now.getFullYear()
      );
    });

    setStats({
      total: sermons.length,
      thisMonth: thisMonthSermons.length,
      preachers: [...new Set(sermons.map((s) => s.preacher))].length,
    });
  };

  // Load recent sermons on mount
  useEffect(() => {
    const loadSermons = async () => {
      try {
        console.log("Current auth state:", {
          isValid: pb.authStore.isValid,
          model: pb.authStore.record,
          token: pb.authStore.token
        });

        const data = await SermonService.getAll();
        
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received from server");
        }

        setSermons(data);
        setRecentUploads(data.slice(0, 5));
        updateStats(data);
        setIsAdmin(pb.authStore.record?.admin || false);
      } catch (err) {
        console.error("Load error:", {
          message: err.message,
          status: err.status,
          response: err.response,
          stack: err.stack
        });

        if (err.message.includes('expired') || err.status === 401) {
          pb.authStore.clear();
          navigate('/admin/login');
        }
      }
    };

    const setupRealtime = async () => {
      try {
        await loadSermons();

        // Store the subscription in our ref
        subscriptionRef.current = pb.collection('sermons').subscribe('*', (e) => {
          if (e.action === 'create') {
            setRecentUploads(prev => [e.record, ...prev.slice(0, 4)]);
            setSermons(prev => [e.record, ...prev]);
          }
        });
      } catch (error) {
        console.error('Realtime setup failed:', error);
      }
    };

    const authUnsubscribe = pb.authStore.onChange(() => {
      setIsAdmin(pb.authStore.record?.admin || false);
    });

    setupRealtime();

    return () => {
      // Proper cleanup of subscriptions
      if (subscriptionRef.current) {
        pb.collection('sermons').unsubscribe(subscriptionRef.current);
      }
      if (authUnsubscribe) {
        authUnsubscribe();
      }
    };
  }, [navigate]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setSuccess(false);

    try {
      console.log("Current auth state:", pb.authStore.isValid, pb.authStore.model);

      if (!pb.authStore.isValid) {
        throw new Error("Not authenticated. Please login again.");
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("preacher", formData.preacher);
      data.append("date", formData.date);
      data.append("description", formData.description || "");
      data.append("duration", formData.duration || "00:00");

      if (!formData.audioFile) {
        throw new Error("Audio file is required");
      }
      data.append("audio_file", formData.audioFile);

      if (formData.imageFile) {
        if (formData.imageFile.size > 5 * 1024 * 1024) {
          throw new Error("Cover image must be less than 5MB");
        }
        data.append("cover_image", formData.imageFile);
      }

      const newSermon = await SermonService.upload(data);
      console.log("Upload response:", newSermon);

      setRecentUploads(prev => [newSermon, ...prev.slice(0, 4)]);
      setSuccess(true);

      const updatedSermons = await SermonService.getAll();
      updateStats(updatedSermons);

      if (uploadFormRef.current) {
        uploadFormRef.current.resetForm();
      }
    } catch (err) {
      console.error("Full upload error:", {
        message: err.message,
        status: err.status,
        response: err.response,
        stack: err.stack
      });

      let errorMessage = err.message;
      if (err.status === 400) {
        errorMessage = "Invalid data. Please check your inputs.";
      } else if (err.status === 401) {
        errorMessage = "Session expired. Please login again.";
        pb.authStore.clear();
        navigate("/admin/login");
      } else if (err.status === 413) {
        errorMessage = "File too large. Maximum size is 50MB.";
      }

      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">
            Manage and upload sermons
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex items-center mb-6">
                <FiUploadCloud className="h-8 w-8 text-blue-600 mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">
                  Upload New Sermon
                </h2>
              </div>

              {success && (
                <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-lg border border-green-200">
                  Sermon uploaded successfully!
                </div>
              )}

              <UploadSermonForm
                ref={uploadFormRef}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6 h-full">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Uploads
              </h2>

              {recentUploads.length === 0 ? (
                <p className="text-gray-500 italic">No recent uploads</p>
              ) : (
                <ul className="space-y-4">
                  {recentUploads.map((upload) => (
                    <li
                      key={upload.id}
                      className="border-b border-gray-100 pb-3 last:border-0"
                    >
                      <h3 className="font-medium text-gray-900">
                        {upload.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {upload.preacher} •{" "}
                        {new Date(upload.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Duration: {upload.duration}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500 text-sm font-medium">Total Sermons</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {stats.total}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500 text-sm font-medium">This Month</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {stats.thisMonth}
            </p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-gray-500 text-sm font-medium">Preachers</h3>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {stats.preachers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}