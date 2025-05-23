import { useState, useEffect } from 'react';
import { SermonService } from '../services/sermons';

export function useSermons() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSermons = async () => {
      try {
        const data = await SermonService.getAll();
        setSermons(data);
      } finally {
        setLoading(false);
      }
    };
    loadSermons();
  }, []);

  return { sermons, loading, refresh: loadSermons };
}