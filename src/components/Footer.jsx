import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-green-500 mb-4">SPINZ</h3>
            <p className="text-blue-100">
              Smart car rental made simple. Find your perfect vehicle for any journey.
            </p>
          </div>

          

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-blue-100">
              <li>Email: info@spinz.com</li>
              <li>Phone: +254 700 123 456</li>
              <li>Address: Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500 mt-8 pt-6 text-center text-blue-100">
          <p>&copy; {new Date().getFullYear()} SPINZ. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
