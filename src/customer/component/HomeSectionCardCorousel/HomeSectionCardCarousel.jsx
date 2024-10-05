import React, { useRef, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import HomeSectionCard from '../homeSectionCards/HomeSectionCard';

const HomeSectionCardCarousel = ({ sectionName, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const handleSlideChange = ({ item }) => setCurrentIndex(item);

  const handlePrev = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    setCurrentIndex(newIndex);
    carouselRef.current.slideTo(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex < data.length - 4 ? currentIndex + 1 : data.length - 4;
    setCurrentIndex(newIndex);
    carouselRef.current.slideTo(newIndex);
  };

  const items = data.map((product, index) => (
    <HomeSectionCard key={index} product={product} />
  ));

  const responsive = {
    0: { items: 2 },
    560: { items: 3 },
    800: { items: 4 },
    1024: { items: 4.5 },  // Increased visibility for larger screens
  };

  return (
    <div className="mx-4 my-6">
      <h2 className="text-3xl font-bold text-gray-900 py-4 border-b border-gray-300">{sectionName}</h2>
      <div className="relative mt-6 flex items-center">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          controlsStrategy="responsive"
          disableButtonsControls
          disableDotsControls
          infinite={false}
          activeIndex={currentIndex}
          onSlideChanged={handleSlideChange}
          ref={carouselRef}
        />

        {/* Prev Button */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 border border-gray-300 shadow-lg p-1 rounded-full focus:outline-none hover:bg-gray-100 hover:shadow-xl transition"
            aria-label="Previous Slide"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {/* Next Button */}
        {currentIndex < data.length - 4 && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 border border-gray-300 shadow-lg p-1 rounded-full focus:outline-none hover:bg-gray-100 hover:shadow-xl transition"
            aria-label="Next Slide"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCardCarousel;
