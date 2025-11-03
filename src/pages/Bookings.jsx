import { useState, useEffect } from 'react';

/**
 * Bookings Page Component
 * Displays all user bookings with details
 */
function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bookings from json-server
  useEffect(() => {
    fetch('http://localhost:3001/bookings')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch bookings');
        return res.json();
      })
      .then((data) => {
        // Sort by booking date, most recent first
        const sortedBookings = data.sort((a, b) =>
          new Date(b.bookingDate) - new Date(a.bookingDate)
        );
        setBookings(sortedBookings);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel booking');
      }

      // Remove booking from state
      setBookings(bookings.filter(booking => booking.id !== bookingId));
      alert('Booking cancelled successfully');
    } catch (error) {
      console.error('Error canceling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Page Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          My Bookings
        </h1>
        <p className="text-base sm:text-lg text-gray-600">
          View and manage your car rental bookings
        </p>
      </div>

      {/* Bookings List */}
      {bookings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <svg
            className="mx-auto h-16 w-16 sm:h-20 sm:w-20 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-4 text-lg sm:text-xl font-medium text-gray-900">No bookings yet</h3>
          <p className="mt-2 text-sm sm:text-base text-gray-500 px-4">
            Start booking your perfect car for your next adventure!
          </p>
          <div className="mt-6">
            <a
              href="/find-cars"
              className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors min-h-[48px]"
            >
              Browse Cars
            </a>
          </div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-4 sm:p-6">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                  {/* Car Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={booking.carImage}
                      alt={`${booking.carMake} ${booking.carModel}`}
                      className="w-full lg:w-48 h-40 sm:h-48 object-cover rounded-lg"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                          {booking.carMake} {booking.carModel}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          Booked on {formatDate(booking.bookingDate)}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800 self-start">
                        {booking.status || 'Confirmed'}
                      </span>
                    </div>

                    {/* Trip Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-500">Destination</p>
                        <p className="text-sm sm:text-base text-gray-900 mt-1">{booking.destination}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-500">Pick-up Date</p>
                        <p className="text-sm sm:text-base text-gray-900 mt-1">{formatDate(booking.pickupDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-500">Return Date</p>
                        <p className="text-sm sm:text-base text-gray-900 mt-1">{formatDate(booking.returnDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-500">Duration</p>
                        <p className="text-sm sm:text-base text-gray-900 mt-1">{booking.duration} day{booking.duration > 1 ? 's' : ''}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-500">Passengers</p>
                        <p className="text-sm sm:text-base text-gray-900 mt-1">{booking.passengers}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-500">Total Price</p>
                        <p className="text-base sm:text-lg font-bold text-primary-600 mt-1">
                          KSh {booking.totalPrice.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Customer Information */}
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4">
                      <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Contact Information</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm">
                        <div>
                          <span className="text-gray-500">Name:</span>
                          <span className="ml-2 text-gray-900">{booking.customerName}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Email:</span>
                          <span className="ml-2 text-gray-900 break-all">{booking.customerEmail}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Phone:</span>
                          <span className="ml-2 text-gray-900">{booking.customerPhone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-3 sm:pt-4 border-t">
                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="w-full sm:w-auto px-5 py-2.5 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium text-sm sm:text-base min-h-[44px]"
                      >
                        Cancel Booking
                      </button>
                      <a
                        href={`/find-cars`}
                        className="w-full sm:w-auto px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium text-center text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                      >
                        Book Another Car
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Bookings;
