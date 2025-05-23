import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SermonService } from '../services/sermon';
import { useAuth } from '../contexts/AuthContext';

export default function SermonDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [sermon, setSermon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSermon = async () => {
            try {
                const data = await SermonService.getById(id);
                setSermon(data);
            } catch (err) {
                setError(err.message || 'Failed to load sermon');
            } finally {
                setLoading(false);
            }
        };
        fetchSermon();
    }, [id]);

    const handleDownload = async () => {
        try {
            await SermonService.incrementDownload(id);
            // Trigger actual download
            window.open(SermonService.getFileUrl(sermon, sermon.audio_file), '_blank');
        } catch (err) {
            console.error('Error handling download:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!sermon) return <div>Sermon not found</div>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="md:flex">
                    <div className="md:w-1/3 bg-gray-100 p-6 flex items-center justify-center">
                        {sermon.cover_image ? (
                            <img
                                src={SermonService.getFileUrl(sermon, sermon.cover_image)}
                                alt={sermon.title}
                                className="w-full h-auto rounded-lg"
                            />
                        ) : (
                            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">No cover image</span>
                            </div>
                        )}
                    </div>
                    <div className="md:w-2/3 p-6">
                        <h1 className="text-3xl font-bold mb-2">{sermon.title}</h1>
                        <p className="text-gray-600 mb-4">
                            Preached by {sermon.expand?.preacher?.name || 'Unknown'} on{' '}
                            {new Date(sermon.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                        <p className="text-gray-700 mb-6">{sermon.description}</p>
                        
                        <div className="flex space-x-4">
                            <button
                                onClick={handleDownload}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Download Sermon
                            </button>
                            <audio
                                controls
                                src={SermonService.getFileUrl(sermon, sermon.audio_file)}
                                className="w-full"
                            >
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                        
                        {user && (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-500">
                                    Downloads: {sermon.download_count || 0}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}