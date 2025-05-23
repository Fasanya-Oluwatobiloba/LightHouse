import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import AnimatedText from '../components/AnimatedText';
import WaveDivider from '../components/WaveDivider';

const galleryImages = [
  {
    id: 1,
    src: "/images/gallery1.jpg",
    category: "worship",
    caption: "Sunday morning worship service"
  },
  // Add more images...
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredImages = filter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const openImage = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-purple-800 text-white py-32">
        <div className="container mx-auto px-6 text-center">
          <AnimatedText 
            text="Photo Gallery" 
            className="text-4xl md:text-6xl font-bold mb-6"
          />
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Moments from our services and events
          </motion.p>
        </div>
        <WaveDivider />
      </section>

      {/* Gallery Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              All
            </button>
            {['worship', 'events', 'community', 'missions'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full capitalize ${filter === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                className="relative group overflow-hidden rounded-lg cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                onClick={() => openImage(image)}
              >
                <img 
                  src={image.src} 
                  alt={image.caption}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 text-white text-center p-4">
                    <p className="font-medium">{image.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700">No images found</h3>
              <p className="text-gray-500">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={closeImage}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
          >
            <FiX />
          </button>
          
          <button 
            onClick={() => navigateImage('prev')}
            className="absolute left-4 text-white text-3xl hover:text-gray-300"
          >
            <FiChevronLeft />
          </button>
          
          <button 
            onClick={() => navigateImage('next')}
            className="absolute right-4 text-white text-3xl hover:text-gray-300"
          >
            <FiChevronRight />
          </button>
          
          <div className="max-w-4xl w-full">
            <img 
              src={selectedImage.src} 
              alt={selectedImage.caption}
              className="w-full max-h-[80vh] object-contain"
            />
            <p className="text-white text-center mt-4">{selectedImage.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}