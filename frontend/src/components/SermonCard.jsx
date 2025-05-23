import { FiTrash2, FiDownload } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';

export default function SermonCard({ sermon, audioUrl, imageUrl, onDelete }) {
    const { isAuthenticated } = useAuth()
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            {/* Sermon Image */}
            {imageUrl && (
                <img 
                    src={imageUrl} 
                    alt={sermon.title}
                    className="w-full h-48 object-cover"
                />
            )}

            {/* Sermon Content */}
            <div className="p-4">
                <h3 className="text-xl font-bold">{sermon.title}</h3>
                <p className="text-gray-600">By {sermon.preacher || 'Unknown'}</p>
                <p className="text-sm text-gray-500">
                    {new Date(sermon.date).toLocaleDateString()} • {sermon.duration}
                </p>
                
                {/* Audio Player */}
                {audioUrl && (
                    <audio controls className="w-full mt-4">
                        <source src={audioUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                )}
                
                {/* Action Buttons */}
                <div className="mt-4 flex gap-2">
                    <a 
                        href={audioUrl} 
                        download
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                    >
                        <FiDownload className="h-4 w-4" />
                        Download
                    </a>
                    
                    {isAuthenticated && (
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                onDelete();
                            }}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                            aria-label="Delete sermon"
                        >
                            <FiTrash2 className="h-4 w-4" />
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}