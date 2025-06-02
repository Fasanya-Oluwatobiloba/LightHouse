// pages/Admin/Dashboard.jsx
import { useState, useEffect, useRef } from "react";
import UploadSermonForm from "../../components/UploadSermonForm";
import { FiUploadCloud } from "react-icons/fi";
import { SermonService } from "../../services/sermon";
import pb from "../../lib/pocketbase";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function Dashboard() {
  const [recentUploads, setRecentUploads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const uploadFormRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Verify authentication
      if (!pb.authStore.isValid) {
        throw new Error("Session expired. Please login again.");
      }

      // Validate required fields
      if (!formData.title || !formData.preacher || !formData.date || !formData.audioFile) {
        throw new Error("Title, preacher, date, and audio file are required");
      }

      // Create FormData
      const data = new FormData();
      data.append("title", formData.title);
      data.append("preacher", formData.preacher);
      data.append("date", formData.date);
      data.append("description", formData.description || "");
      data.append("duration", formData.duration || "00:00");
      data.append("audio_file", formData.audioFile);

      if (formData.imageFile) {
        data.append("cover_image", formData.imageFile);
      }

      // Upload the sermon
      const newSermon = await SermonService.upload(data);
      
      // Update recent uploads
      setRecentUploads(prev => [newSermon, ...prev.slice(0, 4)]);
      setSuccess(true);
      
      // Reset form
      if (uploadFormRef.current) {
        uploadFormRef.current.resetForm();
      }

    } catch (err) {
      console.error("Upload failed:", err);
      setError(err.message || "Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load recent sermons on mount
  useEffect(() => {
    const loadRecentSermons = async () => {
      try {
        const sermons = await SermonService.getAll();
        setRecentUploads(sermons.slice(0, 5));
      } catch (err) {
        console.error("Failed to load recent sermons:", err);
      }
    };
    
    loadRecentSermons();
  }, []);

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

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-800 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

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
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}