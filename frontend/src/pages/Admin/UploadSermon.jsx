// pages/Admin/UploadSermon.jsx
import { useState, useEffect } from 'react';
import { SermonService } from '../../services/sermon';
import UploadSermonForm from '../../components/UploadSermonForm';
import pb from '../../lib/pocketbase';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/LoadingSpinner';
import AnimatedText from '../../components/AnimatedText';

export default function UploadSermon() {
  const [loading, setLoading] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate('/admin/login');
    }
    setAuthChecking(false);
  }, [navigate]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (!pb.authStore.isValid) {
        throw new Error('Session expired. Please login again.');
      }

      // Basic validation
      if (!formData.title || !formData.preacher || !formData.date || !formData.audioFile) {
        throw new Error('All required fields must be filled');
      }

      // Upload the sermon
      await SermonService.upload(formData);
      
      setSuccess(true);
    } catch (err) {
      console.error('Upload failed:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (authChecking) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <AnimatedText 
        text="Upload Sermon" 
        className="text-2xl font-bold mb-6"
      />
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
          {error.includes('expired') && (
            <button
              onClick={() => navigate('/admin/login')}
              className="ml-2 text-blue-600 underline"
            >
              Login Now
            </button>
          )}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          Sermon uploaded successfully!
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="text-blue-600 underline"
            >
              Upload Another
            </button>
          </div>
        </div>
      )}
      
      <UploadSermonForm 
        onSubmit={handleSubmit} 
        loading={loading} 
      />
    </div>
  );
}