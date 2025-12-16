import React, { useEffect, useState } from 'react';

interface CarouselProps {
  images: { src: string; caption: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 10000); // Change slide every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <div className="relative p-2">
      {/* Image */}
      <img
        src={images[currentIndex].src}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full object-cover h-72"
      />
      {/* Text Caption */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-2 px-4 p-2">
        {images[currentIndex].caption}
      </div>
      {/* Buttons */}
      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full px-2 py-1" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full px-2 py-1" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
