import React from 'react';
import Carousel from '../carousel/Carousel';
import {pic1, pic5, pic6 } from "../../components/carousel/index";
//import Conference from '../conference/Conference';

const projectImages = [
  { src: pic1, caption: 'Water Project At Borstal Home Abeokuta Ogun State' },
  { src: pic5, caption: '2025 Conference Invitation, See You Sat May 31st' },
  { src: pic5, caption: '2025 Conference Invitation, See You Sat May 31st' },
  { src: pic5, caption: '2025 Conference Invitation, See You Sat May 31st' },
  { src: pic5, caption: '2025 Conference Invitation, See You Sat May 31st' },
  { src: pic6, caption: 'Please Pay Your 2025 Conference Dues Into Displayed Account Details ' }
];

const Projects: React.FC = () => {
  return (
    <div className="container mx-auto my-8 ">
      <h2 className="text-3xl font-bold mb-4 text-center">Special Projects Carried Out By The Ministry Across The Nation</h2>
      <Carousel images={projectImages} />
    </div>
  );
};

export default Projects;
