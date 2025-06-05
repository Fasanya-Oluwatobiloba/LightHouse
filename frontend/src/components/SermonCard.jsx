// components/SermonCard.jsx
import { useState } from 'react';
import { FiTrash2, FiDownload } from 'react-icons/fi';
import { useAuth } from '../contexts/AuthContext';
import AudioPlayer from './AudioPlayer';
import { motion } from 'framer-motion';

export default function SermonCard({ sermon, audioUrl, imageUrl, onDelete }) {
    const { isAuthenticated } = useAuth();
    
    const handleDownload = (e) => {
        e.preventDefault();
        // Create a temporary anchor element to trigger download
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = `${sermon.title.replace(/\s+/g, '_')}.${audioUrl.split('.').pop()}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    
    return (
        <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Sermon Image */}
            {imageUrl ? (
                <img 
                    src={imageUrl} 
                    alt={sermon.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                />
            ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                </div>
            )}

            {/* Sermon Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{sermon.title}</h3>
                <p className="text-gray-600 mb-1">By {sermon.preacher || 'Unknown'}</p>
                <p className="text-sm text-gray-500 mb-4">
                    {new Date(sermon.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    })} • {sermon.duration || 'N/A'}
                </p>
                
                {/* Enhanced Audio Player */}
                {audioUrl && (
                    <div className="mb-4">
                        <AudioPlayer audioUrl={audioUrl} />
                    </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                    <button 
                        onClick={handleDownload}
                        className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                        <FiDownload className="h-4 w-4" />
                        Download
                    </button>
                    
                    {isAuthenticated && (
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                if (onDelete) onDelete();
                            }}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors text-sm"
                            aria-label="Delete sermon"
                        >
                            <FiTrash2 className="h-4 w-4" />
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </motion.div>
    );
}