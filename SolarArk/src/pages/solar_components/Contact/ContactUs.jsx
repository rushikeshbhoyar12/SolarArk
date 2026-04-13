import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import solarpanel from "../../../assets/images/solar-panel1.jpg";
import { FaLocationDot } from "react-icons/fa6";
import map from "../../../assets/images/map.png";
import Swal from "sweetalert2";
import { Helmet } from 'react-helmet';

const ContactUs = () => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [isBusMoved, setIsBusMoved] = useState(false); // State to track if the bus has moved fully
  const [inView, setInView] = useState(false);
  const countUpRef = useRef(null);
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

  const handleCityClick = (city) => {
    setSelectedCity(selectedCity === city ? null : city); // Toggle selection
  };

  const [formData2, setFormData2] = useState({
    name: "",
    email: "",
    companyName: "",
    whatsAppNumber: "",
    city: "",
    companyPinCode: "",
    averageElectricBill: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData2.name.trim()) tempErrors.name = "Name is required";
    if (!formData2.email.trim() || !/\S+@\S+\.\S+/.test(formData2.email))
      tempErrors.email = "Valid email is required";
    if (!formData2.companyName.trim())
      tempErrors.companyName = "Company Name is required";
    if (
      !formData2.whatsAppNumber.trim() ||
      !/^\d{10}$/.test(formData2.whatsAppNumber)
    ) {
      tempErrors.whatsAppNumber = "Valid 10-digit WhatsApp number is required";
    }
    if (!formData2.city.trim()) tempErrors.city = "City is required";
    if (
      !formData2.companyPinCode.trim() ||
      !/^\d{6}$/.test(formData2.companyPinCode)
    ) {
      tempErrors.companyPinCode = "Valid 6-digit pin code is required";
    }
    if (!formData2.averageElectricBill.trim())
      tempErrors.averageElectricBill = "Average Monthly Bill is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData2({ ...formData2, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (validate()) {
  //     try {
  //       const response = await axios.post(
  //         `${BASE_URL}/api/contactform`,
  //         formData2
  //       );
  //       // alert(response.data);
  //       alert(
  //         "Thank you for submitting the form.We will get back to you soon."
  //       );
  //       setFormData2({
  //         name: "",
  //         companyName: "",
  //         whatsAppNumber: "",
  //         city: "",
  //         companyPinCode: "",
  //         averageElectricBill: "",
  //       });
  //       setErrors({});
  //     } catch (error) {
  //       console.error("Error submitting form:", error);
  //       alert("Error submitting form");
  //     }
  //   } else {
  //     alert("Please fix the errors in the form.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await axios.post(`${BASE_URL}/api/contactform`, formData2);
        // axios.post("http://localhost:5800/api/contactform", formData2);
        // Show SweetAlert2 success popup
        Swal.fire({
          title: "Success!",
          text: "Thank you for submitting the form.We will get back to you soon.",
          icon: "success",
          showConfirmButton: true,
          timer: 2000, // Auto close after 2 seconds
          customClass: {
            popup: "custom-popup",
          },
        });

        // Reset the form
        setFormData2({
          name: "",
          email: "",
          companyName: "",
          whatsAppNumber: "",
          city: "",
          companyPinCode: "",
          averageElectricBill: "",
        });
        setErrors({});
      } catch (error) {
        console.error("Error submitting form:", error);
        Swal.fire("Error", "Failed to submit form. Try again!", "error");
      }
    } else {
      Swal.fire(
        "Validation Error",
        "Please fix the errors in the form.",
        "warning"
      );
    }
  };

  const [textIndex, setTextIndex] = useState(0);
  const [showBus, setShowBus] = useState(true);
  const sentence = "Central India's No. 1 Solar EPC Company";

  useEffect(() => {
    if (textIndex < sentence.length && showBus) {
      const interval = setInterval(() => {
        setTextIndex((prev) => prev + 1);
      }, 100); // Speed of letter animation
      return () => clearInterval(interval);
    } else if (textIndex === sentence.length) {
      // End bus animation after the sentence
      setTimeout(() => setShowBus(false), 1000); // Fade-out delay
    }
  }, [textIndex, showBus, sentence.length]);

  useEffect(() => {
    // After the bus has moved fully, hide the text
    const timer = setTimeout(() => {
      setIsBusMoved(true);
    }, 5000); // 5000ms corresponds to the bus movement duration

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  const handleLocation = (city) => {
    let selectedCard = cards.find((card) => card.location === city);

    if (selectedCard && selectedCard.link) {
      window.open(selectedCard.link, "_blank"); // Open Google Maps link in a new tab
    } else {
      alert("Location not found!");
    }
  };

  return (
    <>
      <Helmet>
        <title>thesolarark.com | Contact Us | Solar Ark</title>
        <meta
          name="description"
          content="Powering a Sustainable Future with Solar Ark India | Mission - Solar Ark's mission extends beyond projects. Our efforts revolve around nurturing awareness about sustainable living practices, inspiring individuals to make eco-conscious choices. | Vision - Empowering Communities, Illuminating Futures: Solar Ark's Vision for a Sustainable India At Solar Ark, we envision a future where every corner of India is bathed in the glow of ustainable energy, where communities thrive in harmony with nature, and where innovation and tradition converge to create a brighter tomorrow. Our vision is to lead the charge towards a renewable energy revolution, empowering communities across India to harness the abundant power of the sun and other sustainable resources. We see a nation where clean energy is not just a choice, but a way of life ingrained in the fabric of society."
        />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="The Solar Ark" />
        <meta name="robots" content="index, follow" />
        {/* Fallback Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Solar Ark | Contact Us " />
        <meta property="og:url" content="https://thesolarark.com/" />

      </Helmet>
      <div className="relative h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={solarpanel}
            alt="Slide"
            className="w-full h-full object-cover"
            loading="lazy" // Lazy loading enabled
          />
        </div>
        {/* Overlay Content Positioned Responsively */}
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex flex-col text-white px-12 pb-8 
      justify-center items-center md:justify-end"
        >
          <h1 className="m-0 text-4xl md:text-4xl font-bold text-center">
            India's top companies choose SolarArk
          </h1>
          <a
            href="#contactform"
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              document
                .getElementById("contactform")
                .scrollIntoView({ behavior: "smooth" });
            }}
            className="cursor-pointer mt-4 bg-red-900 text-white py-4 px-6 rounded-md"
          >
            Get A Quote
          </a>
        </div>
      </div>

      {/* moving bus */}
      <div className="flex justify-center bg-gray-100 items-center h-[100px] md:h-[150px]">
        {/* Centered Text */}
        <div className="text-center text-red-900 font-bold text-2xl sm:text-2xl md:text-3xl lg:text-5xl">
          {sentence}
        </div>
      </div>

      {/* moving bus */}
      {/* solar project */}

      {/* Find Us */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start px-6 lg:px-20 mt-5 mb-4 lg:py-0">
        {/* First Column */}
        <div className="lg:w-1/2 flex flex-col justify-start space-y-6 lg:order-first order-last">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            Where can you <span className="text-red-900">find us ?</span>
          </h2>
          <p className="md:text-xl text-sm text-gray-600">
            We Offer Solar Services Across Key Cities In Maharashtra, Providing
            Clean Energy Solutions To Homes And Business. Our Presence Is
            Growing Daily As We Continue <br /> To Expand Sustainable Energy
            Access Across The Region.
          </p>

          {/* click event */}
          <div className="city gap-5 flex space-x-3">
            <ul className="space-y-3 text-lg text-gray-700">
              {Object.keys(cityAddresses)
                .slice(0, 2)
                .map((city) => (
                  <li
                    key={city}
                    className="cursor-pointer text-left flex flex-col gap-1"
                    onClick={() => handleCityClick(city)}
                  >
                    <div className="flex gap-2 items-center">
                      <span
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents clicking city from triggering location click
                          handleLocation(city);
                        }}
                      >
                        <FaLocationDot className="mt-1 cursor-pointer text-red-900" />
                      </span>
                      <span>{city}</span>
                    </div>

                    {selectedCity === city && (
                      <p className="text-sm text-gray-500 mt-1">
                        {cityAddresses[city]}
                      </p>
                    )}
                  </li>
                ))}
            </ul>
            <ul className="space-y-3 text-lg text-gray-700 pl-5">
              {Object.keys(cityAddresses)
                .slice(2)
                .map((city) => (
                  <li
                    key={city}
                    className="cursor-pointer text-left flex flex-col gap-1"
                    onClick={() => handleCityClick(city)}
                  >
                    <div className="flex gap-2 items-center">
                      <span
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents city click from triggering location click
                          handleLocation(city);
                        }}
                      >
                        <FaLocationDot className="mt-1 cursor-pointer text-red-900" />
                      </span>
                      <span>{city}</span>
                    </div>

                    {selectedCity === city && (
                      <p className="text-sm text-gray-500 mt-1">
                        {cityAddresses[city]}
                      </p>
                    )}
                  </li>
                ))}
            </ul>
          </div>
          {/* click event */}
        </div>

        {/* Second Column - Image */}
        <div className="lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0">
          <img
            // src={`${process.env.PUBLIC_URL}/assets/images/map.png`}
            src={map}
            alt="City"
            className="max-w-full h-auto object-cover lg:max-h-full"
            loading="lazy" // Lazy loading enabled
          />
        </div>
      </div>

      {/* second section */}
      <div
        className="bg-red-900 flex flex-col items-center py-5"
        id="contactform"
      >
        <div className="grid solution-content grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl  px-5 ">
          <div className="p-6 flex flex-col justify-center md:text-start text-center  text-white  relative overflow-hidden">
            <h3 className="lg:text-4xl md:text-1xl text-2xl font-semibold mb-4 ">
              Submit
            </h3>
            <h3 className="lg:text-4xl md:text-1xl text-2xl font-semibold mb-4">
              <span className="text-[#eb9288d4]">
                A Solar Project <span className="text-white">Enquiry</span>
              </span>
            </h3>
            <p className=" mb-6">
              Our solar experts will guide you in your project
            </p>
          </div>

          {/* form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-lg md:px-6 p-3 px-2 py-4 flex flex-col bg-white relative overflow-hidden border transition"
          >
            <div className="mb-2">
              <label className="font-medium text-gray-700 block">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="name"
                value={formData2.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <span className="text-red-500">{errors.name}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="font-medium text-gray-700 block">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="email"
                onChange={handleChange}
                value={formData2.email}
                required
              />
              {errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="font-medium text-gray-700 block">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="companyName"
                onChange={handleChange}
                value={formData2.companyName}
                required
              />
              {errors.companyName && (
                <span className="text-red-500">{errors.companyName}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="font-medium text-gray-700 block">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="whatsAppNumber"
                onChange={handleChange}
                value={formData2.whatsAppNumber}
                required
              />
              {errors.whatsAppNumber && (
                <span className="text-red-500">{errors.whatsAppNumber}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="font-medium text-gray-700 block">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="city"
                value={formData2.city}
                onChange={handleChange}
                required
              />
              {errors.city && (
                <span className="text-red-500">{errors.city}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="font-medium text-gray-700 block">
                Company Pin Code
              </label>
              <input
                type="text"
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                name="companyPinCode"
                value={formData2.companyPinCode}
                onChange={handleChange}
                required
              />
              {errors.companyPinCode && (
                <span className="text-red-500">{errors.companyPinCode}</span>
              )}
            </div>
            <div className="mb-2">
              <label className="font-medium text-gray-700 block">
                Average Monthly Bill <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-2 w-full border border-gray-300 rounded-md px-4 py-1 focus:outline-none focus:ring-2 focus:ring-red-900 focus:border-red-900"
                name="averageElectricBill"
                value={formData2.averageElectricBill}
                onChange={handleChange}
                required
              />
              {errors.averageElectricBill && (
                <span className="text-red-500">
                  {errors.averageElectricBill}
                </span>
              )}
            </div>
            <div className="flex mt-2">
              <button className="btn text-left text-white bg-red-900 hover:bg-red-900 focus:outline-none">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
