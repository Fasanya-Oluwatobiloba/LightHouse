// src/contexts/SermonContext.jsx
import { createContext, useState, useEffect } from "react";
import pb from "../lib/pocketbase"; // Make sure you've created this file

export const SermonContext = createContext();

export function SermonProvider({ children }) {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch sermons from PocketBase
  const fetchSermons = async (publicFetch = false) => {
    setLoading(true);
    try {
      if (pb.authStore.record?.collectionName === '_superusers') {
        const records = await pb.collection("sermons").getFullList({
          sort: "-created",
        });
        setSermons(records);
      }
    } catch (err) {
      console.error("Failed to fetch sermons:", err);
    } finally {
      setLoading(false);
    }
  };

  // Real-time updates (optional)
  useEffect(() => {
    fetchSermons();

    // Uncomment for real-time updates (requires PocketBase 0.8+)
    /*
    pb.collection('sermons').subscribe('*', () => {
      fetchSermons();
    });
    */
  }, []);

  const addSermon = (newSermon) => {
    setSermons((prev) => [...prev, newSermon]);
  };

  return (
    <SermonContext.Provider
      value={{
        sermons,
        loading,
        fetchSermons,
        addSermon,
      }}
    >
      {children}
    </SermonContext.Provider>
  );
}
