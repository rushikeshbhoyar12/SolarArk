import React, { useEffect, useRef, useState } from "react";
import solarPanel2 from "../../../assets/images/envi.jpg";
import tikhale from "../../../assets/images/aboutkale.jpg";
import aboutus from "../../../assets/images/aboutus.mp4";
import { FaCheckCircle } from "react-icons/fa";
import solarPanel3 from "../../../assets/images/housingsystem.png";
import ourjourny from "../../../assets/images/jurney.png";
import logo1 from "../../../assets/images/logo (1).png";
import logo from "../../../assets/images/logo.png";
import logo2 from "../../../assets/images/logo (2).png";
import logo3 from "../../../assets/images/logo (3).png";
import logo4 from "../../../assets/images/logo (4).png";
import BookingForm from "../Index/BookingForm";
import { Helmet } from "react-helmet";

const About = () => {
  const videoRef = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (videoRef.current) {
        if (currentScrollY > lastScrollY) {
          // Scrolling Down: Play video
          videoRef.current
            .play()
            .catch((err) => console.error("Autoplay blocked:", err));
        } else {
          // Scrolling Up: Pause video
          videoRef.current.pause();
        }
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <>      
    <Helmet>
    <title>thesolarark.com | About Us | Solar Ark  </title>
      <meta
        name="description"
        content="Powering a Sustainable Future with Solar Ark India | Mission - Solar Ark's mission extends beyond projects. Our efforts revolve around nurturing awareness about sustainable living practices, inspiring individuals to make eco-conscious choices. | Vision - Empowering Communities, Illuminating Futures: Solar Ark's Vision for a Sustainable India At Solar Ark, we envision a future where every corner of India is bathed in the glow of ustainable energy, where communities thrive in harmony with nature, and where innovation and tradition converge to create a brighter tomorrow. Our vision is to lead the charge towards a renewable energy revolution, empowering communities across India to harness the abundant power of the sun and other sustainable resources. We see a nation where clean energy is not just a choice, but a way of life ingrained in the fabric of society."
      />
      <meta name="theme-color" content="#000000" />
      <meta name="author" content="The Solar Ark" />
      <meta name="robots" content="index, follow" />
      {/* Fallback Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Solar Ark " />
      <meta property="og:url" content="https://thesolarark.com/" />

    </Helmet>
        <div className="relative h-40 sm:h-28 lg:my-10 lg:bg-gradient-to-b bg-gradient-to-b lg:from-black lg:to-white mobile-header"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 sm:px-6 lg:px-12 py-3 sm:py-12 bg-white text-gray-800">
          {/* Left Grid: Image Section */}
          <div className="flex justify-center">
            <div className="">
              <img
                src={tikhale}
                alt="Solar Panel 2"
                className="object-cover w-[610px] h-full rounded-lg"
                loading="lazy" // Lazy loading enabled
              />
            </div>
          </div>

          {/* Right Grid: Text Section */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Powering a{" "}
              <span className="text-[rgba(186,89,89,0.871)]">
                Sustainable Future
              </span>{" "}
              with <span className="text-[rgba(186,89,89,0.871)]">Solar Ark</span>{" "}
              India
            </h1>

            <div className="space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Mission
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Solar Ark's mission extends beyond projects. Our efforts revolve
                  around nurturing awareness about sustainable living practices,
                  inspiring individuals to make eco-conscious choices.
                </p>
              </div>

              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Vision
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  "Empowering Communities, Illuminating Futures: Solar Ark's
                  Vision for a Sustainable India" At Solar Ark, we envision a
                  future where every corner of India is bathed in the glow of
                  ustainable energy, where communities thrive in harmony with
                  nature, and where innovation and tradition converge to create a
                  brighter tomorrow. Our vision is to lead the charge towards a
                  renewable energy revolution, empowering communities across India
                  to harness the abundant power of the sun and other sustainable
                  resources. We see a nation where clean energy is not just a
                  choice, but a way of life ingrained in the fabric of society.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* new code */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-15 bg-white">
          {/* Text Content */}
          <div className="flex flex-col justify-center text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Who Are <span className="text-[rgba(186,89,89,0.871)]">We?</span>
            </h2>
            <p className="text-gray-600 mb-6">
              We believe in building strong, lasting relationships with our
              clients, providing them with tailored solutions that align with
              their specific energy needs. Whether you’re a homeowner, a business,
              or part of an industrial facility, Solar Ark is here to help you
              make the smart, eco-friendly choice for your energy needs.
            </p>

            <div className="flex justify-center md:justify-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-6 flex justify-center">
                    <FaCheckCircle className="text-[rgba(186,89,89,0.871)] text-lg" />
                  </div>
                  <span className="text-base">Solar Inverter Setup</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 flex justify-center">
                    <FaCheckCircle className="text-[rgba(186,89,89,0.871)] text-lg" />
                  </div>
                  <span className="text-base">Battery Storage Solutions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 flex justify-center">
                    <FaCheckCircle className="text-[rgba(186,89,89,0.871)] text-lg" />
                  </div>
                  <span className="text-base">Solar Material Financing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 flex justify-center">
                    <FaCheckCircle className="text-[rgba(186,89,89,0.871)] text-lg" />
                  </div>
                  <span className="text-base">24 X 7 Call & Chat Support</span>
                </div>
              </div>
            </div>
            {/* 
          <button className="bg-[rgba(186,89,89,0.871)] md:self-start self-center text-white px-6 py-2 rounded hover:bg-orange-700 transition duration-300">
            Know More
          </button> */}
          </div>

          {/* Video Content */}
          <div className="relative w-full h-64 sm:h-72 lg:h-96 rounded-lg overflow-hidden shadow-lg">
            <video
              // src={aboutus}
              // className="absolute inset-0 w-full h-full object-cover"
              // loop
              // // muted
              // autoPlay="true"
              // playsInline
              // controls={true}
              ref={videoRef}
              src={aboutus}
              className="absolute inset-0 w-full h-full object-cover"
              loop
              // muted // Mute the video for autoplay to work
              playsInline
              controls
              loading="lazy" // Lazy loading enabled
            ></video>
          </div>
        </div>

        {/* new code */}
        <div className="bg-white flex flex-col items-center mb-4 p-3">
          <h2 className="md:text-4xl text-xl  text-center font-bold text-gray-800 mb-8">
            Exceptional quality. End-to-end service. Delighted customers
          </h2>
          <div className="flex md:mt-10 md:mb-0 mb-4 md:h-[230px] flex-col md:flex-row border rounded-3xl shadow-lg overflow-hidden max-w-6xl mx-auto">
            {/* Image Section */}
            <div className="flex-[1] h-36 md:h-auto">
              <img
                src={solarPanel2}
                alt="solarPanel1"
                className="h-full w-full object-cover"
                loading="lazy" // Lazy loading enabled
              />
            </div>

            {/* Text Section */}
            <div
              className="flex-[2] text-white bg-red-900 p-6 transition-all duration-500 ease-in-out group 
    "
            >
              <h2 className="text-2xl font-bold mb-2">
                Environmental Responsibility
              </h2>

              <p className="">
                At SolarArk, we are pioneers in the solar energy revolution,
                dedicated to providing innovative, cost-effective and sustainable
                solar solutions to homes, businesses and industries across the
                globe. We believe that renewable energy is the key to building a
                brighter, more sustainable future, and we are committed to
                delivering clean, reliable energy solutions that reduce carbon
                footprints and promote environmental responsibility.
              </p>

              <div></div>
            </div>
          </div>
          {/* card 2 */}
          <div className="flex md:mt-10 md:h-[230px] flex-col md:flex-row border rounded-3xl shadow-lg overflow-hidden max-w-6xl mx-auto">
            {/* Image Section */}
            <div className="flex-[1] h-36 md:h-auto">
              <img
                src={solarPanel3}
                alt="solarPanel1"
                className="h-full w-full object-cover"
                loading="lazy" // Lazy loading enabled
              />
            </div>

            {/* Text Section */}
            <div
              className="flex-[2] text-white bg-red-900 p-6 transition-all duration-500 ease-in-out group 
    "
            >
              <h2 className="text-2xl font-bold mb-2">Solar Systems</h2>

              <p className="">
                With a focus on quality, efficiency, and customer satisfaction, we
                ensure that each solar solution is tailored to the unique needs of
                our clients. Whether you're looking to reduce your home’s energy
                costs, transition your business to renewable power or implement
                large-scale solar systems in industrial facilities, SolarArk is
                here to guide you every step of the way.With cutting-edge
                technology and a commitment to sustainability.
              </p>

              <div></div>
            </div>
          </div>
        </div>
        {/* wave section */}
        <div className="relative">
          <h1 className="text-center font-bold text-2xl my-5 md:hidden">
            Our Journey
          </h1>

          <div className="sticky top-0 z-10 mobile-curve mb-6 bg-white flex justify-center items-center gap-4">
            {/* SVG Wave Path (hidden on mobile) */}
            <svg
              className="absolute inset-0 w-full h-full hidden md:block"
              viewBox="0 0 240 50"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 25 
                    C 20 5, 40 45, 60 25 
                    C 80 5, 70 45, 120 25 
                    C 140 5, 160 45, 180 15 
                    C 200 5, 220 45, 240 25"
                fill="transparent"
                stroke="rgba(0, 0, 0, 0.8)"
                strokeWidth="0.4"
                strokeDasharray="1, 2"
              />
            </svg>

            {/* Icons */}
            <div className="h-full mb-8 flex w-full flex-col md:flex-row justify-around md:px-8 items-center">
              {/* Icon 1 */}
              <div className="flex flex-col items-center md:mb-8 mb-6">
                <img
                  src={logo}
                  alt=""
                  loading="lazy" // Lazy loading enabled
                />
                <p className="mt-2 text-center text-sm font-bold">2020</p>
                <p className="font-bold text-center p-2">
                  Solarark Projects Began
                </p>
              </div>

              {/* Icon 2 */}
              <div className="flex flex-col items-center md:mb-0">
                <img
                  src={logo1}
                  alt=""
                  loading="lazy" // Lazy loading enabled
                />
                <p className="mt-2 text-center text-sm font-medium">2021</p>
                <p className="font-bold text-center p-2">575 Home Solarised</p>
              </div>

              {/* Icon 3 */}
              <div className="flex flex-col items-center md:mb-0">
                <img
                  src={logo2}
                  alt=""
                  loading="lazy" // Lazy loading enabled
                />
                <p className="mt-2 text-center text-sm font-medium">2022</p>
                <p className="font-bold text-center p-2">
                  2230 Home Solarised, 100+ Commercial Businesses, 50+ Housing
                  Societies
                </p>
              </div>

              <div className="flex flex-col items-center md:mb-0">
                <img
                  src={logo3}
                  alt=""
                  loading="lazy" // Lazy loading enabled
                />
                <p className="mt-2 text-center text-sm font-medium">2023</p>
                <p className="font-bold text-center p-2">5000+ Happy Customers</p>
              </div>

              {/* Icon 4 */}
              <div className="flex flex-col items-center">
                <img
                  src={logo4}
                  alt=""
                  loading="lazy" // Lazy loading enabled
                />
                <p className="mt-2 text-center text-sm font-medium">2024</p>
                <p className="font-bold text-center p-2">
                  Established Branches at Akola, Chh. Sambhaji Nagar & Wardha
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* </div> */}
        <div className="bg p-3 mt-5 hidden sm:block">
          <h2 className="text-4xl text-center font-bold mt-6">Our Journey</h2>
          <div className="h-[410px] w-full md:h-auto">
            <img
              src={ourjourny}
              alt=""
              className="bg w-full h-full object-cover"
              loading="lazy" // Lazy loading enabled
            />
          </div>
        </div>

        {/* journuy */}
        <BookingForm />
    </>
  );
};

export default About;
