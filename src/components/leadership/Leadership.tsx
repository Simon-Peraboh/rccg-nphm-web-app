import React from 'react';
import { leader1, leader2, leader3, leader4, leader5 } from '../leadership/index';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

interface Leader {
  name: string;
  description: string;
  image: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
}

const Leadership: React.FC = () => {
  const leadersData: Leader[] = [
    {
      name: 'Pastor Ariyo Popoola',
      description: 'National Chairman',
      image: leader1,
      facebook: 'https://facebook.com/ariyo',
      twitter: 'https://twitter.com/ariyo',
      linkedin: 'https://linkedin.com/in/ariyo',
    },
    {
      name: 'Pst Rotimi Thomas',
      description: 'National Vice Chairman',
      image: leader5,
      facebook: 'https://facebook.com/rotimi',
      twitter: 'https://twitter.com/rotimi',
      linkedin: 'https://linkedin.com/in/rotimi',
    },
    {
      name: 'AP (Mrs) Bukunola',
      description: 'National Secretary',
      image: leader4,
      facebook: 'https://facebook.com/bukunola',
      twitter: 'https://twitter.com/bukunola',
      linkedin: 'https://linkedin.com/in/bukunola',
    },
    {
      name: 'AP Dele Ajayi',
      description: 'National Legal Adviser',
      image: leader2,
      facebook: 'https://facebook.com/dele',
      twitter: 'https://twitter.com/dele',
      linkedin: 'https://linkedin.com/in/dele',
    },
    {
      name: 'AP Dele Fadesere',
      description: 'National Treasurer',
      image: leader3,
      facebook: 'https://facebook.com/fadesere',
      twitter: 'https://twitter.com/fadesere',
      linkedin: 'https://linkedin.com/in/fadesere',
    },
  ];

  return (
    <div className="bg-blue-200 py-12">
      <div className="custom-container">
        <h1 className="text-3xl font-bold mb-8 text-center">Leadership Structure</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-2">
          {leadersData.map((leader, index) => (
            <div key={index} className="flex flex-col items-center p-6 bg-gray-200 rounded-lg shadow-lg">
              <img className="h-48 w-48 object-cover rounded-full mb-4 shadow-md" src={leader.image} alt={`${leader.name}`} />
              <div className="flex flex-col items-center text-center">
                <p className="font-bold text-lg mb-2">{leader.name}</p>
                <p className="text-sm mb-4">{leader.description}</p>
                <div className="flex justify-center space-x-4">
                  {leader.facebook && (
                    <a href={leader.facebook} target="_blank" rel="noopener noreferrer">
                      <FaFacebook className="text-blue-600 hover:text-blue-800 transition-colors duration-200" />
                    </a>
                  )}
                  {leader.twitter && (
                    <a href={leader.twitter} target="_blank" rel="noopener noreferrer">
                      <FaTwitter className="text-blue-400 hover:text-blue-600 transition-colors duration-200" />
                    </a>
                  )}
                  {leader.linkedin && (
                    <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="text-blue-700 hover:text-blue-900 transition-colors duration-200" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leadership;
