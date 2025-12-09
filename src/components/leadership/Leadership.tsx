import React from 'react';
import { leader1, leader2, leader3, leader4, leader5 } from '../leadership/index';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

interface Leader {
  name: string;
  description: string;
  image: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
}

const Leadership: React.FC = () => {
  const leadersData: Leader[] = [
    {
      name: 'Pastor Ariyo Popoola',
      description: 'National Chairman',
      image: leader1,
      facebook: 'https://web.facebook.com/ariyo.popoola',
      twitter: 'https://x.com/ariyo_popoola?t=YeE8O-RzaIJz9f2BNnUdsg&s=09',
      linkedin: 'https://www.linkedin.com/in/popoola-ariyo-785469131?',
      instagram: 'https://www.instagram.com/',
    },
    {
      name: 'Pst Rotimi Thomas',
      description: 'National Vice Chairman',
      image: leader5,
      facebook: 'https://web.facebook.com/rotimi.thomas',
      twitter: 'https://twitter.com/rotimi',
      linkedin: 'https://linkedin.com/in/rotimi',
      instagram: 'https://www.instagram.com/',
    },
    {
      name: 'A/P (Mrs) Bukunola Da-Silva',
      description: 'National Secretary',
      image: leader4,
      facebook: 'https://web.facebook.com/oreagbadasilva.bola',
      twitter: 'https://twitter.com/bukunola',
      linkedin: 'https://linkedin.com',
      instagram: 'https://www.instagram.com/oreagbadasilva/',
    },
    {
      name: 'A/P Dele Ajayi',
      description: 'National Legal Adviser',
      image: leader2,
      facebook: 'https://facebook.com/dele',
      twitter: 'https://twitter.com/dele',
      linkedin: 'https://linkedin.com/in/dele',
      instagram: 'https://www.instagram.com/',
    },
    {
      name: 'A/P Dele Fadesere',
      description: 'National Treasurer',
      image: leader3,
      facebook: 'https://facebook.com/fadesere',
      twitter: 'https://twitter.com/fadesere',
      linkedin: 'https://linkedin.com/in/fadesere',
      instagram: 'https://www.instagram.com/',
    },
  ];

  return (
    <div className="bg-blue-200 py-12">
      <div className="custom-container">
        <h1 className="text-3xl font-bold mb-8 text-center">National Leadership Team</h1>
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
                  {leader.instagram && (
                    <a href={leader.instagram} target="_blank" rel="noopener noreferrer">
                      <FaInstagram className="text-blue-500 hover:text-blue-700 transition-colors duration-200" />
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
