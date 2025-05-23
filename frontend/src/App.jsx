import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Sermons from "./Pages/Sermon";
import SermonDetail from "./Pages/SermonDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Login from "./pages/admin/Login";
import Dashboard from "./Pages/Admin/Dashboard";
import UploadSermon from "./Pages/Admin/UploadSermon";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/sermons" element={<Sermons />} />
              <Route path="/sermons/:id" element={<SermonDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/events" element={<Events />} />
              <Route path="/gallery" element={<Gallery />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/upload"
                element={
                  <ProtectedRoute>
                    <UploadSermon />
                  </ProtectedRoute>
                }
              />
              
              {/* Optional: 404 Page */}
              <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}