import React, { useState, useRef } from "react";
import project1 from "../../../assets/images/project1.jpg";
import project2 from "../../../assets/images/project2.jpg";
import project3 from "../../../assets/images/project3.jpg";
import project4 from "../../../assets/images/project4.jpg";
import project5 from "../../../assets/images/project5.jpg";
import project6 from "../../../assets/images/project6.jpg";
import project7 from "../../../assets/images/project7.jpg";
import project8 from "../../../assets/images/project8.jpg";
import project9 from "../../../assets/images/project9.jpg";
import project10 from "../../../assets/images/project10.jpg";
import earnwithus11 from "../../../assets/images/v1.mov";
import earnwithus12 from "../../../assets/images/v2.mov";
import earnwithus13 from "../../../assets/images/v3.mov";
import earnwithus14 from "../../../assets/images/v4.mov";
import earnwithus15 from "../../../assets/images/v5.mov";
import earnwithus16 from "../../../assets/images/v6.mov";
import BookingForm from "../Index/BookingForm";
import { Helmet } from 'react-helmet';


const OurProjects = () => {
  return (
    <>
      <Helmet>
        <title>thesolarark.com | Our Projects | Solar Ark</title>
        <meta
          name="description"
          content="Powering a Sustainable Future with Solar Ark India | Mission - Solar Ark's mission extends beyond projects. Our efforts revolve around nurturing awareness about sustainable living practices, inspiring individuals to make eco-conscious choices. | Vision - Empowering Communities, Illuminating Futures: Solar Ark's Vision for a Sustainable India At Solar Ark, we envision a future where every corner of India is bathed in the glow of ustainable energy, where communities thrive in harmony with nature, and where innovation and tradition converge to create a brighter tomorrow. Our vision is to lead the charge towards a renewable energy revolution, empowering communities across India to harness the abundant power of the sun and other sustainable resources. We see a nation where clean energy is not just a choice, but a way of life ingrained in the fabric of society."
        />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="Solar Ark" />
        <meta name="robots" content="index, follow" />
        {/* Fallback Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Solar Ark | Our Projects" />
        <meta property="og:url" content="https://thesolarark.com/" />

      </Helmet>
      <div className="relative h-40 lg:bg-gradient-to-b  lg:from-black lg:to-white mobile-header"></div>
      <div className="min-h-screen bg-white-100">
        <div>
          {/* <h1 className="text-center text-2xl md:text-5xl font-semibold px-2 md:py-3">
            Our Projects
          </h1> */}
          <h2 className="md:text-4xl text-2xl text-center font-bold text-gray-800 mb-8">
            Our Projects
          </h2>
        </div>

        <div className="grid grid-cols-1  md:mt-10 mt-3 sm:grid-cols-2 md:grid-cols-3 gap-6 py-4 px-4 md:px-6 lg:px-10">
          {/* First Column */}
          <div className="space-y-6">
            <img
              src={project1}
              className="mx-auto w-full aniamte-pulse h-[300px] object-cover transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg mb-6"
              alt="Pune Project"
            />
            <img
              src={project2}
              className="mx-auto w-full h-[300px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg"
              alt="Solar Panel Project"
            />
            <img
              src={project9}
              className="mx-auto w-full h-[300px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg mb-6"
              alt="Solar Panel Project"
            />
            <img
              src={project7}
              className="mx-auto w-full h-[300px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg mb-6"
              alt="Solar Panel Project"
            />
          </div>

          {/* Second Column */}
          <div className="space-y-6">
            <img
              src={project3}
              className="mx-auto w-full h-[300px] transition-transform duration-300 hover:scale-105 object-cover shadow-lg rounded-lg mb-6"
              alt="Solar Panel Project"
            />
            <img
              src={project4}
              className="mx-auto w-full h-[300px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg"
              alt="Pune Project"
            />
            <img
              src={project8}
              className="mx-auto w-full h-[300px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg"
              alt="Aurangabad Project"
            />
          </div>

          {/* Third Column */}
          <div className="space-y-6">
            <img
              src={project5}
              className="mx-auto w-full h-[300px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg mb-6"
              alt="Solar Panel Project"
            />
            <img
              src={project10}
              className="mx-auto w-full h-[300px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg"
              alt="Aurangabad Project"
            />
            <img
              src={project6}
              className="mx-auto w-full h-[300px] transition-transform duration-300 hover:scale-105 shadow-lg rounded-lg"
              alt="Aurangabad Project"
            />
          </div>
        </div>

        {/* video */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 px-4 md:px-8 lg:px-10 md:py-10 lg:py-14 py-5">
          <div className="relative flex flex-col justify-between h-[320px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={earnwithus13}
              loop
              playsInline
              controls="true"
              preload="metadata"
              loading="lazy" // Lazy loading enabled
            ></video>
          </div>

          <div className="relative flex flex-col justify-between h-[320px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={earnwithus12}
              loop
              playsInline
              controls="true"
              preload="metadata"
              loading="lazy" // Lazy loading enabled
            ></video>
          </div>

          <div className="relative flex flex-col justify-between h-[320px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={earnwithus11}
              loop
              playsInline
              controls="true"
              preload="metadata"
              loading="lazy" // Lazy loading enabled
            ></video>
          </div>
          <div className="relative flex flex-col justify-between h-[320px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={earnwithus14}
              loop
              playsInline
              controls="true"
              preload="metadata"
              loading="lazy" // Lazy loading enabled
            ></video>
          </div>
          <div className="relative flex flex-col justify-between h-[320px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={earnwithus15}
              loop
              playsInline
              controls="true"
              preload="metadata"
              loading="lazy" // Lazy loading enabled
            ></video>
          </div>
          <div className="relative flex flex-col justify-between h-[320px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={earnwithus16}
              loop
              playsInline
              controls="true"
              preload="metadata"
              loading="lazy" // Lazy loading enabled
            ></video>
          </div>
        </div>

        {/* video */}
      </div>
      <BookingForm />
    </>
  );
};

export default OurProjects;
