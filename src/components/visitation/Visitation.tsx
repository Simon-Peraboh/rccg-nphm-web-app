import React from 'react';
import { pic1, pic2, pic3, pic4 } from '../visitation/index';

const visitedPlaces = [
  { src: pic1, caption: 'Place 1' },
  { src: pic2, caption: 'Place 2' },
  { src: pic3, caption: 'Place 3' },
  { src: pic4, caption: 'Place 4' },
];

const Visitation: React.FC = () => {
  return (
    <div className="custom-container">
      <h2 className="text-3xl font-bold mb-4 text-center">Selected Images From Visits</h2>
      <div className="custom-grid p-2">
        {visitedPlaces.map((place, index) => (
          <div key={index} className="custom-card">
            <img src={place.src} alt={`Visited place ${index + 1}`} className="w-full h-64 object-cover" />
            <div className="custom-card-content">
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4">
                {place.caption}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visitation;
