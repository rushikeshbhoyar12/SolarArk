import React, { useEffect, useState, useRef } from "react";
import earn11 from "../../../assets/images/Suryamitra.jpg";
import solarPanel4 from "../../../assets/images/solar-power-power-station.jpg";
// import { FaCheckCircle } from "react-icons/fa";
import { FaCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
//import pune from "../../../assets/images/pune.jpg";
import earnwithus1 from "../../../assets/images/earnwithus1.mp4";
import earnwithus2 from "../../../assets/images/earnwithus2.mp4";
import { FaQuoteLeft, FaQuoteRight, FaAngleUp } from "react-icons/fa";
import City from "../../../assets/images/city-bg.png";
import Director from "../../../assets/images/Director.jpg";
import { Helmet } from 'react-helmet';
import axios from "axios";
import Swal from "sweetalert2";



const EarnWithUs = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",

    });

    const [errors, setErrors] = useState({});

    // Validation Function
    const validateForm = () => {
        let newErrors = {};

        if (formData.fullName.trim().length < 3) {
            newErrors.fullName = "Full Name must be at least 3 characters.";
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
        }



        if (formData.address.trim() === "") {
            newErrors.address = "Address cannot be empty.";
        }


        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value || "" });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await axios.post(`${BASE_URL}/api/earnwithus`, formData);
                // axios.post("http://localhost:5800/api/earnwithus", formData)

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
                setFormData({
                    fullName: "",
                    email: "",
                    phoneNumber: "",
                    address: "",
                });

            } catch (error) {
                console.error("Error submitting form:", error);
                Swal.fire("Error", "Failed to submit form. Try again!", "error");
            }
        } else {
            Swal.fire("Validation Error", "Please fix the errors in the form.", "warning");
        }
    };


    useEffect(() => {
        const handleUserInteraction = () => {
            if (videoRef.current) {
                videoRef.current.play().catch(error => {
                    console.warn("Autoplay prevented:", error);
                });
            }
            document.removeEventListener("click", handleUserInteraction);
        };

        document.addEventListener("click", handleUserInteraction);

        return () => {
            document.removeEventListener("click", handleUserInteraction);
        };
    }, []);


    const videos = [

        // { src: `${process.env.PUBLIC_URL}/assets/solar_videos/newslide3.png`, alt: 'Solar Panel 3' },
        { src: earnwithus1 }, // Replace with your video URLs
        { src: earnwithus2 },
    ];

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? videos.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === videos.length - 1 ? 0 : prevIndex + 1
        );
    };



    useEffect(() => {
        const elements = document.querySelectorAll('.fade-in');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible'); // Add 'visible' class
                        observer.unobserve(entry.target); // Stop observing after it's visible
                    }
                });
            },
            { threshold: 0.1 } // Adjust threshold for when to trigger animation
        );

        elements.forEach((el) => observer.observe(el));

        return () => {
            elements.forEach((el) => observer.unobserve(el));
        };
    }, []);
    return (
        <>
            <Helmet>
                <title>thesolarark.com | Earn With Us | Solar Ark</title>
                <meta
                    name="description"
                    content="Powering a Sustainable Future with Solar Ark India | The Surya Mitra program, an initiative by SolarARK, aims to bring solar rooftops to every home and empower individuals to contribute to a greener planet. This campaign creates a network of enthusiastic individuals, business owners, and entrepreneurs to promote solar energy solutions while fostering self-reliance and entrepreneurship."
                />
                <meta name="theme-color" content="#000000" />
                <meta name="author" content="The Solar Ark" />
                <meta name="robots" content="index, follow" />
                {/* Fallback Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Solar Ark | Earn With Us " />
                <meta property="og:url" content="https://thesolarark.com/" />

            </Helmet>
            <div className="relative h-screen ">
                {/* Carousel */}
                <div className="absolute  inset-0 z-0">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/solar_images/newslide1.png`}

                        alt="Slide"
                        className="w-full h-full object-cover"
                        loading="lazy"  // Lazy loading enabled
                    />
                </div>
                {/* Carousel Overlay Content */}
                <div className="absolute inset-0 pt-48 carousel-text bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white">
                    <h1 className="text-4xl md:text-4xl font-bold">
                        Welcome to <span className="text-[#c66459d4]">SolarArk</span>
                    </h1>
                    <h1 className="text-4xl md:text-4xl font-bold">
                        Empowering Communities with Solar Energy
                    </h1>
                    <p className="mt-6 text-md  text-gray-300">
                        The Surya Mitra program, an initiative by SolarARK, aims to bring
                        solar rooftops to every home and empower individuals to contribute
                        to a greener planet.
                    </p>
                    <p className="text-md text-gray-300">
                        This campaign creates a network of enthusiastic individuals,
                        business owners, and entrepreneurs to promote solar energy solutions
                    </p>
                    <p className="text-md  text-gray-300">
                        while fostering self-reliance and entrepreneurship.
                    </p>
                    <a
                        href="#earnwith"
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default anchor behavior
                            document.getElementById("earnwith").scrollIntoView({ behavior: "smooth" });
                        }}

                        className="cursor-pointer mt-8 bg-[#c66459d4] text-white py-3 px-6 rounded-md"
                    >
                        Earn With Us
                    </a>
                </div>
            </div>

            {/* who can join */}
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center px-4 sm:px-6 lg:px-12 py-8 sm:py-12 lg:py-20 bg-white gap-8">
                {/* Image Section */}
                <div className="flex justify-center fade-in">
                    <div className="w-72 sm:w-96 lg:w-[500px] h-48 sm:h-60 lg:h-[280px] rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={earn11}
                            alt="Solar Panel"
                            className="object-cover w-full h-full rounded-lg"
                            loading="lazy"  // Lazy loading enabled
                        />
                    </div>

                </div>

                {/* Text Content Section */}
                <div className="text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Who can <span className="text-red-900">join?</span>
                    </h2>
                    <p className="text-gray-600 font-bold mb-6">
                        Anyone passionate about making a difference can become a Surya
                        Mitra, including:
                    </p>
                    <div className="grid grid-cols-1 gap-4 mb-8">
                        <div className="flex items-center gap-x-2 flex-wrap">
                            <FaCircle className="md:text-[8px] text-[9px] text-red-900 flex-shrink-0" />
                            <span className="text-sm">Electricians, plumbers, and AC fitters</span>
                        </div>
                        <div className="flex items-center gap-x-2 flex-wrap">
                            <FaCircle className="md:text-[8px] text-[9px] text-red-900 flex-shrink-0" />
                            <span className="text-sm">Shopkeepers, students, and travel agents</span>
                        </div>
                        <div className="flex items-center gap-x-2 flex-wrap">
                            <FaCircle className="md:text-[8px] text-[9px] text-red-900 flex-shrink-0" />
                            <span className="text-sm">Grocery store owners, cable operators & more!</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* how to join */}
            <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-16 py-8 sm:py-12 lg:py-20 bg-red-900 space-y-8 lg:space-y-0 lg:space-x-8">
                {/* Text Content */}
                <div className="lg:w-1/2 fade-in text-white text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        How to <span className="text-[#ec9a91d4]">join?</span>
                    </h2>
                    <p className="text-white font-bold mb-6">
                        Register today with simple documents like an ID card, photo, and bank details.
                        Upon joining, receive a welcome kit with:
                    </p>

                    {/* List Items */}
                    <div className="space-y-4">
                        {[
                            "A welcome letter, pen, and flyers.",
                            "Branding materials like posters & visiting cards.",
                            "Access to exclusive training and workshops.",
                            "Digital marketing support, and incentives.",
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-x-2 flex-wrap">
                                <FaCircle className="text-[#ec9a91d4] md:text-[8px] text-[9px] flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Image Section */}
                <div className="relative fade-in flex justify-center items-center w-full lg:w-1/2">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <img
                            src={solarPanel4}
                            alt="Solar Panel"
                            className="object-cover fade-in w-[500px] h-full rounded-lg"
                            loading="lazy"  // Lazy loading enabled
                        />
                    </div>
                </div>
            </div>
            {/* join us */}
            <div className="relative p-3 bg-white text-center md:mt-2">
                <div className="flex justify-center items-center">
                    {/* Left Quote */}
                    <FaQuoteLeft className="text-red-900 w-10 h-10 mr-8" />

                    {/* Text */}
                    <p className="text-center text-sm p-2 font-semibold mb-2 md:text-2xl text-gray-700">
                        Join us in illuminating the world with the power of solar energy.
                        Together, <br /> we can make a difference, one panel at a time.
                    </p>

                    {/* Right Quote */}
                    <FaQuoteRight className="text-red-900 w-10 h-10 ml-8" />
                </div>
                <div className="flex justify-center items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 items-center sm:my-9 sm:p-4 w-[700px]">
                        {/* Image */}
                        <img src={Director} alt="Placeholder" className="rounded-lg" loading="lazy" />

                        {/* Text */}
                        <div>
                            <h3 className="text-xl font-semibold sm:my-3 justify-start text-red-900">
                                Shrikant Tikhile
                            </h3>
                            <p className="text-black-600 font-bold justify-start">
                                Director, SolarARK
                            </p>
                        </div>
                    </div>
                </div>
                <img src={City} alt="" className="" loading="lazy" />
            </div>
            {/* new section */}
            <div>
                <div className="container mt-5 mb-5 md:my-7 mx-auto p-3">
                    <div className="text-center mb-6 font-bold md:text-4xl text-2xl">
                        Benefits of Joining the{" "}
                        <span className="text-red-900">Suryamitra Network</span>
                    </div>

                    {/* <!-- First Column: Grid Layout --> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8  mt-10 md:my-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            {/* Video 1 */}
                            <div className="w-full">
                                <video
                                    src={earnwithus1}
                                    ref={videoRef}
                                    className="object-cover w-full h-[300px] rounded-lg shadow-lg"
                                    loop
                                    playsInline
                                    controls
                                    loading="lazy"  // Lazy loading enabled
                                ></video>
                            </div>

                            {/* Video 2 */}
                            <div className="w-full">
                                <video
                                    src={earnwithus2}
                                    className="object-cover w-full h-[300px] rounded-lg shadow-lg"
                                    loop
                                    // muted
                                    playsInline
                                    controls
                                    loading="lazy"  // Lazy loading enabled
                                ></video>
                            </div>
                        </div>




                        {/* <!-- Right Column: Text Content --> */}
                        <div className="flex flex-col justify-center p-3">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">Monetary Incentives</h3>
                                <p>Earn commissions for every successful lead you provide.</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">Training and Support</h3>
                                <p>Regular webinars, meetings, and training on solar trends.</p>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">Marketing Tools</h3>
                                <p>
                                    Access to digital campaigns, branding materials, and financial
                                    tie-up support.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-2">Community Engagement</h3>
                                <p>
                                    Join WhatsApp groups and participate in monthly schemes and
                                    webinars.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            {/* contact form */}
            <div
                id="earnwith"
                className="relative flex items-center justify-center  bg-red-800"
            >
                <div className="absolute inset-0">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/solar_images/form.avif`}
                        alt="Background"
                        className="object-cover w-full h-full"
                        loading="lazy"  // Lazy loading enabled
                    />
                    <div className="absolute inset-0 bg-red-900 opacity-90"></div>
                </div>

                <div className="relative z-10 w-full max-w-screen-lg px-6 sm:px-8 py-8 sm:py-12 rounded-lg shadow-lg">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white">
                        Fill Out This Form
                    </h1>
                    <p className="mt-2 text-center text-gray-200 text-xl sm:text-base">
                        Connect with us to explore better career opportunities and
                    </p>
                    <p className="text-center text-gray-200 text-xl sm:text-base">
                        accelerate your professional growth.
                    </p>
                    {/* form */}
                    <form className="mt-6 sm:mt-8 space-y-4" onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name="fullName"
                                    className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.fullName && <p className="text-red-100 text-sm">{errors.fullName}</p>}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.email && <p className="text-red-100 text-sm">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Phone Number"
                                    name="phoneNumber"
                                    className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.phoneNumber && <p className="text-red-100 text-sm">{errors.phoneNumber}</p>}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Address"
                                    name="address"
                                    className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.address && <p className="text-red-100 text-sm">{errors.address}</p>}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-2/3 py-2 get-consultation-btn text-center lg:ms-36 btncolor rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EarnWithUs;
