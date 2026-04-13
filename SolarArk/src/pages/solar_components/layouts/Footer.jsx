import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import solarlogo from "../../../assets/images/solarlogo.png";
import { MapPin } from "lucide-react"; // Importing location icon
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const cityAddresses = {
    Amravati: "Address - MIRA SADAN, HOUSE NO. 27 A, Krushnarpan Colony, Amravati, Maharashtra, 444605",
    Sambhajinagar:
      "Address - Near Saptapadi Mangal Karyalaya Road,H.No. 49R.-29,Baliram Patil School Road, Chh. Sambhajinagar",
    Wardha:
      "Address - C/o Kishore Surkar, Infront Of Amit Tailors, Near Dr.Mehre Clinic Near Arts  Collage Road, Arvi Naka, Wardha",
    Akola: "Address - JMD Market Shop No-30, Civil Line Road, Akola",
  };

  const cards = [
    {
      id: 1,
      location: "Amravati",
      link: "https://maps.app.goo.gl/FK9sqXNY8zyFHa3u8?g_st=com.google.maps.preview.copy",
    },
    {
      id: 2,
      location: "Sambhajinagar",
      link: "https://maps.app.goo.gl/Pq2hdcG6mxMkFemNA?g_st=com.google.maps.preview.copy",
    },
    {
      id: 3,
      location: "Wardha",
      link: "https://maps.app.goo.gl/NYn9uV4GPCubTQeNA?g_st=com.google.maps.preview.copy",
    },
  ];

  // Get city names
  const cities = Object.keys(cityAddresses);

  const handleCityClick = (city) => {
    setSelectedCity(selectedCity === city ? null : city);
  };

  const handleLocation = (city) => {
    // Find city link from cards array
    const cityData = cards.find((card) => card.location === city);
    if (cityData?.link) {
      window.open(cityData.link, "_blank"); // ✅ Open link in new tab
    } else {
      alert("Location not found!"); // If no link exists
    }
  };
  return (
    <footer>
      <div className="bg-white py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 lg:flex lg:justify-between text-gray-600">
          {/* Logo and About Section */}
          <div className="mb-6 lg:mb-0 lg:w-1/4">
            <div className="flex items-center  text-center justify-center mb-4">
              <img src={solarlogo} alt="Logo" className="h-15 w-60" />
            </div>
            <p className="mt-4 text-sm  text-center justify-center">
              We Utilize The Latest Advancements In Solar Technology To Deliver
              Performance And Durability.
            </p>

            {/* Follow Us Section - Mobile Only */}
            <div className="block lg:hidden mt-6 lg:mb-0 mb-6  text-center justify-center">
              <h2 className="font-semibold md:ml-[30px]  mx-5 mb-4">
                Follow us on
              </h2>
              <div className="flex text-3xl text-red-900 space-x-4  text-center justify-center">
                <a
                  href="https://www.linkedin.com/company/solarark-projects-pvt-ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-700 transition-all duration-300"
                >
                  <FaLinkedin className="cursor-pointer" />
                </a>
                <a
                  href="https://www.instagram.com/solararkprojects?igsh=MTY5Ym80dzVhY2NpMQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-700 transition-all duration-300"
                >
                  <FaInstagram className="cursor-pointer" />
                </a>
                <a
                  href="https://www.facebook.com/share/14NHEr6jSD/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-700 transition-all duration-300"
                >
                  <FaFacebook className="cursor-pointer" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links and Contact Us Section */}
          <div className="flex flex-col lg:flex-row w-full quick-link quick-contact lg:mb-0">
            {/* Quick Links Section */}
            <div className="w-full lg:w-1/2 text-center lg:ml-[20px] lg:mt-0 lg:text-left lg:mb-0">
              <h2 className="font-semibold text-gray-800 mb-4">Quick Links</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/about" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="/solar_calculator" className="hover:underline">
                    Solar Calculator
                  </a>
                </li>
                <li>
                  <a href="/services" className="hover:underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="/earnwithus" className="hover:underline">
                    Earn with us
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="text-sm text-gray-500 hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-sm text-gray-500 hover:underline">
                    Terms & Condition
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-sm">
                <strong>Phone No.</strong>
                <br />
                7080909590
              </p>
              {/* <div className="mt-4 text-sm">
                <p>
                  <strong>Head Office</strong> - {""}
                  <a
                    href={locations[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:font-bold hover:underline"
                  >
                    {locations[0].name}
                  </a>
                </p>
                {locations.slice(1).map((location, index) => (
                  <p key={index}>
                    <a
                      href={location.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:font-bold"
                    >
                      {location.name}
                    </a>
                  </p>
                ))}
              </div> */}

              {/* new */}
              <div className="city space-y-3 mt-5 text-lg text-gray-700">
                {/* Head Office - Amravati */}
                <ul>
                  <li key={cities[0]} className="text-left flex flex-col gap-1">
                    <div className="flex gap-2 items-center">
                      <span>
                        <FaLocationDot className="mt-1 cursor-pointer text-red-900" />
                      </span>
                      <strong>Head Office</strong> - <span>{cities[0]}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {cityAddresses[cities[0]]}
                    </p>
                  </li>
                </ul>

                {/* Other Cities */}
                <ul className="space-y-3">
                  {cities.slice(1).map((city) => (
                    <li key={city} className="text-left flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <span>
                          <FaLocationDot className="mt-1 cursor-pointer text-red-900" />
                        </span>
                        <span>{city}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {cityAddresses[city]}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              {/* new */}
            </div>
          </div>

          <div className="lg:w-1/4 desktop-follow  text-center justify-center">
            <h2 className="font-semibold text-gray-800 mb-4 md:mr-[30px]">
              Follow us on
            </h2>
            <div className="flex text-3xl text-red-900 space-x-4  text-center justify-center">
              <a
                href="https://www.linkedin.com/company/solarark-projects-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d67a7a] transition-all duration-300"
              >
                <FaLinkedin className="cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com/solararkprojects/?igsh=MTY5Ym80dzVhY2NpMQ%3D%3D#"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#d67a7a] transition-all duration-300"
              >
                <FaInstagram className="cursor-pointer" />
              </a>
              <a
                href="https://www.facebook.com/solararkprojects"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center hover:text-[#d67a7a] transition-all duration-300"
              >
                <FaFacebook className="cursor-pointer" />
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 last mt-8  border-t border-gray-200 pt-4 text-sm  justify-center text-gray-500">
          <div className="flex footer-link space-x-4 mb-4 md:mb-0"></div>
          <p className="text-center">
            Copyright © 2025 SolarArk, India, All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
