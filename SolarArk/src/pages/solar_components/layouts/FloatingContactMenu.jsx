import React, { useState } from "react";
import {
  FaPhone,
  FaSun,
  FaMapMarkerAlt,
  FaCalculator,
  FaTimes,
  FaLink,
  FaWhatsapp
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FloatingContactMenu = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/solar_calculator");
  };

  return (
    <>
      {/* Desktop Floating Menu - Icon only, expands on hover */}
      <div className="hidden lg:flex fixed bottom-10 right-4 flex-col items-end space-y-3">
        {/* Contact Us Button */}
        <div
          className={`text-white bg-red-900 hover:bg-red-950 p-3 rounded-l-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer ${hoveredItem === "contact" ? "w-auto px-4" : "w-12"
            }`}
          onMouseEnter={() => setHoveredItem("contact")}
          onMouseLeave={() => setTimeout(() => setHoveredItem(null), 300)}
          title="Contact Us"
          style={{ zIndex: 50 }}
        >
          <FaPhone className="text-xl flex-shrink-0" />
          {hoveredItem === "contact" && (
            <a href="/contact" className="ml-2 text-white no-underline whitespace-nowrap">
              Contact Us
            </a>
          )}
        </div>

        {/* WhatsApp Button */}
        <div
          className={`text-white bg-red-900 hover:bg-red-950 p-3 rounded-l-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer ${hoveredItem === "contact2" ? "w-auto px-4" : "w-12"
            }`}
          onMouseEnter={() => setHoveredItem("contact2")}
          onMouseLeave={() => setTimeout(() => setHoveredItem(null), 300)}
          title="WhatsApp Us"
          style={{ zIndex: 50 }}
        >
          <FaWhatsapp className="text-xl flex-shrink-0" />
          {hoveredItem === "contact2" && (
            <a
              href="https://wa.me/7080909590"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-white no-underline whitespace-nowrap"
            >
              WhatsApp Us
            </a>
          )}
        </div>

        {/* Solar Calculator Button */}
        <div
          className={`text-white bg-red-900 hover:bg-red-950 p-3 rounded-l-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer ${hoveredItem === "solar" ? "w-auto px-4" : "w-12"
            }`}
          onMouseEnter={() => setHoveredItem("solar")}
          onMouseLeave={() => setTimeout(() => setHoveredItem(null), 300)}
          title="Solar Calculator"
          style={{ zIndex: 50 }}
        >
          <FaCalculator className="text-xl flex-shrink-0" />
          {hoveredItem === "solar" && (
            <a href="/solar_calculator" className="ml-2 text-white no-underline whitespace-nowrap">
              Solar Calculator
            </a>
          )}
        </div>

        {/* Locate Us Button */}
        <div
          className={`text-white bg-red-900 hover:bg-red-950 p-3 rounded-l-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer ${hoveredItem === "locate" ? "w-auto px-4" : "w-12"
            }`}
          onMouseEnter={() => setHoveredItem("locate")}
          onMouseLeave={() => setTimeout(() => setHoveredItem(null), 300)}
          title="Locate Us"
          style={{ zIndex: 50 }}
        >
          <FaMapMarkerAlt className="text-xl flex-shrink-0" />
          {hoveredItem === "locate" && (
            <a href="/contact" className="ml-2 text-white no-underline whitespace-nowrap">
              Locate Us
            </a>
          )}
        </div>
      </div>

      {/* Mobile Menu at Bottom */}
      <div className="lg:hidden fixed bottom-0 w-full flex justify-center items-center bg-transparent z-50">
        <div className="w-full flex justify-around bg-red-600 text-white py-3">
          <button
            className="flex flex-col items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaLink className="mb-1" />
            <span>Quick Links</span>
          </button>
          <button className="flex flex-col items-center" onClick={handleClick}>
            <FaCalculator className="mb-1" />
            <a href="/solar_calculator">Solar Calculator</a>
          </button>
        </div>

        {/* Drop-up Content for Quick Links */}
        {isOpen && (
          <div className="fixed bottom-16 w-full bg-red-900 text-white py-4 rounded-t-lg z-50">
            <div className="text-center relative">
              <button
                className="absolute right-4 top-2 text-white"
                onClick={() => setIsOpen(false)}
              >
                <FaTimes />
              </button>
              <div className="py-2 border-b border-white">
                <FaPhone className="inline mr-2" />
                <a href="/contact">Contact Us</a>
              </div>
              <div className="py-2 border-b border-white">
                <FaMapMarkerAlt className="inline mr-2" />
                <a href="/contact">Locate Us</a>
              </div>
              <div className="py-2">
                <FaSun className="inline mr-2" />
                <a href="/earnwithus">Suryamitra</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FloatingContactMenu;
