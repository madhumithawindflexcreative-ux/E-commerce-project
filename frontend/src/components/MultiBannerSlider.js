import { useState, useEffect, useRef } from "react";
import "./MultiBannerSlider.css";

function MultiBannerSlider() {

  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
    "/images/banner4.jpg"
  ];

  // clone first 3 banners for infinite effect
  const slides = [...banners, ...banners.slice(0,3)];

  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);
  const sliderRef = useRef();

  useEffect(() => {

    const interval = setInterval(() => {
      setIndex(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    if(index === banners.length){

      setTimeout(() => {
        setTransition(false);
        setIndex(0);
      },600);

      setTimeout(() => {
        setTransition(true);
      },650);

    }

  },[index,banners.length]);

  return (

    <div className="multi-slider-container">

      <div
        ref={sliderRef}
        className="multi-slider-track"
        style={{
          transform:`translateX(-${index * 33.33}%)`,
          transition: transition ? "transform 0.6s ease" : "none"
        }}
      >

        {slides.map((banner,i)=>(
          <img key={i} src={banner} className="slider-card"/>
        ))}

      </div>

      {/* DOTS */}

      <div className="slider-dots">

        {banners.map((_,i)=>(
          <span
            key={i}
            className={`dot ${i === index % banners.length ? "active" : ""}`}
          />
        ))}

      </div>

    </div>

  );
}

export default MultiBannerSlider;