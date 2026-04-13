import React, { useState, useEffect } from "react";
// import ucn from "../../../assets/images/ucn.jpeg";
//import busImage from "../../../assets/images/bus.png";

const LocateUs = () => {
  const [textIndex, setTextIndex] = useState(0);
  const [showBus, setShowBus] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position
  const [isBusMoved, setIsBusMoved] = useState(false);

  const sentence = "Central India's No. 1 Solar EPC Company";
  // const busImage = "/path/to/bus-image.png"; // Make sure to use the correct path

  // Text animation effect
  useEffect(() => {
    if (textIndex < sentence.length && showBus) {
      const interval = setInterval(() => {
        setTextIndex((prev) => prev + 1);
      }, 100); // Speed of letter animation
      return () => clearInterval(interval);
    } else if (textIndex === sentence.length) {
      setTimeout(() => setShowBus(false), 1000); // Delay for bus after sentence animation
    }
  }, [textIndex, showBus, sentence.length]);

  // Bus movement on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY); // Update scroll position
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Clean up event listener
  }, []);

  useEffect(() => {
    // Hide text and set bus moved state after animation completes
    if (textIndex === sentence.length) {
      const timer = setTimeout(() => {
        setIsBusMoved(true);
      }, 5000); // Set the time it takes for the bus to move fully

      return () => clearTimeout(timer); // Clean up timer on unmount
    }
  }, [textIndex]);
  return (
    <>
      <div className="relative w-88 h-32 md:bg-gradient-to-b from-black to-white mb-10"></div>
      <div className="container mx-auto my-6">
        <div className="flex justify-center items-center h-[100px] md:h-[200px]">
          {/* Moving Bus Container */}
          <div className="relative w-full">
            {/* Animated Text */}
            <div className="text-center z-10">
              <div className="font-bold text-red-900 bg-transparent text-animation text-2xl sm:text-2xl md:text-3xl lg:text-5xl text-center">
                {sentence.slice(0, textIndex)}
              </div>
            </div>

            {/* Animated Bus */}
            {showBus && (
              <img
                src={busImage}
                alt="Moving Bus"
                className="bus-animation absolute top-1/2 transform -translate-y-1/2 w-20"
                style={{
                  left: `${scrollPosition * 0.02}px`, // Move bus with scroll
                  transition: "left 0.1s ease-out", // Smooth transition on scroll
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LocateUs;
