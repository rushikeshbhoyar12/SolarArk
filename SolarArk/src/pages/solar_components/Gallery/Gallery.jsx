import React, { useState } from "react";
import BookingForm from "../Index/BookingForm";
import { Modal } from "react-bootstrap";
import { FaFolderOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
// Import images
import project1 from "../../../assets/images/2nd.jpeg";
import project2 from "../../../assets/images/8th.jpeg";
import project3 from "../../../assets/images/9th.jpeg";
import project4 from "../../../assets/images/gallery4.jpg";
import project5 from "../../../assets/images/5th.jpeg";
import project6 from "../../../assets/images/6th.jpeg";
import project7 from "../../../assets/images/gallery7.jpeg";
import project8 from "../../../assets/images/gallery8.jpeg";
import project9 from "../../../assets/images/gallery1.jpg";
import project10 from "../../../assets/images/gallery10.jpeg";
import project13 from "../../../assets/images/gallery13.jpeg";
import project14 from "../../../assets/images/gallery5.jpg";
import pro1 from "../../../assets/images/bharat1.jpg";
import pro2 from "../../../assets/images/bharat2.jpg";
import pro3 from "../../../assets/images/credai.jpeg";
import pro4 from "../../../assets/images/diwali.jpg";
import pro5 from "../../../assets/images/diwali2.jpg";
import pro6 from "../../../assets/images/lucky1.jpg";
import pro7 from "../../../assets/images/lucky3.jpg";
import pro8 from "../../../assets/images/lucky4.jpg";
import pro10 from "../../../assets/images/padwa.jpg";
import pro9 from "../../../assets/images/office.jpeg";
import pro11 from "../../../assets/images/mohv.jpeg";
import pro12 from "../../../assets/images/vish1.jpg";
import pro13 from "../../../assets/images/vish2.jpg";
import earnwithus1 from "../../../assets/images/s1.mp4";
import earnwithus2 from "../../../assets/images/s2.mp4";
import earnwithus3 from "../../../assets/images/s3.MOV";

// Folder data
const folders = [
    { id: 1, name: "Amravati Trade Fair", images: [project13] },
    { id: 2, name: "Bharatcon", images: [project1, pro1, pro2] },
    { id: 3, name: "Credai Expo", images: [project7, pro3] },
    { id: 4, name: "Diwali Sanjh", images: [project8, pro4, pro5] },
    { id: 5, name: "Lucky Draw", images: [project5, pro6, pro7, pro8] },
    { id: 6, name: "Office Celebration", images: [project10, project6, pro9] },
    { id: 7, name: "Padwa Pahat", images: [pro10] },
    { id: 8, name: "Sanksruti Mahotsav", images: [project2, pro11] },
    { id: 9, name: "Suryamitra Meet", images: [project3, project9, project14, project4] },
    { id: 10, name: "Vishvamanglya Event", images: [pro12, pro13] },
];

export const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const navigate = useNavigate();

    const openFolder = (folder) => {
        navigate(`/gallery/${folder.id}`, { state: { folder } });
    };

    return (
        <>
            <Helmet>
                <title> thesolarark.com  | Gallery | Solar Ark</title>
                <meta
                    name="description"
                    content="Powering a Sustainable Future with Solar Ark India | Mission - Solar Ark's mission extends beyond projects. Our efforts revolve around nurturing awareness about sustainable living practices, inspiring individuals to make eco-conscious choices. | Vision - Empowering Communities, Illuminating Futures: Solar Ark's Vision for a Sustainable India At Solar Ark, we envision a future where every corner of India is bathed in the glow of ustainable energy, where communities thrive in harmony with nature, and where innovation and tradition converge to create a brighter tomorrow. Our vision is to lead the charge towards a renewable energy revolution, empowering communities across India to harness the abundant power of the sun and other sustainable resources. We see a nation where clean energy is not just a choice, but a way of life ingrained in the fabric of society."
                />
                <meta name="theme-color" content="#000000" />
                <meta name="author" content="Solar Ark" />
                <meta name="robots" content="index, follow" />
                {/* Fallback Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Solar Ark | Gallery" />
                <meta property="og:url" content="https://thesolarark.com/" />

            </Helmet>
            <div className="relative h-40 lg:bg-gradient-to-b lg:from-black lg:to-white mobile-header"></div>
            <div className="md:p-6 py-1">
                {/* <h1 className="text-center text-3xl font-semibold mb-6">Gallery</h1> */}
                <h2 className="md:text-4xl text-2xl text-center font-bold text-gray-800 mb-8">
                    Gallery
                </h2>
                {/* Folder Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:px-6 md:px-5">
                    {folders?.map((folder) => (
                        <div
                            key={folder.id}
                            className="flex flex-col items-center cursor-pointer p-4 bg-gray-100 rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                            onClick={() => openFolder(folder)}
                        >
                            <FaFolderOpen className="text-red-900 text-6xl mb-2" />
                            <p className="text-center text-lg font-medium">{folder.name}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Videos Section */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 px-4 md:px-8 lg:px-10 py-3">
                <div className="relative flex flex-col justify-between h-[320px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden">
                    <video className="absolute inset-0 w-full h-full object-cover" src={earnwithus3} loop playsInline controls
                        loading="lazy"  // Lazy loading enabled
                    />
                </div>
                <div className="relative flex flex-col justify-between h-[320px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden">
                    <video className="absolute inset-0 w-full h-full object-cover" src={earnwithus2} loop playsInline controls
                        loading="lazy"  // Lazy loading enabled
                    />
                </div>
                <div className="relative flex flex-col justify-between h-[320px] rounded-lg shadow-lg p-2 items-center border border-gray-400 overflow-hidden">
                    <video className="absolute inset-0 w-full h-full object-cover" src={earnwithus1} loop playsInline controls
                        loading="lazy"  // Lazy loading enabled
                    />
                </div>
            </div>

            <BookingForm />
        </>
    );
};
