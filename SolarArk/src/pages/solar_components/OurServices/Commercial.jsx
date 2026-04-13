import React from "react";
import { Helmet } from 'react-helmet';

const Commercial = () => {
  return (
    <>
      <Helmet>
        <title>thesolarark.com |  Services - Commercial | Solar Ark </title>
        <meta
          name="description"
          content="Powering a Sustainable Future with Solar Ark India | Mission - Solar Ark's mission extends beyond projects. Our efforts revolve around nurturing awareness about sustainable living practices, inspiring individuals to make eco-conscious choices. | Vision - Empowering Communities, Illuminating Futures: Solar Ark's Vision for a Sustainable India At Solar Ark, we envision a future where every corner of India is bathed in the glow of ustainable energy, where communities thrive in harmony with nature, and where innovation and tradition converge to create a brighter tomorrow. Our vision is to lead the charge towards a renewable energy revolution, empowering communities across India to harness the abundant power of the sun and other sustainable resources. We see a nation where clean energy is not just a choice, but a way of life ingrained in the fabric of society."
        />
        <meta name="theme-color" content="#000000" />
        <meta name="author" content="Solar Ark" />
        <meta name="robots" content="index, follow" />
        {/* Fallback Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Solar Ark | Services - Commercial " />
        <meta property="og:url" content="https://thesolarark.com/" />

      </Helmet>
      <div className="relative h-40 sm:h-28 lg:my-10 lg:bg-gradient-to-b lg:from-black lg:to-white mobile-header"></div>
      <div className="bg-gray-100 min-h-screen py-4 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl text-center">
          {/* Header Section */}
          <h1 className="text-4xl font-bold text-red-900 mb-4">
            Commercial – Efficient Solar Installations for Businesses
          </h1>

          {/* Content Section */}
          <p className="text-gray-600 text-lg mb-6">
            As businesses increasingly seek ways to reduce operational costs and
            demonstrate their commitment to sustainability, Solar Ark provides
            innovative solar solutions that cater specifically to commercial
            needs. Our custom solar systems are designed to lower energy
            expenses while helping businesses achieve their environmental goals.
            Whether you are a small startup or a large corporation, Solar Ark
            delivers efficient and scalable solar solutions that seamlessly
            integrate into your business model.
          </p>

          {/* Benefits List */}
          <ul className="text-gray-700 text-left list-disc list-inside mx-auto mb-6 max-w-2xl">
            <li className="mb-2">
              <strong>Cost-Effective Energy Solutions:</strong> Lower
              operational expenses by reducing your reliance on traditional
              energy sources and harnessing the power of the sun.
            </li>
            <li className="mb-2">
              <strong>Custom Installations:</strong> We design systems that fit
              the unique needs of your business, ensuring maximum energy
              efficiency and savings.
            </li>
            <li className="mb-2">
              <strong>Environmental Responsibility:</strong> Position your
              business as a leader in sustainability by adopting renewable
              energy and reducing your carbon footprint.
            </li>
            <li>
              <strong>Scalable Solutions:</strong> Whether you're upgrading
              existing systems or building from scratch, we provide scalable
              solutions that grow with your business needs.
            </li>
          </ul>

          {/* Call-to-Action Button */}
        </div>
      </div>
    </>
  );
};

export default Commercial;
