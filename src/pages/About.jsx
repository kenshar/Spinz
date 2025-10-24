const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex-1">
      {/* Header */}
      <div className="bg-purple-600 text-white py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">About SPINZ</h1>
          <p className="text-base sm:text-lg">Smart car rental made simple</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* The Problem */}
        <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">The Problem</h2>
          <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
            Finding the right rental car is overwhelming. Too many choices, unclear pricing,
            and scattered reviews make it difficult to make confident decisions.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm sm:text-base">
            <li>Confusing pricing and hidden fees</li>
            <li>Difficulty comparing different vehicles</li>
            <li>No personalized recommendations</li>
          </ul>
        </section>

        {/* Our Solution */}
        <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Our Solution</h2>
          <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
            SPINZ simplifies car rental by matching you with the perfect vehicle based on
            your trip needs and providing transparent, side-by-side comparisons.
          </p>
          <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
            <div className="border-l-4 border-purple-600 pl-3 sm:pl-4">
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base"> Smart Matching</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Tell us your trip details and we'll recommend the best vehicles
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-3 sm:pl-4">
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base"> Clear Pricing</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                See total costs upfront with no hidden fees
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-3 sm:pl-4">
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base"> Easy Comparison</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Compare up to 3 vehicles side-by-side
              </p>
            </div>
            <div className="border-l-4 border-purple-600 pl-3 sm:pl-4">
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base"> Trusted Reviews</h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Real ratings from verified customers
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Key Features</h2>
          <ul className="space-y-2 sm:space-y-3">
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-green-600 text-lg sm:text-xl">✓</span>
              <div className="text-sm sm:text-base">
                <strong>Trip-based search</strong> - Find cars that match your specific needs
              </div>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-green-600 text-lg sm:text-xl">✓</span>
              <div className="text-sm sm:text-base">
                <strong>Filter & sort</strong> - Quickly narrow down your options
              </div>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-green-600 text-lg sm:text-xl">✓</span>
              <div className="text-sm sm:text-base">
                <strong>Vehicle comparison</strong> - Make informed decisions
              </div>
            </li>
            <li className="flex items-start gap-2 sm:gap-3">
              <span className="text-green-600 text-lg sm:text-xl">✓</span>
              <div className="text-sm sm:text-base">
                <strong>Mobile-friendly</strong> - Book on any device
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
