// components/sermons/YearSelector.jsx
export default function YearSelector({ years, onSelectYear }) {
  // Map years to image paths
  const yearImages = {
    2023: '../../assets/toby.jpg',
    2024: '../../assets/toby.jpg',
    2025: '../../assets/toby.jpg',
    // Add more years as needed
  };

  // Fallback image if specific year image doesn't exist
  const getYearImage = (year) => {
    return yearImages[year] || '/images/years/default.jpg';
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => onSelectYear(year)}
          className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group"
        >
          <img 
            src={getYearImage(year)} 
            alt={`Sermons from ${year}`}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = '/images/years/default.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center group-hover:bg-opacity-40 transition-all">
            <h2 className="text-2xl font-bold text-white">{year}</h2>
            <p className="text-gray-200">Messages</p>
          </div>
        </button>
      ))}
    </div>
  );
}