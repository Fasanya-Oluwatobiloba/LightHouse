import { useState, useEffect, useRef } from "react";
import { SermonService } from "../services/sermon";
import SermonCard from "../components/SermonCard";
import pb from "../lib/pocketbase";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Sermons() {
  const [sermons, setSermons] = useState([]);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [sermonToDelete, setSermonToDelete] = useState(null);
  const navigate = useNavigate();
  const subscriptionRef = useRef(null);

  const loadSermons = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await SermonService.getAll();

      if (!Array.isArray(data)) {
        throw new Error("Invalid data format received from server");
      }

      setSermons(data);
      setFilteredSermons(data);
      setIsAdmin(pb.authStore.record?.admin || false);
    } catch (err) {
      console.error("Complete error details:", {
        message: err.message,
        status: err.status,
        response: err.response,
        stack: err.stack,
      });

      let errorMessage = err.message;
      if (err.status === 400) {
        errorMessage = "Invalid request. Please check your permissions.";
      } else if (err.status === 401) {
        errorMessage = "Session expired. Please login again.";
        pb.authStore.clear();
        navigate("/login");
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (sermonId) => {
    setSermonToDelete(sermonId);
    setShowModal(true);
  };

  const handleDeleteConfirmed = async (id) => {
  try {
    const success = await SermonService.delete(id);
    if (success) {
      await loadSermons(); // Refresh sermons after deletion
      setShowModal(false);
      setSermonToDelete(null);
    }
  } catch (error) {
    console.error("Delete failed:", error);
    setError(error.message);
    setShowModal(false);
  }
};

  useEffect(() => {
    const filtered = sermons.filter(
      (sermon) =>
        sermon.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.preacher?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSermons(filtered);
  }, [searchTerm, sermons]);

  useEffect(() => {
    const setupRealtime = async () => {
      try {
        await loadSermons();

        subscriptionRef.current = pb
          .collection("sermons")
          .subscribe("*", (e) => {
            console.log("Realtime event:", e);
            if (e.action === "create") {
              setSermons((prev) => [e.record, ...prev]);
            } else if (e.action === "delete") {
              setSermons((prev) =>
                prev.filter((sermon) => sermon.id !== e.record.id)
              );
            } else if (e.action === "update") {
              setSermons((prev) =>
                prev.map((sermon) =>
                  sermon.id === e.record.id ? e.record : sermon
                )
              );
            }
          });
      } catch (err) {
        console.error("Realtime setup error:", err);
      }
    };

    const authUnsubscribe = pb.authStore.onChange(() => {
      setIsAdmin(pb.authStore.record?.admin || false);
    });

    setupRealtime();

    return () => {
      if (subscriptionRef.current) {
        pb.collection("sermons").unsubscribe(subscriptionRef.current);
      }
      if (authUnsubscribe) {
        authUnsubscribe();
      }
    };
  }, []);

  if (loading && sermons.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
        <p>Loading sermons...</p>
      </div>
    );
  }

  if (error && sermons.length === 0) {
    return (
      <div className="text-center py-12 text-red-600">
        <p>{error}</p>
        <button
          onClick={loadSermons}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        LightHouse Sermons
      </h1>

      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search sermons..."
          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isAdmin && (
        <div className="mb-6 text-center">
          <a
            href="/admin/upload-sermon"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Upload New Sermon
          </a>
        </div>
      )}

      {filteredSermons.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">
            {searchTerm
              ? "No matching sermons found"
              : "No sermons available yet."}
          </p>
          {isAdmin && (
            <a
              href="/admin/upload-sermon"
              className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Upload Your First Sermon
            </a>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSermons.map((sermon) => (
              <SermonCard
                key={sermon.id}
                sermon={sermon}
                audioUrl={SermonService.getFileUrl(sermon, sermon.audio_file)}
                imageUrl={SermonService.getFileUrl(sermon, sermon.cover_image)}
                onDelete={() => confirmDelete(sermon.id)}
              />
            ))}
          </div>
          {error && (
            <div className="mt-4 text-center text-red-600">
              <p>Note: {error}</p>
              <button
                onClick={loadSermons}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Refresh Sermons
              </button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold mb-4">Delete Sermon?</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete this sermon?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSermonToDelete(null);
                }}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={() => handleDeleteConfirmed(sermonToDelete)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
