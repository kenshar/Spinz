/**
 * HomePage Component
 * Main landing page for the SPINZ car rental application
 * Contains hero section, trip form, and features showcase
 */

// Import necessary hooks and components
import { useNavigate } from 'react-router-dom';
import TripForm from '../cars/TripForm';

function HomePage() {
  // Hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Handles trip form submission
   * Logs trip data and navigates to FindCar page with trip details
   * @param {Object} tripData - Form data containing trip requirements
   */
  const handleTripSubmit = (tripData) => {
    console.log('Trip data submitted:', tripData);
    // Navigate to FindCar page with trip data as state
    navigate('/find-cars', { state: { tripData } });
  };

  return (
    <div className="min-h-screen">
      {/* ========================================
          HERO SECTION
          Main banner with headline and tagline
          ======================================== */}
      <section className="bg-green-600 text-white py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              Find Your Perfect Rental Car
            </h1>
            {/* Tagline highlighting key benefits */}
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-primary-100 px-2">
              Smart matching. Transparent pricing. Stress-free booking.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================
          TRIP FORM SECTION
          User inputs trip details to find matching cars
          ======================================== */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Start Your Journey
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-2">
              Tell us about your trip and we'll find the perfect vehicle for you
            </p>
          </div>
          {/* Trip form component - submits to handleTripSubmit */}
          <TripForm onSubmit={handleTripSubmit} />
        </div>
      </section>

      {/* ========================================
          FEATURES SECTION
          Showcases the three main benefits of SPINZ
          ======================================== */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-10 md:mb-12">
            Why Choose SPINZ?
          </h2>

          {/* Features grid - 3 columns on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Feature 1: Smart Matching */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                Smart Matching
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Our intelligent system matches you with the perfect vehicle based on your trip details and preferences.
              </p>
            </div>

            {/* Feature 2: Transparent Pricing */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                Transparent Pricing
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                No hidden fees. See the total cost upfront including insurance, mileage, and all extras.
              </p>
            </div>

            {/* Feature 3: Verified Reviews */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
                Verified Reviews
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Read real experiences from other travelers to make informed decisions with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
