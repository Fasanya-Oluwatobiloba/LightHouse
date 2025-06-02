// pages/sermon.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import YearSelector from '../components/sermons/YearSelector';
import LoadingSpinner from '../components/LoadingSpinner';
import AnimatedText from '../components/AnimatedText';

export default function Sermons() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Always show these years, regardless of whether they have sermons
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: currentYear - 2022}, (_, i) => currentYear - i);

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedText 
        text="Sermon Archive" 
        className="text-3xl font-bold mb-8 text-center"
      />
      
      <YearSelector 
        years={years} 
        onSelectYear={(year) => {
          setLoading(true);
          navigate(`/sermons/${year}`);
        }}
      />
      
      {loading && (
        <div className="flex justify-center mt-4">
          <LoadingSpinner size="medium" />
        </div>
      )}
    </div>
  );
}