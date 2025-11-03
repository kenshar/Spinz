import { useState } from 'react';

function AddCar({ addCar }) {
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    type: 'Sedan',
    category: 'Economy',
    passengers: 5,
    luggage: 3,
    transmission: 'Automatic',
    fuelType: 'Gasoline',
    pricePerDay: '',
    mileageLimit: 200,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
    rating: 4.0,
    reviews: 0,
    insurance: 'Basic included',
    available: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseFloat(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newCar = {
      ...formData,
      features: ['Bluetooth', 'Air Conditioning', 'USB Port']
    };

    const configObj = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCar)
    };

    fetch('http://localhost:3001/cars', configObj)
      .then((res) => res.json())
      .then((data) => {
        addCar(data); // THIS STATE UPDATE IS REQUIRED!!!
        // Clear form
        setFormData({
          make: '',
          model: '',
          year: new Date().getFullYear(),
          type: 'Sedan',
          category: 'Economy',
          passengers: 5,
          luggage: 3,
          transmission: 'Automatic',
          fuelType: 'Gasoline',
          pricePerDay: '',
          mileageLimit: 200,
          image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
          rating: 4.0,
          reviews: 0,
          insurance: 'Basic included',
          available: true
        });
        setIsSubmitting(false);
        setShowForm(false);
        alert('Car added successfully!');
      })
      .catch((error) => {
        console.error('Error adding car:', error);
        setIsSubmitting(false);
        alert('Error adding car. Please try again.');
      });
  };

  return (
    <div className="mb-6 sm:mb-8">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-primary-600 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium mb-4 text-sm sm:text-base min-h-[44px]"
      >
        {showForm ? 'Cancel' : 'Add New Car'}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
            Add New Rental Car
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Make *
              </label>
              <input
                type="text"
                name="make"
                value={formData.make}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
                placeholder="Toyota"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Model *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
                placeholder="Camry"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Year *
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                min="2000"
                max="2025"
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
              >
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
                <option value="Compact">Compact</option>
                <option value="Truck">Truck</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
              >
                <option value="Economy">Economy</option>
                <option value="SUV">SUV</option>
                <option value="Luxury">Luxury</option>
                <option value="Van">Van</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Passengers
              </label>
              <input
                type="number"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                min="2"
                max="15"
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Luggage Capacity
              </label>
              <input
                type="number"
                name="luggage"
                value={formData.luggage}
                onChange={handleChange}
                min="1"
                max="10"
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Transmission
              </label>
              <select
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Fuel Type
              </label>
              <select
                name="fuelType"
                value={formData.fuelType}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
              >
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Price Per Day ($) *
              </label>
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
                placeholder="45"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Mileage Limit (miles/day)
              </label>
              <input
                type="number"
                name="mileageLimit"
                value={formData.mileageLimit}
                onChange={handleChange}
                min="50"
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm sm:text-base min-h-[44px]"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm sm:text-base min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-5 py-2.5 sm:px-6 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base min-h-[44px]"
            >
              {isSubmitting ? 'Adding...' : 'Add Car'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddCar;
