import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CarouselProps {
  images: { src: string; caption: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => window.clearInterval(intervalId);
  }, [images.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  if (!images.length) {
    return null;
  }

  return (
    <div className="relative overflow-hidden rounded-lg bg-slate-100 shadow-2xl shadow-slate-200">
      <div className="relative h-[380px] sm:h-[460px] lg:h-[540px]">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].caption}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
        <div className="max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-sky-100">
            Active Support Need
          </p>
          <h3 className="text-2xl font-black leading-tight text-white sm:text-4xl">
            {images[currentIndex].caption}
          </h3>
        </div>
      </div>

      <div className="absolute right-4 top-4 flex gap-2">
        <button
          type="button"
          aria-label="Previous project"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-slate-800 shadow-sm backdrop-blur transition hover:bg-white hover:text-sky-700"
          onClick={prevSlide}
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next project"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/80 text-slate-800 shadow-sm backdrop-blur transition hover:bg-white hover:text-sky-700"
          onClick={nextSlide}
        >
          <FaChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute bottom-5 right-5 hidden items-center gap-2 sm:flex">
        {images.map((image, index) => (
          <button
            key={image.caption}
            type="button"
            aria-label={`Show project ${index + 1}`}
            className={`h-2.5 rounded-full transition ${
              index === currentIndex ? "w-8 bg-white" : "w-2.5 bg-white/45"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
