// components/sermons/YearSermons.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SermonService } from '../../services/sermon';
import LoadingSpinner from '../LoadingSpinner';
import AnimatedText from '../AnimatedText';
import SermonCard from '../SermonCard';
import { useAuth } from '../../contexts/AuthContext';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function YearSermons() {
  const { year } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [sermons, setSermons] = useState([]);
  const { isAuthenticated } = useAuth();
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    sermonId: null,
    sermonTitle: ''
  });

  useEffect(() => {
    const loadSermons = async () => {
      try {
        const data = await SermonService.getByYear(year);
        setSermons(data);
      } finally {
        setLoading(false);
      }
    };
    loadSermons();
  }, [year]);

  const handleDeleteClick = (sermonId, sermonTitle) => {
    setDeleteModal({
      isOpen: true,
      sermonId,
      sermonTitle
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await SermonService.delete(deleteModal.sermonId);
      setSermons(prevSermons => 
        prevSermons.filter(sermon => sermon.id !== deleteModal.sermonId)
      );
      setDeleteModal({
        isOpen: false,
        sermonId: null,
        sermonTitle: ''
      });
    } catch (error) {
      console.error('Failed to delete sermon:', error);
      alert('Failed to delete sermon. Please try again.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({
      isOpen: false,
      sermonId: null,
      sermonTitle: ''
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" />
        <AnimatedText 
          text={`Loading ${year} messages...`} 
          className="mt-4 text-lg text-gray-600"
        />
      </div>
    );
  }

  // Group sermons by month
  const sermonsByMonth = sermons.reduce((acc, sermon) => {
    const month = new Date(sermon.date).getMonth();
    if (!acc[month]) acc[month] = [];
    acc[month].push(sermon);
    return acc;
  }, {});

  return (
    <div className="container mx-auto px-4 py-8">
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemName={deleteModal.sermonTitle}
      />

      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate('/sermons')}
          className="mr-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center"
        >
          &larr; Back to All Years
        </button>
        <AnimatedText 
          text={`${year} Messages`}
          className="text-2xl font-bold text-gray-800"
        />
      </div>

      {sermons.length === 0 ? (
        <AnimatedText 
          text={`No sermons found for ${year}`}
          className="text-center py-12 text-gray-500"
        />
      ) : (
        <div className="space-y-8">
          {Object.keys(sermonsByMonth)
            .sort((a, b) => b - a)
            .map((month) => (
              <div key={month} className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                  {monthNames[parseInt(month)]}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sermonsByMonth[month].map((sermon) => (
                    <SermonCard 
                      key={sermon.id} 
                      sermon={sermon} 
                      audioUrl={SermonService.getFileUrl(sermon, sermon.audio_file)}
                      imageUrl={SermonService.getFileUrl(sermon, sermon.cover_image)}
                      onDelete={() => handleDeleteClick(sermon.id, sermon.title)}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}