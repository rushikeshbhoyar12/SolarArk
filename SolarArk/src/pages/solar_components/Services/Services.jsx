import React, { useState, useRef, useEffect } from "react";
import services12 from "../../../assets/images/commercial11.png";
import services11 from "../../../assets/images/services11.jpg";
import housingsociety from "../../../assets/images/housingsystem.png";
import client1 from "../../../assets/images/client 1.mp4";
import homes22 from "../../../assets/images/homes22.jpg";
import { Carousel } from "react-bootstrap";
import BookingForm from "../Index/BookingForm";
import installation from "../../../assets/images/install.jpeg";
import cleaning from "../../../assets/images/cleanning2.jpeg";
import proactive from "../../../assets/images/mentainance.jpeg";
import online from "../../../assets/images/Onlinemonitoring.jpg";
import gukks from "../../../assets/images/fin .jpeg";

import {Helmet} from 'react-helmet';



const Services = () => {

    const [firstCardIndex, setFirstCardIndex] = useState(0);
    const [secondCardIndex, setSecondCardIndex] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
    const videoRef = useRef(null);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const [index, setIndex] = useState(0);
    const [startIndex, setStartIndex] = useState(0);


    const settings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        autoplay: true,
        autoplaySpeed: 3000,
        beforeChange: (_, next) => setActiveIndex(next),
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    // card
    const [visibleCards, setVisibleCards] = useState([]);

    useEffect(() => {
        const timers = [
            setTimeout(() => setVisibleCards((prev) => [...prev, 0]), 500), // First card appears at 0.5s
            setTimeout(() => setVisibleCards((prev) => [...prev, 1]), 1500), // Second card appears at 1.5s
        ];

        return () => timers.forEach(clearTimeout); // Cleanup on unmount
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (!videoElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    videoElement.play().catch((error) => console.log("Autoplay failed:", error));
                } else {
                    videoElement.pause();
                }
            },
            { threshold: 0.5 } // Start when 50% of the video is visible
        );

        observer.observe(videoElement);

        return () => observer.unobserve(videoElement);
    }, []);

    const textData = [
        {
            title: "SolarArk",
            description:
                "Discover the future of energy with SolarArk’s advanced solar panel systems. We offer reliable, affordable, and efficient solar solutions designed to reduce your energy expenses and help the planet.",
        },
        {
            title: "Sustainable Energy",
            description:
                "Join the renewable energy revolution with SolarArk. Our mission is to provide clean, green, and cost-effective solar solutions for a better tomorrow.",
        },
        {
            title: "Efficient Solutions",
            description:
                "We optimize solar panel efficiency to maximize your energy savings. Harness the power of the sun with SolarArk’s innovative technology.",
        },
        {
            title: "Efficient Solutions",
            description:
                "We optimize solar panel efficiency to maximize your energy savings. Harness the power of the sun with SolarArk’s innovative technology.",
        },
    ];


    useEffect(() => {
        const interval = setInterval(() => {
            setFirstCardIndex(secondCardIndex);
            setSecondCardIndex((prevIndex) =>
                prevIndex === textData.length - 1 ? 0 : prevIndex + 1
            );
        }, 3000); // Change text every 3 seconds

        return () => clearInterval(interval);
    }, [secondCardIndex]);

    const handleNext = () => {
        setStartIndex((prevIndex) => (prevIndex + 1) % textData.length);
    };

    const handlePrev = () => {
        setStartIndex((prevIndex) => (prevIndex - 1 + textData.length) % textData.length);
    };
    useEffect(() => {
        const interval = setInterval(handleNext, 3000);
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);


    return (
        <>
        <Helmet>
        <title>thesolarark.com | Services | Solar Ark</title>
        <meta
          name="description"
          content="Powering a Sustainable Future with Solar Ark India | Discover the future of energy with SolarArk’s advanced solar panel systems. We offer reliable, maintainable, affordable, and efficient solar solutions designed to reduce your energy expenses and help the planet. Harness the power of solar energy with SolarArk’s cutting-edge solar panel technology. Whether you're a homeowner or a business, we deliver customized, cost-effective solutions that provide clean, sustainable energy for years to come. Join the green energy revolution with SolarArk! Our state-of-the-art solar panel systems are engineered to maximize efficiency and durability, ensuring long-term savings on your electricity bills. With our expert team guiding you through every step, from consultation to installation, more sustainable energy source."
        />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="Solar Ark" />
        <meta name="robots" content="index, follow" />
        {/* Fallback Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Solar Ark | Services  " />
        <meta property="og:url" content="https://thesolarark.com/" />

      </Helmet>
            <div className="relative h-40 lg:bg-gradient-to-b lg:from-black lg:to-white mobile-header"></div>

            <div className="bg-white flex flex-col items-center md:py-6">
                <h2 className="md:text-4xl text-2xl text-center font-bold text-gray-800 mb-8">
                    Our Services
                </h2>
                <div className="mb-3 md:my-6 grid solution-content grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl px-4">
                    {/* Service 1 */}
                    <div
                        className="relative flex flex-col justify-between h-[300px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden transition bg-cover bg-center"
                        style={{ backgroundImage: `url(${homes22})` }}
                    >
                        {/* Gradient Overlay – Always Visible */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-800 via-transparent to-transparent z-0 opacity-100 transition-opacity duration-300"></div>

                        {/* Content Section – Always Visible */}
                        <div className="flex flex-col justify-end p-2 flex-grow relative opacity-100 transition-opacity duration-300 z-0">
                            <a
                                href="/homes"
                                className="lg:text-3xl md:text-2xl text-2xl font-semibold text-white mb-2"
                            >
                                Homes
                            </a>
                            <p className="text-white bg-gradient-to-t from-red-800 via-transparent to-transparent z-0">
                                Custom-designed solar systems for homeowners to reduce energy bills and increase sustainability, ensuring clean energy independence.
                            </p>
                        </div>
                    </div>


                    {/* Service 2 */}
                    <div
                        className="relative flex flex-col justify-between h-[300px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden transition bg-cover bg-center"
                        style={{ backgroundImage: `url(${housingsociety})` }}
                    >
                        {/* Gradient Overlay – always visible */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-800 via-transparent to-transparent z-0 opacity-100 transition-opacity duration-300"></div>

                        {/* Content Section – always visible */}
                        <div className="flex flex-col justify-end p-2 flex-grow relative opacity-100 transition-opacity duration-300 z-0">
                            <a
                                href="/housing"
                                className="lg:text-3xl md:text-2xl text-2xl font-semibold text-white mb-2"
                            >
                                Housing Society
                            </a>
                            <p className="text-white bg-gradient-to-t from-red-800 via-transparent to-transparent z-0">
                                Efficient solar energy solutions for entire housing communities, promoting collective sustainability and energy savings for residents.
                            </p>
                        </div>
                    </div>

                    {/* Service 3 */}
                    <div
                        className="relative flex flex-col justify-between h-[300px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden transition bg-cover bg-center"
                        style={{ backgroundImage: `url(${services12})` }}
                    >
                        {/* Gradient Overlay – always visible */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-800 via-transparent to-transparent z-0 opacity-100 transition-opacity duration-300"></div>

                        {/* Content Section – always visible */}
                        <div className="flex flex-col justify-end p-2 flex-grow relative opacity-100 transition-opacity duration-300 z-0">
                            <a
                                href="/commercial"
                                className="lg:text-3xl md:text-2xl text-2xl font-semibold text-white mb-2"
                            >
                                Commercial
                            </a>
                            <p className="text-white bg-gradient-to-t from-red-800 via-transparent to-transparent z-0">
                                Tailored solar installations for businesses that reduce operational costs and enhance environmental responsibility, optimizing energy usage.
                            </p>
                        </div>
                    </div>


                    {/* Service 4 */}
                    <div
                        className="relative flex flex-col justify-between h-[300px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden transition bg-cover bg-center"
                        style={{ backgroundImage: `url(${services11})` }}
                    >
                        {/* Gradient Overlay (always visible) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-800 via-transparent to-transparent z-0 opacity-100 transition-opacity duration-300"></div>

                        {/* Content Section (always visible) */}
                        <div className="flex flex-col justify-end p-2 flex-grow relative opacity-100 transition-opacity duration-300 z-0">
                            <a
                                href="/industries"
                                className="lg:text-3xl md:text-2xl text-2xl font-semibold text-white mb-2"
                            >
                                Industrials
                            </a>
                            <p className="text-white bg-gradient-to-t from-red-800 via-transparent to-transparent z-0">
                                Large-scale solar systems for industrial facilities, designed to
                                significantly cut energy expenses while boosting long-term operational
                                efficiency.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
            {/* Third Section */}
            <div className="container mx-auto px-4 md:py-8 max-w-6xl">
                <div className="grid h-full grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    {/* First Column with Video */}
                    <div className="flex flex-col justify-center">
                        <h2 className="text-xl md:text-4xl md:text-start text-center font-semibold mb-2 text-gray-800">
                            90% of customers recommend us <br /> to use SolarARK
                        </h2>
                        <p className="mb-2 font-bold md:text-start text-center">
                            Central India's top companies choose SolarARK
                        </p>
                        <div className="relative w-full h-[350px] flex items-center">
                            <video
                                src={client1}
                                className="rounded-lg w-full h-full object-cover"
                                loop
                                playsInline
                                controls
                            ></video>
                        </div>
                    </div>

                    {/* Second Column with Text (Slightly Lower) */}
                    <div className="flex flex-col justify-center">
                        <div className="relative bg-red-900 rounded-lg md:py-6 px-6 h-full flex py-3 flex-col justify-center md:mt-[7.5rem]">
                            <h3 className="text-lg md:text-2xl text-white font-semibold mb-2">
                                SolarArk
                            </h3>
                            <p className="text-white">
                                Discover the future of energy with SolarArk’s advanced solar panel systems. We offer reliable, maintainable, affordable, and efficient solar solutions designed to reduce your energy expenses and help the planet. Harness the power of solar energy with SolarArk’s cutting-edge solar panel technology. Whether you're a homeowner or a business, we deliver customized, cost-effective solutions that provide clean, sustainable energy for years to come. Join the green energy revolution with SolarArk! Our state-of-the-art solar panel systems are engineered to maximize efficiency and durability, ensuring long-term savings on your electricity bills. With our expert team guiding you through every step, from consultation to installation, more sustainable energy source.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* card section */}

            <div className="container mx-auto flex justify-center md:mb-12 px-3">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 place-items-center">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow text-center">
                        <div className="p-4">
                            <h4 className="mb-2 text-2xl font-bold text-gray-900">Solar Panel Cleaning Service</h4>
                            <p className="mb-3 text-gray-700">Regular cleaning enhances efficiency by removing dust, debris, and bird droppings, ensuring maximum sunlight absorption for optimal performance.</p>

                        </div>
                        <img className="rounded-b-lg mx-auto h-[230px] object-cover w-full" src={cleaning} alt=""
                            loading="lazy"  // Lazy loading enabled
                        />
                    </div>
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow text-center">
                        <div className="p-4">
                            <h4 className="mb-2 text-2xl font-bold text-gray-900">Online Monitoring</h4>
                            <p className="mb-3 text-gray-700">Track your solar system’s performance in real time with our advanced online monitoring tools, helping you optimize energy usage and detect issues instantly.</p>

                        </div>
                        <img className="rounded-b-lg mx-auto h-[230px] object-cover w-full" src={online} alt=""
                            loading="lazy"  // Lazy loading enabled
                        />
                    </div>
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow text-center">
                        <div className="p-4">
                            <h4 className="mb-2 text-2xl font-bold text-gray-900">Proactive System Maintenance</h4>
                            <p className="mb-3 text-gray-700">We provide regular system check-ups and preventive maintenance to ensure consistent energy output and extend the lifespan of your solar panels</p>

                        </div>
                        <img className="rounded-b-lg mx-auto h-[230px] object-cover w-full" src={proactive} alt=""
                            loading="lazy"  // Lazy loading enabled
                        />
                    </div>
                </div>


            </div>
            <div className="flex justify-center mb-5 px-3">
                <div className="flex flex-col md:flex-row justify-center items-center gap-5">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow text-center">
                        <div className="p-4">
                            <h4 className="mb-2 text-2xl font-bold text-gray-900">Installation & Commissioning</h4>
                            <p className="mb-3 text-gray-700">
                                Our expert team ensures a seamless solar panel installation, from site assessment to system activation, following industry best practices for safety and efficiency.
                            </p>
                        </div>
                        <img className="rounded-b-lg mx-auto h-[230px] object-cover w-full" src={installation} alt=""
                            loading="lazy"  // Lazy loading enabled
                        />
                    </div>

                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow text-center">
                        <img className="rounded-t-lg mx-auto" src="/docs/images/blog/image-1.jpg" alt=""
                            loading="lazy"  // Lazy loading enabled
                        />
                        <div className="p-4">
                            <h4 className="mb-2 text-2xl font-bold text-gray-900">Solar Financing</h4>
                            <p className="mb-3 text-gray-700">
                                We offer flexible financing options to make solar energy affordable, including EMI plans, government subsidies, and leasing models to suit your budget.
                            </p>
                        </div>
                        <img className="rounded-b-lg mx-auto h-[230px] object-cover w-full" src={gukks} alt=""
                            loading="lazy"  // Lazy loading enabled
                        />
                    </div>
                </div>
            </div>



            <BookingForm />
        </>
    );
};

export default Services;
