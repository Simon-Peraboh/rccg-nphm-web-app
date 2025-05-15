import React from 'react';
import Carousel from '../carousel/Carousel';
import { pic1, pic2, pic3, pic4 } from "../../components/carousel/index";

const projectImages = [
  { src: pic1, caption: 'Lagos General Hospital' },
  { src: pic2, caption: 'Caption 2' },
  { src: pic3, caption: 'Caption 3' },
  { src: pic4, caption: 'Caption 4' }
];

const Projects: React.FC = () => {
  return (
    <div className="container mx-auto my-8 ">
      <h2 className="text-3xl font-bold mb-4 text-center">Some Amazing Projects Executed Across Nigeria</h2>
      <Carousel images={projectImages} />
    </div>
  );
};

export default Projects;
