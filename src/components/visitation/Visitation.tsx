import React from 'react';
import { pic1, pic2, pic3, pic4} from '../visitation/index';

const visitedPlaces = [
  { src: pic1, caption: 'Place 1' },
  { src: pic2, caption: 'Place 2' },
  { src: pic3, caption: 'Place 3' },
  { src: pic4, caption: 'Place 4' },
 
];

const Visitation: React.FC = () => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4 text-gray-500">Selected Images From Visits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visitedPlaces.map((place, index) => (
          <div key={index} className="relative aspect-w-1 aspect-h-1">
            <div className="w-full h-64 rounded overflow-hidden">
              <img
                src={place.src}
                alt={`Visited place ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                // onLoad={() => console.log(`Image ${index + 1} loaded successfully`)}
                // onError={() => console.error(`Error loading image ${index + 1}`)}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4">
              {place.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visitation;
