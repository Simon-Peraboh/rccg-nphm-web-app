//import React, { useEffect, useState } from 'react';
//import { Link } from 'react-router-dom';
import { conf1, conf2, conf3, conf4, conf5, conf6 } from '../conference/index';
import { v4 as uuidv4 } from 'uuid';

interface VisitationProps {}

interface VisitedPlace {
  id: string;
  src: string;
  title: string;
  description: string;
}

const visitedPlaces: VisitedPlace[] = [
  { id: uuidv4(), src: conf1, title: 'Maiden Edition May 1st 2018 Theme: From Hopelessness to Glory', description: '' },
  { id: uuidv4(), src: conf2, title: '2nd Edition May 1st 2019 Theme: Reigning In Everlasting Dominion', description: '' },
  { id: uuidv4(), src: conf3, title: '3rd Edition 4th May 2022 Theme: Fresh Air For Freedom', description: '' },
  { id: uuidv4(), src: conf4, title: '4th Edition 29th April 2023 Theme: Wonders Of Freedom', description: '' },
  { id: uuidv4(), src: conf5, title: '5th Edition June 1st 2024 Theme: Wind Of Divine Repositioning', description: '' },
  { id: uuidv4(), src: conf6, title: 'Sixth Edition May 31st 2025 Theme: Divine Landmark', description: '' },
];

// const alertMessages = [
//   "This Year's 6th Conference! comes up on May 31st, 2025!",
//   "Register now for the 6th Conference(Divine Landmark) on May 31st, 2025!",
//   "Exciting speakers lined up for this year's Conference!",
//   "Join us for a Transformative experience at the upcoming Conference!"
// ];

// const RollingAlert: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % alertMessages.length);
//     }, 5000); // Change every 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="w-full py-2 overflow-hidden text-xl font-bold text-center text-white bg-yellow-500">
//       <div className="whitespace-nowrap animate-marquee">{alertMessages[currentIndex]}</div>
//     </div>
//   );
// };

const Conference: React.FC<VisitationProps> = () => {
  return (
    <div className="py-12 bg-blue-200">
      <div className="custom-container">
        <h2 className="mb-8 text-3xl font-bold text-center">Conference Editions In A Glance</h2>
        {/* <RollingAlert /> */}
        <div className="grid grid-cols-1 gap-8 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visitedPlaces.map((place) => (
            <div
              key={place.id}
              className="relative overflow-hidden transition-transform transform bg-gray-200 shadow-xl rounded-xl hover:scale-105"
            >
              <img src={place.src} alt={place.title} className="object-cover w-full h-64" />
              <div className="p-4">
                <h3 className="text-lg font-bold">{place.title}</h3>
                <p className="text-sm">{place.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <button>
          <Link to="/dashboard/conference" className="flex items-center p-2 ml-2 space-x-2 bg-gray-100 rounded hover:bg-green-500">
            <span>Conference Registration</span>
          </Link>
        </button> */}
        <div>
        {/* <button>
           <Link to="/dashboard/attendance/AttendanceSheet" className="flex items-center ml-2 space-x-2 bg-gray-400 hover:bg-green-500 p-2 rounded">
          <span>Mark Attendance</span>
          </Link>
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default Conference;
