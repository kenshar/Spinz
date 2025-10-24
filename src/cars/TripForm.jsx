import { useState } from 'react';

const TripForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    destination: '',
    pickupDate: '',
    returnDate: '',
    passengers: 1,
    luggage: 1,
    specialNeeds: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate trip duration in days
    const pickup = new Date(formData.pickupDate);
    const returnDate = new Date(formData.returnDate);
    const duration = Math.ceil((returnDate - pickup) / (1000 * 60 * 60 * 24));

    onSubmit({
      ...formData,
      duration
    });
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <form className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto border border-gray-100" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 mb-8">
        {/* Row 1: Destination and Pick-up Date */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <label htmlFor="destination" className="font-semibold mb-2 text-gray-700">Destination</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="e.g Nanyuki, Nairobi, Mombasa"
              className="p-4 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
              required
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="pickupDate" className="font-semibold mb-2 text-gray-700">Pick-up Date</label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handleChange}
              min={today}
              className="p-4 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
              required
            />
          </div>
        </div>

        {/* Row 2: Return Date and Passengers */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <label htmlFor="returnDate" className="font-semibold mb-2 text-gray-700">Return Date</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              min={formData.pickupDate || today}
              className="p-4 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
              required
            />
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="passengers" className="font-semibold mb-2 text-gray-700">Passengers</label>
            <select
              id="passengers"
              name="passengers"
              value={formData.passengers}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 bg-white"
              required
            >
              <option value="1">1 passenger</option>
              <option value="2">2 passengers</option>
              <option value="3">3 passengers</option>
              <option value="4">4 passengers</option>
              <option value="5">5 passengers</option>
              <option value="6">6-8 passengers</option>
              <option value="9">9+ passengers</option>
            </select>
          </div>
        </div>

        {/* Row 3: Luggage and Special Needs */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col flex-1">
            <label htmlFor="luggage" className="font-semibold mb-2 text-gray-700">Luggage</label>
            <select
              id="luggage"
              name="luggage"
              value={formData.luggage}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200 bg-white"
              required
            >
              <option value="1">1 bag</option>
              <option value="2">2 bags</option>
              <option value="3">3 bags</option>
              <option value="4">4 bags</option>
              <option value="5">5+ bags</option>
            </select>
          </div>

          <div className="flex flex-col flex-1">
            <label htmlFor="specialNeeds" className="font-semibold mb-2 text-gray-700">Special Needs (Optional)</label>
            <input
              type="text"
              id="specialNeeds"
              name="specialNeeds"
              value={formData.specialNeeds}
              onChange={handleChange}
              placeholder="e.g. abled differently, child seat, pet-friendly"
              className="p-4 border-2 border-gray-300 rounded-lg text-base transition-all focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-200"
            />
          </div>
        </div>
      </div>

      <button type="submit" className="w-full py-4 px-6 border-none rounded-lg text-lg font-bold cursor-pointer transition-all bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:-translate-y-1 hover:shadow-xl hover:from-purple-700 hover:to-purple-900">
        Find My Perfect Car
      </button>
    </form>
  );
};

export default TripForm;
