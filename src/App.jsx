import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import About from './pages/About';
import FindCar from './pages/FindCar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function App() {
  const [cars, setCars] = useState([]);

  // Fetch cars from json-server (GET request)
  useEffect(() => {
    fetch('http://localhost:3001/cars')
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => console.error('Error fetching cars:', error));
  }, []);

  // Function to add a new car (will be passed to AddCar form)
  const addCar = (newCar) => {
    setCars([...cars, newCar]);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/find-cars" element={<FindCar cars={cars} addCar={addCar} />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
