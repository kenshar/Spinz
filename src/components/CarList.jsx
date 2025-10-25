function CarList({ cars }) {
  if (cars.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No cars available. Add some cars to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <div
          key={car.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900">
                {car.make} {car.model}
              </h3>
              <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {car.category}
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              {car.year} • {car.transmission} • {car.fuelType}
            </p>

            <div className="grid grid-cols-2 gap-2 mb-4 text-sm text-gray-600">
              <div>
                {car.passengers} passengers
              </div>
              <div>
                {car.luggage} bags
              </div>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-700">
                  Rating: {car.rating}
                </span>
                <span className="ml-2 text-sm text-gray-500">
                  ({car.reviews} reviews)
                </span>
              </div>
            </div>

            {car.dealer && (
              <div className="mb-4 text-sm text-gray-600">
                <span className="font-medium">Dealer:</span> {car.dealer}
              </div>
            )}

            <div className="border-t pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-primary-600">
                    KSh {car.pricePerDay.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">per day</p>
                </div>
                <button className="w-full sm:w-auto bg-primary-600 text-white px-4 py-2.5 sm:px-5 md:px-6 rounded-lg hover:bg-primary-700 transition-all duration-200 font-medium text-sm sm:text-base whitespace-nowrap hover:shadow-lg active:scale-95">
                  Book Now
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {car.mileageLimit} miles/day • {car.insurance}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarList;
