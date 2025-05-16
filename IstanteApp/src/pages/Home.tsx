import React from 'react';
import ImageSlider from '../components/ImageSlider';
import { Slide } from '../types';

interface HomeProps {
  slides: Slide[];
}

const Home: React.FC<HomeProps> = ({ slides }) => {
  return (
    <main className="pt-16">
      <ImageSlider slides={slides} />
    </main>
  );
};

export default Home;