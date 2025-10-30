import { useNavigate } from 'react-router-dom';
import TripForm from '../cars/TripForm';

function HomePage() {
  const navigate = useNavigate();

  const handleTripSubmit = (tripData) => {
    console.log('Trip data submitted:', tripData);
    // Navigate to FindCar page with trip data as state
    navigate('/find-cars', { state: { tripData } });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Rental Car
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Smart matching. Transparent pricing. Stress-free booking.
            </p>
          </div>
        </div>
      </section>

      {/* Trip Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Start Your Journey
            </h2>
            <p className="text-lg text-gray-600">
              Tell us about your trip and we'll find the perfect vehicle for you
            </p>
          </div>
          <TripForm onSubmit={handleTripSubmit} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose SPINZ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Smart Matching
              </h3>
              <p className="text-gray-600">
                Our intelligent system matches you with the perfect vehicle based on your trip details and preferences.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Transparent Pricing
              </h3>
              <p className="text-gray-600">
                No hidden fees. See the total cost upfront including insurance, mileage, and all extras.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Verified Reviews
              </h3>
              <p className="text-gray-600">
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
