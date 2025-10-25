# SPINZ - Innovative Car Hiring Platform

A modern, user-friendly car rental platform built with React, featuring intelligent vehicle matching, transparent pricing, and seamless booking experiences.

## Features

- **Smart Trip-Based Matching**: Input trip details to get personalized vehicle recommendations
- **Transparent Comparison**: View and compare rental cars side-by-side with clear pricing
- **Advanced Filtering**: Filter by category (Economy, SUV, Luxury, Van) and sort by price, rating, or capacity
- **User Authentication**: Firebase-powered login and signup with secure authentication
- **Real-time Data**: RESTful API with json-server for car inventory management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Add New Cars**: Admin functionality to add new vehicles to the inventory

## Project Requirements Met

### Core Requirements
-  Single Page Application (SPA) using create-react-app (Vite)
-  5+ organized React components:
  1. `Navigation` - Responsive navigation bar
  2. `HomePage` - Landing page with hero section
  3. `CarList` - Display car inventory
  4. `AddCar` - Controlled form for adding cars
  5. `TripForm` - Trip details input form
  6. Plus: `About`, `Login`, `SignUp`, `FindCar` pages
- 3+ client-side routes with React Router:
  - `/` - Home
  - `/find-cars` - Browse cars
  - `/about` - About SPINZ
  - `/login` - User login
  - `/signup` - User registration
-  RESTful API with json-server
-  GET request to fetch cars (App.jsx:15-18)
-  POST request with controlled form (AddCar.jsx:48-68)
-  State update after POST request (AddCar.jsx:52 → App.jsx:22-24)
-  Styling with Tailwind CSS
-  Firebase Authentication

## Tech Stack

- **Frontend**: React 19.1.1, React Router 7.9.4
- **Styling**: Tailwind CSS 4.1.16
- **Backend**: json-server 1.0.0-beta.3
- **Authentication**: Firebase 12.4.0
- **Build Tool**: Vite 7.1.7

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
cd vite-project
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication
   - Copy your Firebase config
   - Update `src/firebase.js` with your credentials:
```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### Running the Application

You need to run TWO separate terminals:

**Terminal 1 - Start json-server (Backend):**
```bash
npm run server
```
This starts the API server on `http://localhost:3001`

**Terminal 2 - Start React app (Frontend):**
```bash
npm run dev
```
This starts the development server on `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
vite-project/
├── src/
│   ├── cars/
│   │   └── TripForm.jsx          # Trip details input form
│   ├── components/
│   │   ├── AddCar.jsx             # Add new car form (POST request)
│   │   ├── CarList.jsx            # Display car inventory
│   │   ├── HomePage.jsx           # Landing page
│   │   └── Navigation.jsx         # Navigation bar
│   ├── contexts/
│   │   └── AuthContext.jsx        # Authentication context
│   ├── pages/
│   │   ├── About.jsx              # About page
│   │   ├── FindCar.jsx            # Browse cars page
│   │   ├── Login.jsx              # Login page
│   │   └── SignUp.jsx             # Signup page
│   ├── App.jsx                    # Main app component (GET request)
│   ├── firebase.js                # Firebase configuration
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles (Tailwind)
├── db.json                        # json-server database
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## API Endpoints

The json-server provides the following endpoints:

- `GET /cars` - Fetch all cars
- `POST /cars` - Add a new car
- `GET /cars/:id` - Get car by ID
- `PUT /cars/:id` - Update car
- `DELETE /cars/:id` - Delete car
- `GET /bookings` - Fetch all bookings
- `GET /users` - Fetch all users

## Key Components

### AddCar Component (Controlled Form)
Located at `src/components/AddCar.jsx`

- Implements controlled form inputs with React state
- Handles form submission with POST request to json-server
- Updates app state upon successful car addition
- Features form validation and loading states

**Key Code:**
```javascript
// Controlled inputs
const [formData, setFormData] = useState({ make: '', model: '', ... });

// POST request with state update
fetch('http://localhost:3001/cars', configObj)
  .then(res => res.json())
  .then(data => addCar(data)); // Required state update!
```

### App Component (GET Request)
Located at `src/App.jsx`

- Fetches cars on component mount
- Manages global car state
- Provides `addCar` function to child components

## Features in Detail

### 1. Car Browsing & Filtering
- Filter by category (Economy, SUV, Luxury, Van)
- Sort by price, rating, or passenger capacity
- Responsive card-based layout

### 2. Add New Cars
- Click "Add New Car" button on Find Cars page
- Fill out controlled form with car details
- Submit to add car to database
- Immediate UI update with new car

### 3. User Authentication
- Sign up with email and password
- Login to existing account
- Firebase-powered secure authentication
- Protected routes (ready for implementation)

### 4. Trip Planning
- Input destination, dates, passengers, and luggage
- Calculate trip duration automatically
- Date validation (no past dates)
- Form validation for required fields

## Future Enhancements

- Real-time availability checking
- Booking system integration
- User profiles and saved preferences
- Payment gateway integration
- Review and rating system
- Advanced search with more filters
- Admin dashboard
- Email notifications
- Multi-language support

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run server` - Start json-server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- ESLint configured for React best practices
- Tailwind CSS for consistent styling
- Component-based architecture
- Controlled forms throughout

## Deployment

To build for production:

```bash
npm run build
```

The build output will be in the `dist/` directory.

For json-server in production, consider using a proper backend like:
- Node.js + Express + MongoDB
- Firebase Realtime Database
- Supabase

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is for educational purpose.

## Contact

For questions or feedback, please contact:
- github : kenshar

---

Built with ❤️ by the SPINZ Team
