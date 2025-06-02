// components/YearlySermons.js
export default function YearlySermons({ year, sermons }) {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-semibold mb-4">{year}</h3>
      <div className="space-y-4">
        {sermons.map(sermon => (
          <SermonItem key={sermon.id} sermon={sermon} />
        ))}
      </div>
    </div>
  );
}