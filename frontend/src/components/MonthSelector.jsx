const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function MonthSelector({ year, months, onSelectMonth }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {months.length === 0 ? (
        <div className="col-span-full text-center py-12">
          <p className="text-gray-500">No messages found for {year}</p>
        </div>
      ) : (
        monthNames.map((month, index) => (
          months.includes(index) && (
            <button
              key={index}
              onClick={() => onSelectMonth(index + 1)} // Months are 1-12
              className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow hover:bg-gray-50"
            >
              <h2 className="text-xl font-bold text-gray-800">{month}</h2>
              <p className="text-gray-600 mt-2">Messages</p>
            </button>
          )
        ))
      )}
    </div>
  );
}