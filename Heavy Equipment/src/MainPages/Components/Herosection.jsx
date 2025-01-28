// components/HeroSection.js
import React, { useState, useEffect } from "react";

import heroImage1 from "../../Assets/image11.jpg";

import heroImage2 from "../../Assets/image22.jpg";
import heroImage3 from "../../Assets/image22.jpg"
import "../../Styles/HeroSection.css"

const images = [heroImage1, heroImage2, heroImage3];

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every second

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section bg-dark text-yellow py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Section on the Left */}
          <div className="col-md-6 text-section">
            <h1 className="display-4">Heavy Machinery</h1>
            <p className="lead">
              Explore a range of advanced machinery for mining and construction.
            </p>
            <button className="btn btn-warning discover-button">Discover More</button>
          </div>

          {/* Image Section on the Right */}
          <div className="col-md-6 text-center">
            <div className="image-container">
              <img
                src={images[currentImageIndex]}
                alt="Heavy Machinery"
                className="img-fluid rounded hero-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
