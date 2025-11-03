import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import About from './pages/About';
import FindCar from './pages/FindCar';
import Bookings from './pages/Bookings';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Fetch cars from json-server (GET request)
  useEffect(() => {
    fetch('http://localhost:3001/cars')
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching cars:', error));
  }, []);

  // Fetch bookings from json-server
  useEffect(() => {
    fetch('http://localhost:3001/bookings')
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error('Error fetching bookings:', error));
  }, []);

  // Function to add a new car (will be passed to AddCar form)
  const addCar = (newCar) => {
    setCars([...cars, newCar]);
  };

  // Function to add a new booking
  const addBooking = (newBooking) => {
    setBookings([...bookings, newBooking]);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/find-cars" element={<FindCar cars={cars} addCar={addCar} onBook={addBooking} />} />
              <Route path="/bookings" element={<Bookings />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
