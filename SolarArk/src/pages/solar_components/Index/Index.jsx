import React, { useState, useEffect, useRef } from "react";
import { IoLocationOutline, IoRocketOutline } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { FaLink, FaRegLightbulb } from "react-icons/fa";
import { IoIosCloudOutline } from "react-icons/io";
import { IoIosLink } from "react-icons/io";
import { LuLightbulb } from "react-icons/lu";

// import HomeIcon from "../../../assets/images/home.png";
// import LocationIcon from "../../../assets/images/5.png";
// import IndustryIcon from "../../../assets/images/industry.png";
// import CommercialIcon from "../../../assets/images/Frame.png";
import Malani1 from "../../../assets/images/Malani1.jpg";
import solarpanel2 from "../../../assets/images/amravati.jpg";
import index11 from "../../../assets/images/index11.jpg";
import client2 from "../../../assets/images/client22.mp4";
import homepagevideo from "../../../assets/images/homepage1.mp4";
import client1 from "../../../assets/images/client 1.mp4";
import client3 from "../../../assets/images/client33.mp4";
import client4 from "../../../assets/images/SolarPanels.mp4";
import { GrLocation } from "react-icons/gr";
import { BiHome } from "react-icons/bi";
import Image1 from "../../../assets/images/img1.png";
import Image2 from "../../../assets/images/meher icons (2).png";
import Image3 from "../../../assets/images/img3.png";
import Image4 from "../../../assets/images/img4.png";
// import busimage from "../../../assets/images/bus.png";
// import { LiaIndustrySolid } from "react-icons/lia";
import { LuBuilding2 } from "react-icons/lu";
import { PiBuildingsBold } from "react-icons/pi";
import CountUp from "react-countup";
import BookingForm from "./BookingForm";

const testimonials = [
  {
    video: client2,
  },
  {
    video: client1,
  },
  {
    video: client3,
  },
];

