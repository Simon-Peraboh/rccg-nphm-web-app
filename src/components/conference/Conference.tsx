import React from 'react';
import { conf1, conf2, conf3, conf4, conf5, conf6 } from '../conference/index';
import { Link } from 'react-router-dom';

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
    title: 'Maiden Edition May 1st 2018 Theme: From Hopelessness to Glory',
    description: '',
  },
  {
    src: conf2,
    title: '2nd Conference Theme:',
    description: 'Description of Place 2',
  },
  {
    src: conf3,
    title: '3rd Conference 4th May 2022 Theme: Fresh Air For Freedom',
    description: 'Description of Place 3',
  },
  {
    src: conf4,
    title: '4th Conference 29th April 2023 Theme: Wonders Of Freedom',
    description: 'Facilitators: Pst Sunday Akande(National Overseer) Pst Oladele Balogun(SATGO ADMIN) Rev Ben-Rabbi Freedman(Controller Of Corrections Center Lagos State Comm) Pst Taiwo Kasumu(Police Area Commander, Agodi Ibadan Oyo State) Dr Olumide Ibode(Medical Director Redeemed Health Center) Pst Ariyo Popoola(National Chairman RCCG PHM) '
  },
  {
    src: conf5,
    title: '5th Conference 1st June 2024 Theme: Wind Of Divine Repositioning',
    description: 'There Shall be Divine Repositioning ',
  },
  {
    src: conf6,
    title: 'Sixth Edition Loading',
    description: 'Description of Place 6',
  },
];

const Conference: React.FC<VisitationProps> = () => {
  return (
    <div className="bg-blue-200 py-12"> {/* Background color for the entire section */}
      <div className="custom-container">
        <h2 className="text-3xl font-bold mb-8 text-center">Past Conferences Photo Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-2">
          {/* Render each visited place */}
          {visitedPlaces.map((place, index) => (
            <div
              key={index}
              className="relative bg-gray-200 shadow-xl rounded-xl overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={place.src}
                alt={`Conference ${index + 1}`}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{place.title}</h3>
                <p className="text-sm">{place.description}</p>
              </div>
            </div>
          ))}
        </div>
        <button>
           <Link to="/dashboard/conference" className="flex items-center ml-2 space-x-2 bg-gray-100 hover:bg-green-500 p-2 rounded">
          <span>Conference Registration</span>
          </Link>
        </button>
        <div>
        <button>
           <Link to="/dashboard/attendance/AttendanceSheet" className="flex items-center ml-2 space-x-2 bg-gray-400 hover:bg-green-500 p-2 rounded">
          <span>Mark Attendance</span>
          </Link>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Conference;
