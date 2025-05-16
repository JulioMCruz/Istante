import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Collection from './pages/Collection';
import MomentDetail from './pages/MomentDetail';
import CreateMoment from './pages/CreateMoment';
import MyAccount from './pages/MyAccount';
import { mockSlides } from './data/mockData';
import { Slide } from './types';

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
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Header />
        <Navigation />
        <div className="md:pl-64">
          <Routes>
            <Route path="/" element={<Home slides={slides} />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/moment/:id" element={<MomentDetail />} />
            <Route path="/create" element={<CreateMoment onCreateMoment={handleCreateMoment} />} />
            <Route path="/profile" element={<MyAccount />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;