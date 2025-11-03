import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * BookingModal Component
 * Modal for booking a car with trip details
 * @param {Object} car - The car being booked
 * @param {Function} onClose - Function to close the modal
 * @param {Function} onBook - Function to handle booking submission
 * @param {Object} tripData - Pre-filled trip data from search (optional)
 */
function BookingModal({ car, onClose, onBook, tripData = null }) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    destination: tripData?.destination || '',
    pickupDate: tripData?.pickupDate || '',
    returnDate: tripData?.returnDate || '',
    passengers: tripData?.passengers || 1,
    luggage: tripData?.luggage || 1,
    specialNeeds: tripData?.specialNeeds || '',
    customerName: '',
    customerEmail: currentUser?.email || '',
    customerPhone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateDuration = () => {
    if (formData.pickupDate && formData.returnDate) {
      const pickup = new Date(formData.pickupDate);
      const returnDate = new Date(formData.returnDate);
      return Math.ceil((returnDate - pickup) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    const duration = calculateDuration();
    return duration * car.pricePerDay;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const duration = calculateDuration();
    const totalPrice = calculateTotal();

    const booking = {
      carId: car.id,
      carMake: car.make,
      carModel: car.model,
      carImage: car.image,
      destination: formData.destination,
      pickupDate: formData.pickupDate,
      returnDate: formData.returnDate,
      passengers: parseInt(formData.passengers),
      luggage: parseInt(formData.luggage),
      specialNeeds: formData.specialNeeds,
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      userId: currentUser?.uid,
      duration,
      totalPrice,
      pricePerDay: car.pricePerDay,
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    };

    try {
      // Post booking to json-server
      const response = await fetch('http://localhost:3001/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const savedBooking = await response.json();
      onBook(savedBooking);
      setIsSubmitting(false);
      onClose();

      // Show success message
      alert(`Booking confirmed! Total: KSh ${totalPrice.toLocaleString()}`);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  const duration = calculateDuration();
  const totalPrice = calculateTotal();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-4 sm:px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Book Your Car</h2>
            <p className="text-sm sm:text-base text-gray-600">{car.make} {car.model}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl sm:text-3xl leading-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Car Summary */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-b">
          <div className="flex gap-4">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-base sm:text-lg text-gray-900">{car.make} {car.model}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{car.year} • {car.category}</p>
              <p className="text-base sm:text-lg font-bold text-primary-600 mt-1">
                KSh {car.pricePerDay.toLocaleString()}/day
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleSubmit} className="px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
          {/* Trip Details */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Trip Details</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Destination *
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
                    placeholder="e.g., Nairobi"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Pick-up Date *
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    min={today}
                    required
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Return Date *
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleChange}
                    min={formData.pickupDate || today}
                    required
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Passengers *
                  </label>
                  <select
                    name="passengers"
                    value={formData.passengers}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
                  >
                    {[...Array(Math.min(car.passengers, 9))].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} passenger{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Your Information</h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
                  placeholder="John Doe"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
                    placeholder="+254 712 345 678"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          {duration > 0 && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 sm:p-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">Price Summary</h3>
              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{duration} day{duration > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per day:</span>
                  <span className="font-medium">KSh {car.pricePerDay.toLocaleString()}</span>
                </div>
                <div className="border-t border-primary-300 pt-2 flex justify-between">
                  <span className="font-semibold text-gray-900">Total:</span>
                  <span className="font-bold text-lg sm:text-xl text-primary-600">
                    KSh {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2 sm:pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base min-h-[48px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || duration <= 0}
              className="w-full sm:flex-1 px-5 py-2.5 sm:px-6 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base min-h-[48px]"
            >
              {isSubmitting ? 'Processing...' : `Confirm Booking - KSh ${totalPrice.toLocaleString()}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BookingModal;
