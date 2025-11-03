import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BookingModal from './BookingModal';

/**
 * CarList Component
 * Displays a grid of available rental cars with their details
 * @param {Array} cars - Array of car objects to display
 * @param {Object} tripData - Trip data from search form (optional)
 * @param {Function} onBook - Callback when booking is made
 */
function CarList({ cars, tripData = null, onBook }) {
  const [selectedCar, setSelectedCar] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = (car) => {
    // Check if user is logged in
    if (!currentUser) {
      // Store the intended booking in session storage to resume after login
      sessionStorage.setItem('intendedBooking', JSON.stringify({ car, tripData }));
      alert('Please log in to book a car');
      navigate('/login');
      return;
    }

    setSelectedCar(car);
    setShowBookingModal(true);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedCar(null);
  };

  const handleBooking = (booking) => {
    if (onBook) {
      onBook(booking);
    }
    handleCloseModal();
  };
  // Show message if no cars are available
  if (cars.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12 px-4">
        <p className="text-gray-500 text-base sm:text-lg">No cars available. Add some cars to get started!</p>
      </div>
    );
  }

  return (
    // Responsive grid: 1 column on mobile, 2 on tablet, 3 on desktop
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {cars.map((car) => (
        // Individual car card
        <div
          key={car.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Car image */}
          <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 sm:h-52 object-cover"
          />

          {/* Card content */}
          <div className="p-4 sm:p-5 md:p-6">
            {/* Car title and category badge */}
            <div className="flex justify-between items-start mb-2 gap-2">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 flex-1">
                {car.make} {car.model}
              </h3>
              <span className="bg-primary-100 text-primary-800 text-xs font-semibold px-2 sm:px-2.5 py-0.5 rounded whitespace-nowrap">
                {car.category}
              </span>
            </div>

            {/* Basic car details */}
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
              {car.year} • {car.transmission} • {car.fuelType}
            </p>

            {/* Capacity information */}
            <div className="grid grid-cols-2 gap-2 mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
              <div>
                {car.passengers} passengers
              </div>
              <div>
                {car.luggage} bags
              </div>
            </div>

            {/* Rating and reviews */}
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="flex items-center flex-wrap">
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  Rating: {car.rating}
                </span>
                <span className="ml-2 text-xs sm:text-sm text-gray-500">
                  ({car.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Dealer information (optional) */}
            {car.dealer && (
              <div className="mb-3 sm:mb-4 text-xs sm:text-sm text-gray-600">
                <span className="font-medium">Dealer:</span> {car.dealer}
              </div>
            )}

            {/* Pricing and booking section */}
            <div className="border-t pt-3 sm:pt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                {/* Price display */}
                <div>
                  <p className="text-lg sm:text-xl md:text-2xl font-bold text-black">
                    KSh {car.pricePerDay.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">per day</p>
                </div>

                {/* Book Now button */}
                <button
                  onClick={() => handleBookNow(car)}
                  className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2.5 sm:px-6 md:px-7 rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-sm sm:text-base whitespace-nowrap hover:shadow-lg active:scale-95 min-h-[44px]"
                >
                  Book Now
                </button>
              </div>

              {/* Additional rental terms */}
              <p className="text-xs text-gray-500 mt-2">
                {car.mileageLimit} miles/day • {car.insurance}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Booking Modal */}
      {showBookingModal && selectedCar && (
        <BookingModal
          car={selectedCar}
          tripData={tripData}
          onClose={handleCloseModal}
          onBook={handleBooking}
        />
      )}
    </div>
  );
}

export default CarList;
