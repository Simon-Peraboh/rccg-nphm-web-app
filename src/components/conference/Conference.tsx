import React from 'react';
import { conf1, conf2, conf3, conf4, conf5, conf6, conf7,conf8 } from '../conference/index';

interface VisitationProps {}

// Define type for visited place item
interface VisitedPlace {
  src: string;
  title: string;
  description: string;
}

// Sample array of visited places with title and description
const visitedPlaces: VisitedPlace[] = [
  {
    src: conf1,
    title: 'Maiden Edition',
    description: 'Description of Place 1',
  },
  {
    src: conf2,
    title: 'Second Conference',
    description: 'Description of Place 2',
  },
  {
    src: conf3,
    title: 'Third Conference',
    description: 'Description of Place 3',
  },
  {
    src: conf4,
    title: 'Fourth Conference',
    description: 'Description of Place 4',
  },
  {
    src: conf5,
    title: 'Fourth Conference',
    description: 'Description of Place 4',
  },
  {
    src: conf6,
    title: 'Fourth Conference',
    description: 'Description of Place 4',
  },
  {
    src: conf7,
    title: 'Fourth Conference',
    description: 'Description of Place 4',
  },
  {
    src: conf8,
    title: 'Fourth Conference',
    description: 'Description of Place 4',
  },
];

const Visitation: React.FC<VisitationProps> = () => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Past Conferences Photo Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Render each visited place */}
        {visitedPlaces.map((place, index) => (
          <div key={index} className="relative aspect-w-1 aspect-h-1">
            <div className="w-full h-64 rounded overflow-hidden">
              <img
                src={place.src}
                alt={`Visited place ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4">
              <h3 className="text-lg font-bold">{place.title}</h3>
              <p className="text-sm">{place.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visitation;
