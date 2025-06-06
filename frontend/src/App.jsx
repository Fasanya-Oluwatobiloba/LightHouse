import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Sermons from "./pages/sermon";
import SermonDetail from "./pages/SermonDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import UploadSermon from "./pages/Admin/UploadSermon";
import ProtectedRoute from "./components/ProtectedRoute";
import YearSermons from "./components/sermons/YearSermons";
import MonthSermons from "./components/MonthSermons";

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
              <Route path="/sermons/:year" element={<YearSermons />} />
              <Route path="/sermons/:year/:month" element={<MonthSermons />} />
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
