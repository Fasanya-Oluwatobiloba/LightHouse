import SermonCard from "./SermonCard";

// components/DownloadsSection.js
export default function DownloadsSection({ year }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200">{year}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SermonCard />
      </div>
    </div>
  );
}