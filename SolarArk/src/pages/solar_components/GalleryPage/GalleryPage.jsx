import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

export const GalleryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { folder } = location.state || {};

  if (!folder) {
    return <div className="text-center mt-10 text-xl">No Images Found!</div>;
  }

  return (
    <>
      <Helmet>
        <title>The Solar Ark | Gallery</title>
        <meta
          name="description"
          content="Powering a Sustainable Future with Solar Ark India | Mission - Solar Ark's mission extends beyond projects. Our efforts revolve around nurturing awareness about sustainable living practices, inspiring individuals to make eco-conscious choices. | Vision - Empowering Communities, Illuminating Futures: Solar Ark's Vision for a Sustainable India At Solar Ark, we envision a future where every corner of India is bathed in the glow of ustainable energy, where communities thrive in harmony with nature, and where innovation and tradition converge to create a brighter tomorrow. Our vision is to lead the charge towards a renewable energy revolution, empowering communities across India to harness the abundant power of the sun and other sustainable resources. We see a nation where clean energy is not just a choice, but a way of life ingrained in the fabric of society."
        />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="The Solar Ark" />
        <meta name="robots" content="index, follow" />
        {/* Fallback Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Solar Ark | Gallery" />
        <meta property="og:url" content="https://thesolarark.com/" />

      </Helmet>
      <div className="relative h-40 lg:bg-gradient-to-b lg:from-black lg:to-white mobile-header"></div>
      <div className="min-h-screen p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-red-900 text-white rounded shadow hover:bg-red-700"
        >
          ← Back
        </button>
        <h1 className="text-center text-3xl font-semibold mb-6">{folder.name}</h1>

        {/* Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {folder.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Gallery Image"
              className="w-full h-full object-cover rounded-lg shadow-md"
              loading="lazy"  // Lazy loading enabled
            />
          ))}
        </div>
      </div>
    </>
  );
};
