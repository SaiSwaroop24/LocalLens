import React, { useState, useEffect } from "react";
import '../../App.css';

const Slideshow = ({ images, interval =3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images.length, interval]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="slideshow-container">
      <button onClick={goToPrevious} className="slideshow-button">
        &#8249;
      </button>
      <div className="slideshow-image">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </div>
      <button onClick={goToNext} className="slideshow-button">
        &#8250;
      </button>
      <div className="slideshow-indicators">
        {images.map((_, index) => (
          <span
            key={index}
            className={`indicator ${
              index === currentIndex ? "active" : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
