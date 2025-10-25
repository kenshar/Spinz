import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CarList from '../components/CarList';
import AddCar from '../components/AddCar';

function FindCar({ cars, addCar }) {
  const location = useLocation();
  const tripData = location.state?.tripData;

  const [filterCategory, setFilterCategory] = useState('All');
  const [sortBy, setSortBy] = useState('price-low');
  const [matchedCars, setMatchedCars] = useState(cars);

  // Filter cars based on trip requirements
  useEffect(() => {
    if (tripData) {
      const { passengers, luggage } = tripData;
      const filtered = cars.filter(car =>
        car.passengers >= parseInt(passengers) &&
        car.luggage >= parseInt(luggage)
      );
      setMatchedCars(filtered);
    } else {
      setMatchedCars(cars);
    }
  }, [tripData, cars]);

  // Filter cars by category
  const filteredCars = filterCategory === 'All'
    ? matchedCars
    : matchedCars.filter((car) => car.category === filterCategory);

  // Sort cars
  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.pricePerDay - b.pricePerDay;
      case 'price-high':
        return b.pricePerDay - a.pricePerDay;
      case 'rating':
        return b.rating - a.rating;
      case 'passengers':
        return b.passengers - a.passengers;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Find Your Perfect Car
        </h1>
        <p className="text-lg text-gray-600">
          Browse our extensive collection of rental vehicles
        </p>
        {tripData && (
          <div className="mt-4 p-4 bg-primary-50 border border-primary-200 rounded-lg">
            <p className="text-primary-800 font-medium">
              Showing cars for {tripData.passengers} passenger(s) with {tripData.luggage} bag(s)
            </p>
            {tripData.destination && (
              <p className="text-primary-700 text-sm mt-1">
                Destination: {tripData.destination} | {tripData.pickupDate} to {tripData.returnDate} ({tripData.duration} day(s))
              </p>
            )}
          </div>
        )}
      </div>

      {/* Add Car Form */}
      <AddCar addCar={addCar} />

      {/* Filters and Sort */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Filter by:
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Categories</option>
              <option value="Economy">Economy</option>
              <option value="SUV">SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Van">Van</option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="passengers">Most Passengers</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{sortedCars.length}</span>{' '}
          {sortedCars.length === 1 ? 'car' : 'cars'}
        </p>
      </div>

      {/* Car List */}
      <CarList cars={sortedCars} />
    </div>
  );
}

export default FindCar;
