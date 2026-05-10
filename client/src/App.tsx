import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import TripDetails from './pages/TripDetails';
import TripJournal from './pages/TripJournal';
import UserTripListing from './pages/UserTripListing';
import BuildItinerary from './pages/BuildItinerary';
import PackingChecklist from './pages/PackingChecklist';
import ExpenseBilling from './pages/ExpenseBilling';
import CommunityTab from './pages/CommunityTab';
import UserProfile from './pages/UserProfile';
import AdminPanel from './pages/AdminPanel';
import ItineraryView from './pages/ItineraryView';
import CreateNewTrip from './pages/CreateNewTrip';
import ActivitySearch from './pages/ActivitySearch';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';



function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserTripListing />} />
          <Route path="/trips" element={<UserTripListing />} />
          <Route path="/trips/new" element={<CreateNewTrip />} />
          <Route path="/trips/:id" element={<TripDetails />} />
          <Route path="/journal" element={<TripJournal />} />
          <Route path="/build-itinerary" element={<BuildItinerary />} />
          <Route path="/itinerary-view" element={<ItineraryView />} />
          <Route path="/packing" element={<PackingChecklist />} />
          <Route path="/expenses" element={<ExpenseBilling />} />
          <Route path="/community" element={<CommunityTab />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/search" element={<ActivitySearch />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
