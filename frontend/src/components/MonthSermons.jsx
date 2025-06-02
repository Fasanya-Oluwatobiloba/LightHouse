import { useParams, useNavigate } from 'react-router-dom';
import { SermonService } from '../services/sermon';
import SermonCard from '../components/SermonCard';
import LoadingSpinner from '../components/LoadingSpinner';
import AnimatedText from '../components/AnimatedText';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function MonthSermons() {
  const { year, month } = useParams();
  const navigate = useNavigate();
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSermons = async () => {
      try {
        const data = await SermonService.getByYearAndMonth(year, month);
        setSermons(data);
      } finally {
        setLoading(false);
      }
    };
    loadSermons();
  }, [year, month]);

  const monthName = monthNames[parseInt(month) - 1];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="large" />
        <AnimatedText 
          text={`Loading ${monthName} ${year} messages...`} 
          className="mt-4 text-lg text-gray-600"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate(`/sermons/${year}`)}
          className="mr-4 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center"
        >
          &larr; Back
        </button>
        <AnimatedText 
          text={`${monthName} ${year} Messages`}
          className="text-2xl font-bold text-gray-800"
        />
      </div>

      {sermons.length === 0 ? (
        <AnimatedText 
          text={`No messages found for ${monthName} ${year}`}
          className="text-center py-12 text-gray-500"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sermons.map((sermon) => (
            <SermonCard 
              key={sermon.id} 
              sermon={sermon} 
              audioUrl={SermonService.getFileUrl(sermon, sermon.audio_file)}
              imageUrl={SermonService.getFileUrl(sermon, sermon.cover_image)}
            />
          ))}
        </div>
      )}
    </div>
  );
}