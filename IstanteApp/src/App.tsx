import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Collection from './pages/Collection';
import MomentDetail from './pages/MomentDetail';
import CreateMoment from './pages/CreateMoment';
import EditMoment from './pages/EditMoment';
import ViewMoment from './pages/ViewMoment';
import MyAccount from './pages/MyAccount';
import MyRequests from './pages/MyRequests';
import Settings from './pages/Settings';
import Creations from './pages/Creations';
import { mockSlides } from './data/mockData';
import { Slide } from './types';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [slides, setSlides] = useState<Slide[]>(mockSlides);

  const handleCreateMoment = (momentData: { title: string; description: string; imageUrl: string }) => {
    const newMoment: Slide = {
      id: `moment-${Date.now()}`,
      ...momentData,
      mintPrice: '0.10'
    };
    
    setSlides((prevSlides) => [...prevSlides, newMoment]);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
          <Header />
          <Navigation />
          <div className="md:pl-64">
            <Routes>
              <Route path="/" element={<Home slides={slides} />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/create" element={<CreateMoment onCreateMoment={handleCreateMoment} />} />
              <Route path="/moment/:id/edit" element={<EditMoment />} />
              <Route path="/moment/:id/view" element={<ViewMoment />} />
              <Route path="/creations" element={<Creations />} />
              <Route path="/requests" element={<MyRequests />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/moment/:id" element={<MomentDetail />} />
              <Route path="/profile" element={<MyAccount />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;