const Index = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlides, setCurrentSlides] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openQuestion, setOpenQuestion] = useState(null);
  const [mobileSlide, setMobileSlide] = useState(0);
  const homepage = `${import.meta.env.BASE_URL}assets/solar_images/homepage.mp4`;
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const [inView, setInView] = useState(false);
  const countUpRef = useRef(null);
  const [showText, setShowText] = useState(false); // Initially hidden
  // video on scroll

  // Use images from the public folder using import.meta.env.BASE_URL
  const slides = [
    `${import.meta.env.BASE_URL}assets/solar_images/newslide1.png`,
    `${import.meta.env.BASE_URL}assets/solar_images/newslide2.png`,
    `${import.meta.env.BASE_URL}assets/solar_images/newslide3.png`,
  ];

  const steps = [
    {
      step: "Step",
      subtitle: "Step 1",
      title: "Initial Consultation",
      description:
        "We begin with an in-depth consultation to assess your energy needs, property, and goals, ensuring we tailor a solar solution that suits you perfectly.",
    },
    {
      step: "Step",
      subtitle: "Step 2",
      title: "Site Assessment & Custom Design",
      description:
        "Detailed site inspection and customizes a solar system designed specifically for your property needs.",
    },
    {
      step: "Step",
      subtitle: "Step 3",
      title: "Proposal & Agreement",
      description:
        "Receive a comprehensive proposal outlining the system, costs, and installation timeline, followed by a clear agreement for the project.",
    },
    {
      step: "Step",
      subtitle: "Step 4",
      title: "Installation Preparation",
      description:
        "We handle all pre-installation arrangements, from scheduling to equipment procurement, ensuring a smooth and efficient process.",
    },
    {
      step: "Step",
      subtitle: "Step 5",
      title: "Installation",
      description:
        "Our expert installers set up your solar system with precision and care, ensuring optimal performance and aesthetic appeal.",
    },
    {
      step: "Step",
      subtitle: "Step 6",
      title: "System Testing",
      description:
        "After installation, we thoroughly test the system to ensure everything is working efficiently and meets our quality standards.",
    },
    {
      step: "Step",
      subtitle: "Step 7",
      title: "Activation & Training",
      description:
        "We activate your system and provide training, helping you understand its features and maximizing your benefits.",
    },
    {
      step: "Step",
      subtitle: "Step 8",
      title: "Post-Installation Support",
      description:
        "Our support doesn't stop at installation. We offer ongoing maintenance and support for a seamless solar experience.",
    },
  ];

  // const nextSlide = () => {
  //     setCurrentSlide((prevSlide) => (prevSlide + 1) % Math.ceil(steps.length / 4));
  // };

  const StepCard = ({ step, subtitle, title, description }) => (
    <div className="text-left bg-[#7A1D15] text-white rounded-lg p-2 my-2 shadow-2xl">
      <div className="flex items-center justify-center text-xs lg:text-sm text-[#FFD1B9] mb-2">
        <span className="bg-[#b14727db]  rounded-full w-3 h-3 flex items-center justify-center mr-2">
          {step.split(" ")[1]}
        </span>
        <span className="flex-grow border-t border-[#FFD1B9] mx-2"></span>
      </div>
      <h3 className="lg:my-7 my-2">{subtitle}</h3>
      <h1 className="text-lg lg:text-xl font-bold mb-2 h-[50px]">{typeof title === 'string' ? title : (title?.props?.children || title)}</h1>
      <p className="text-sm lg:text-base text-[#FFD1B9] h-[100px]">{typeof description === 'string' ? description : (description?.props?.children || description)}</p>
    </div>
  );

  const toggleQuestion = (question) => {
    setOpenQuestion(openQuestion === question ? null : question);
  };
  const faqs = [
    {
      question: "How much can I save with solar energy?",
      answer:
        "Savings depend on your energy consumption, system size, and electricity rates. On average, solar users can reduce their electricity bills by 50-90%.",
    },
    {
      question: "What is the cost of installing a solar power system?",
      answer:
        "The cost varies based on system size, panel type, and installation complexity. We offer free consultations to provide a customized quote.",
    },
    {
      question: "What financing options are available for solar installation?",
      answer:
        "We offer various financing options, including bank loans, EMI plans.",
    },
    {
      question: "Do solar panels require maintenance?",
      answer:
        "Solar panels require minimal maintenance. Regular cleaning and an annual check-up help ensure optimal performance.",
    },
    {
      question: "How do I monitor my solar system’s performance?",
      answer:
        "Most modern solar systems come with monitoring apps on your phone  like Enphase Enlighten, Growatt Shine  that allow you to track energy generation and usage in real time.",
    },
    {
      question: "How much space do I need for solar panels?",
      answer:
        "The space required depends on your energy needs and panel efficiency. Typically, a 1 kW system requires around 100 sq. ft. of shadow-free space.",
    },
  ];
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause(); // Stop previous video
      videoRef.current.load(); // Reset video to ensure it starts from the beginning
      videoRef.current.play(); // Play new video
    }
  }, [testimonialIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlides(
        (prevSlide) => (prevSlide + 1) % Math.ceil(steps.length / 4)
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // bus
  useEffect(() => {
    // Set up the intersection observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Check if the element is in view
        if (entry.isIntersecting) {
          setInView(true);
          // Unobserve the element after it has been detected
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    // Start observing the target element
    if (countUpRef.current) {
      observer.observe(countUpRef.current);
    }

    // Clean up the observer on component unmount
    return () => {
      if (countUpRef.current) {
        observer.unobserve(countUpRef.current);
      }
    };
  }, []);

  // bus
  useEffect(() => {
    // Optional: Add auto-slide functionality (e.g., every 5 seconds)
    const interval = setInterval(() => {
      setMobileSlide((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const cards = [
    {
      id: 1,
      src: solarpanel2,
      location: "Amravati",
      // link: "/ourprojects",
    },
    {
      id: 2,
      src: index11,
      location: "Sambhajinagar",
      // link: "/ourprojects",
    },
    {
      id: 3,
      src: Malani1,
      location: "Wardha",
      // link: "/ourprojects",
    },
  ];
  const videos = [
    { src: client4, alt: "Video 1" },
    // { src: client3, alt: "Video 2" },
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

  // video on scroll

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true); // Show after 3 seconds
    }, 8000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <>
      <div className="relative w-full h-screen">
        {/* Background Video */}
        <div className="absolute w-full inset-0 z-0">
          <video
            src={homepagevideo}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          ></video>
        </div>

        {/* Carousel Overlay Content - Appears After Delay */}
        {showText && (
          <div className="absolute inset-0 pt-48 carousel-text bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white transition-opacity duration-1000 ease-in-out">
            <h1 className="text-2xl md:text-5xl font-bold">
              Embracing Sustainable
            </h1>
            <h1 className="text-2xl md:text-5xl font-bold">
              Living with <span className="text-[#c66459d4]">SolarArk</span>
            </h1>
            <p className="mt-6 text-sm md:text-xl text-gray-300">
              Welcome to SolarArk, your friend on the journey towards living
              with renewable energy.
            </p>
            <p className="text-sm md:text-xl text-gray-300">
              As advocates for environment, we aim to empower communities to
              embrace eco-friendly
            </p>
            <p className="text-sm md:text-xl text-gray-300">
              practices and renewable energy solutions
            </p>
            <a
              href="/contact"
              className="mt-8 bg-[#c66459d4] text-white py-3 px-6 rounded-md"
            >
              Get a quote
            </a>
          </div>
        )}
      </div>

      {/* Services */}
      <div className="py-14 bg-white services min-h-[400px]">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-black">
            Our <span className="text-red-900">Services</span>
          </h2>
        </div>
        <div className="mt-8 service-content grid grid-cols-1 md:grid-cols-4 gap-9 px-4 md:px-16 min-h-[200px]">
          <div className="p-8 bg-white shadow-lg  text-center border border-gray-400">
            <div className="flex justify-center mb-4">
              <div className="text-6xl solar-colour">
                <BiHome />
                {/* <img src={HomeIcon} className="" alt="" /> */}
              </div>
            </div>
            <a href="/services" className="text-2xl font-semibold text-black">
              Homes
            </a>
            <div className="mt-4 w-16 mx-auto border-b-2 border-red-900"></div>
          </div>
          <div className="p-8 bg-white shadow-lg  text-center border border-gray-400">
            <div className="flex justify-center mb-4">
              <div className="text-6xl solar-colour">
                <GrLocation className="" />
                {/* <img src={LocationIcon} className="w-[200px]" alt="" /> */}
              </div>
            </div>
            <a href="/services" className="text-2xl font-semibold text-black">
              Housing Society
            </a>
            <div className="mt-4 w-16 mx-auto border-b-2 border-red-900"></div>
          </div>
          <div className="p-8 bg-white shadow-lg  text-center border border-gray-400">
            <div className="flex justify-center mb-4">
              <div className="text-6xl solar-colour">
                <PiBuildingsBold />
                {/* <img src={IndustryIcon} className="" alt="" /> */}
              </div>
            </div>
            <a href="/services" className="text-2xl font-semibold text-black">
              Industrial
            </a>
            <div className="mt-4 w-16 mx-auto border-b-2 border-red-900"></div>
          </div>
          <div className="p-8 bg-white shadow-lg  text-center border border-gray-400">
            <div className="flex justify-center mb-4">
              <div className="text-6xl solar-colour">
                <LuBuilding2 />
                {/* <img src={CommercialIcon} className="" alt="" /> */}
              </div>
            </div>
            <a href="/services" className="text-2xl font-semibold text-black">
              Commercial
            </a>
            <div className="mt-4 w-16 mx-auto border-b-2 border-red-900"></div>
          </div>
        </div>
      </div>

      {/* Solutions */}
      <div className="bg-[#f9ebe5] flex flex-col items-center py-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Why <span className="text-red-900">Choose Us</span>
        </h2>
        <div className="grid solution-content grid-cols-2 md:grid-cols-5 gap-6 max-w-7xl px-4 ">
          {/* Innovative Technology */}
          <div className="rounded-lg  shadow-lg p-6 flex flex-col items-center border border-gray-400 relative overflow-hidden hover:bg-red-900 hover:text-white transition">
            <h3 className="lg:text-3xl self-start md:text-1xl font-semibold mb-4 ">
              Smart Tech
            </h3>
            <p className="mb-6">
              We leverage cutting-edge solar technology to deliver
              high-performance, durable products.
            </p>
            <IoRocketOutline className="text-4xl absolute bottom-4 right-4 transition group-hover:text-white" />
          </div>
          {/* Expert Team */}
          <div className="rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-400 relative overflow-hidden hover:bg-red-900 hover:text-white transition">
            <h3 className="lg:text-3xl md:text-1xl font-semibold mb-4 self-start">
              Skilled Team
            </h3>
            <p className="mb-6">
              {" "}
              Our expert team ensures exceptional results with their deep
              knowledge and reliable service.
            </p>
            <LuLightbulb className="text-4xl  absolute bottom-4 right-4 transition group-hover:text-white" />
          </div>

          {/* Sustainability Focus */}
          <div className="rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-400 relative overflow-hidden hover:bg-red-900 hover:text-white transition">
            <h3 className="lg:text-3xl md:text-1xl self-start font-semibold mb-4">
              Eco Focus
            </h3>
            <p className="mb-6">
              We prioritize sustainability, reducing our carbon footprint and
              promoting eco-friendly practices.
            </p>
            <IoIosCloudOutline className="text-4xl  absolute bottom-4 right-4 transition group-hover:text-white" />
          </div>
          {/* Customer-Centric Approach */}
          <div className="rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-400 relative overflow-hidden hover:bg-red-900 hover:text-white transition">
            <h3 className="lg:text-3xl md:text-1xl self-start font-semibold mb-4 ">
              Client Care
            </h3>
            <p className="mb-6">
              We focus on our clients, delivering personalized solutions and
              exceptional support.
            </p>
            <IoIosLink className="text-4xl  absolute bottom-4 right-4 transition group-hover:text-white" />
          </div>
          {/* 24/7 Support */}
          <div className="rounded-lg shadow-lg p-6 flex flex-col items-center border border-gray-400 relative overflow-hidden hover:bg-red-900 hover:text-white transition">
            <h3 className="lg:text-3xl md:text-1xl self-start font-semibold mb-4 ">
              24/7 Support
            </h3>
            <p className="mb-6">
              Our dedicated team is available around the clock to assist you.
            </p>
            <MdSupportAgent className="text-4xl absolute bottom-4 right-4 transition group-hover:text-white" />
          </div>
        </div>
      </div>

      {/* project */}
      {/* Project */}
      <div className="bg-white md:py-12 sm:py-0 h-full">
        <h2 className="text-4xl font-bold text-center md:mb-8 mb-4 mt-3">
          Our <span className="text-red-900">Projects</span>
        </h2>

        {/* Main Container for Flex Layout */}
        <div className="flex main-flex h-full flex-row gap-1 p-4">
          {/* First Column: Two Side-by-Side Images and Text */}
          <div className="flex flex-wrap">
            {/* Two Side-by-Side Images */}
            <div className="container mx-auto md:my-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    className={`flex flex-col items-center justify-between transition-transform duration-300 ${hoveredId === card.id
                      ? "scale-105"
                      : hoveredId
                        ? "scale-90"
                        : "scale-100"
                      } `}
                    onMouseEnter={() => setHoveredId(card.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div className="relative overflow-hidden rounded-lg h-64 w-full">
                      <img
                        src={card.src}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-300"
                        loading="lazy" // Lazy loading enabled
                      />
                      {/* Location Overlay */}
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-2 rounded-md flex items-center gap-2">
                        <IoLocationOutline className="text-red-500" />
                        {/* <span className="text-sm font-medium">
                          {card.location}
                        </span> */}
                        {/* <a href="/ourprojects" className="text-sm font-medium">
                          {card.location}
                        </a> */}
                        <a
                          href="/ourprojects"
                          // target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium"
                        >
                          {card.location}
                        </a>
                        <span className="ml-auto text-lg">→</span>
                      </div>
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="text-lg font-bold">{card.title}</h3>
                      <p className="text-gray-600">{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Third Image (Pune) */}

            {/* Text Below Images */}
            <div className="md:mx-5">
              <p className="text-gray-600 desktop-text md:text-xl text-sm">
                We’ve successfully completed solar projects for homes,
                businesses, and remote areas, reducing energy costs and carbon
                emissions. Our key achievement is powering over 5000 homes and
                businesses with clean, sustainable energy, driving the adoption
                of renewable solutions.
              </p>
              <a
                href="#consultant"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  document
                    .getElementById("footer")
                    .scrollIntoView({ behavior: "smooth" });
                }}
                className="cursor-pointer inline-block mt-4 desktop-button bg-red-900 text-white text-lg font-semibold py-2 px-4 rounded-md"
              >
                Get Free Consultation
              </a>
            </div>

            <div className="mobile-only">
              <p className="text-gray-600 mobile-text">
                We've successfully completed solar projects for homes and
                businesses, and remote areas, reducing energy costs and carbon
                emissions. Our key achievement is powering over 500 homes and
                businesses with clean, sustainable energy, driving the adoption
                of renewable solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center my-5 mx-auto md:hidden">
          <a
            href="#"
            className="bg-red-900 text-white text-sm font-semibold py-2 px-4 rounded-md"
          >
            Get Free Consultation
          </a>
        </div>
      </div>
      {/* moving bus */}
      <div className="bg-[#ce786fd4] flex flex-col py-12">
        <div className="container flex justify-center items-center">
          {/* Right Column - Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Icon 1 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  src={Image1}
                  alt="Commercial Project Icon"
                  className="w-20 h-20 imgpanel2"
                  loading="lazy" // Lazy loading enabled
                />
              </div>
              <div ref={countUpRef}>
                <p className="mt-2 text-center text-red-900 md:text-2xl font-medium">
                  {inView && (
                    <CountUp start={0} end={5000} duration={2} separator="," />
                  )}
                  +
                </p>
              </div>
              <p className="font-bold text-red-900">Home Solarized</p>
            </div>

            {/* Icon 2 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  src={Image2}
                  alt="Years Icon"
                  className="w-20 h-20"
                  loading="lazy" // Lazy loading enabled
                />
              </div>
              <p className="mt-2 text-center md:text-2xl text-red-900 font-medium">
                {inView && (
                  <CountUp start={0} end={10} duration={2} separator="," />
                )}
                +
              </p>
              <p className="font-bold text-red-900">Years Of Experience</p>
            </div>

            {/* Icon 3 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  src={Image3}
                  alt="Installation Experience Icon"
                  className="w-20 h-20"
                  loading="lazy" // Lazy loading enabled
                />
              </div>
              <p className="mt-2 text-center text-red-900 md:text-2xl font-medium">
                {inView && (
                  <CountUp start={0} end={100} duration={2} separator="," />
                )}
                + MW
              </p>
              <p className="font-bold text-red-900">Installation</p>
            </div>

            {/* Icon 4 */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 flex items-center justify-center">
                <img
                  src={Image4}
                  alt="Savings Icon"
                  className="w-20 h-20"
                  loading="lazy" // Lazy loading enabled
                />
              </div>
              <p className="mt-2 text-center text-red-900 md:text-2xl font-medium">
                {inView && (
                  <CountUp start={0} end={15} duration={2} separator="," />
                )}
                + Crore
              </p>
              <p className="font-bold text-red-900">Subsidy Distributed</p>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
      {/* Testimonial */}
      <div className="w-full md:h-[500px] h-[400px] flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold text-center md:mb-8 mb-4 mt-3">
          Our <span className="text-red-900">Testimonials</span>
        </h2>
        <div className="relative flex items-center justify-center">
          {/* Previous Button */}
          <button
            className="lg:px-4 lg:py-2 p-2 m-4 text-gray-600 border border-gray-600 rounded-md hover:bg-red-900 hover:text-white transition"
            onClick={() => {
              setTestimonialIndex(
                (testimonialIndex - 1 + testimonials.length) %
                testimonials.length
              );
            }}
          >
            &lt;
          </button>

          {/* Video Display */}
          <video
            key={testimonials[testimonialIndex].video} // Ensures only one video plays at a time
            src={testimonials[testimonialIndex].video}
            controls
            className="mx-auto max-w-[72%] sm:max-w-none md:w-[700px] md:h-[300px] sm:w[500px] rounded-lg object-cover"
            loading="lazy" // Lazy loading enabled
          />

          {/* Next Button */}
          <button
            className="m-4 lg:px-4 lg:py-2 p-2 text-gray-600 border border-gray-600 rounded-md hover:bg-red-900 hover:text-white transition"
            onClick={() => {
              setTestimonialIndex((testimonialIndex + 1) % testimonials.length);
            }}
          >
            &gt;
          </button>
        </div>

        {/* Video Title and Description */}
        <h3 className="mt-4 lg:text-2xl font-bold text-[#7A1D15] text-center">
          {testimonials[testimonialIndex].name}
        </h3>
        <p className="my-2 text-gray-600 text-center">
          {testimonials[testimonialIndex].address}
        </p>

        {/* Dots for Testimonial */}
        <div className="mt-4 flex justify-center space-x-2">

          {testimonials.map((_, idx) => (
            <div
              key={idx}
              className={`w-3 h-1 rounded-full ${testimonialIndex === idx ? "bg-red-900" : "bg-gray-400"
                }`}
            />
          ))}
        </div>
      </div>
      <BookingForm />
      {/* Different */}
      <div className="relative bg-[white] text-center py-10 text-white">
        {/* Top angled shape */}
        <div
          className="top-design"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "300px",
            height: "100px",
            backgroundColor: "rgba(186,89,89,0.871)",
            borderBottomLeftRadius: "40px",
            clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderTopLeftRadius: "170px",
          }}
        ></div>

        <div className="bg-[#7A1D15] p-8 lg:p-16 rounded-lg text-white max-w-8xl mx-auto text-center">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4">
            Our Process of Installation
          </h2>
          <p className="text-md lg:text-base mb-8">
            At SolarArk, We Pride Ourselves On Delivering A Seamless And
            Efficient Installation Process For Your Solar System.
          </p>

          {/* Desktop Carousel */}
          <div className="hidden lg:flex justify-center items-center overflow-hidden relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlides * 100}%)` }}
            >
              {/* Divide steps into groups of 4 for each slide */}
              {Array.from({ length: Math.ceil(steps.length / 4) }, (_, i) => (
                <div key={i} className="flex min-w-full gap-4 px-4">
                  {steps.slice(i * 4, i * 4 + 4).map((step, index) => (
                    <div key={index} className="w-1/4">
                      <StepCard
                        step={step.step}
                        subtitle={step.subtitle}
                        title={step.title}
                        description={step.description}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Stacked Layout */}
          <div className="flex md:hidden w-full transition-transform overflow-hidden">
            {steps.map((step, index) => (
              <div
                key={index}
                className="min-w-full max-[100%] pb-5"
                style={{
                  transform: `translateX(-${mobileSlide * 100}%)`,
                  opacity: index === mobileSlide ? "1" : "0",
                  visibility: index === mobileSlide ? "visible" : "hidden",
                  transition: "0.3s ease-in-out all",
                }}
              >
                <StepCard
                  step={step.step}
                  subtitle={step.subtitle}
                  title={step.title}
                  description={step.description}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-center mobile-slide-buttons gap-2 mt-8">
            {Array.from({ length: Math.ceil(steps.length / 4) }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlides(index)}
                className={`w-3 h-3 rounded-full ${currentSlides === index
                  ? "bg-[rgba(186,89,89,0.871)]"
                  : "bg-[#FFD1B9]"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom angled shape */}
        <div
          className="bottom-design"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "300px",
            height: "80px",
            backgroundColor: "rgba(186,89,89,0.871)",
            borderTopRightRadius: "40px",
            clipPath: "polygon(0% 0%, 70% 0%, 102% 102%, 0% 100%)",
          }}
        ></div>
      </div>

      {/* Questioning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch p-4 md:p-8">
        {/* Video Carousel Section */}
        <div className="flex flex-col h-full">
          {/* Video Carousel */}
          <div className="relative h-full">
            <video
              src={videos[currentIndex].src}
              className="w-full h-full object-cover rounded-lg"
              loop
              playsInline
              controls
              preload="metadata"
              loading="lazy" // Lazy loading enabled
            ></video>
            {/* Previous Button */}
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            >
              &lt;
            </button>
            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
            >
              &gt;
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col justify-between h-full">
          <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-black">
            Got Questions? We Have Answers! <br />
            <span className="text-red-900 ml-2">Explore now</span>
          </h2>

          <div className="space-y-4 flex-grow flex flex-col justify-between">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer flex-grow"
              >
                <div
                  className="flex justify-between items-center font-semibold cursor-pointer"
                  onClick={() => toggleQuestion(index)}
                >
                  <span
                    className={
                      openQuestion === index
                        ? "text-[#7A1D15]"
                        : "text-gray-800"
                    }
                  >
                    {faq.question}
                  </span>
                  <span className="text-xl">
                    {openQuestion === index ? "-" : "+"}
                  </span>
                </div>
                {openQuestion === index && (
                  <p className="mt-2 text-gray-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Index;
