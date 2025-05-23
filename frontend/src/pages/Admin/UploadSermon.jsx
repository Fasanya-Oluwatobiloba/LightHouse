import { useState, useEffect } from 'react';
import { SermonService } from '../../services/sermon';
import UploadSermonForm from '../../components/UploadSermonForm';
import pb from '../../lib/pocketbase';
import { useNavigate } from 'react-router-dom';

export default function UploadSermon() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Check auth status on mount
  useEffect(() => {
    if (!pb.authStore.isValid) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleSubmit = async (formData) => {
  setLoading(true);
  setError('');
  setSuccess(false);

  try {
    // Verify authentication
    if (!pb.authStore.isValid) {
      throw new Error('Session expired. Please login again.');
    }

    // Validate required fields
    if (!formData.title || !formData.preacher || !formData.date || !formData.audioFile) {
      throw new Error('Title, preacher, date, and audio file are required');
    }

    // Create FormData
    const data = new FormData();
    data.append('title', formData.title);
    data.append('preacher', formData.preacher);
    data.append('date', formData.date);
    data.append('description', formData.description || '');
    data.append('duration', formData.duration || '00:00');
    data.append('audio_file', formData.audioFile);

    if (formData.imageFile) {
      if (formData.imageFile.size > 5 * 1024 * 1024) { // 5MB limit
        throw new Error('Cover image must be less than 5MB');
      }
      data.append('cover_image', formData.imageFile);
    }

    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Upload timeout after 30 seconds')), 30000);
    });

    // Create upload promise
    const uploadPromise = SermonService.upload(data);

    // Race the promises
    await Promise.race([uploadPromise, timeoutPromise]);
    
    setSuccess(true);
    setError('');
  } catch (err) {
    console.error('Upload failed:', err);
    setError(err.message);
    setSuccess(false);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Upload Sermon</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
          {(error.includes('expired') || error.includes('login')) && (
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
          Upload successful! The sermon will appear shortly.
          <button
            onClick={() => window.location.reload()}
            className="ml-2 text-blue-600 underline"
          >
            View Sermons
          </button>
        </div>
      )}
      
      <UploadSermonForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}