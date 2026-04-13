import React from "react";
import {Helmet} from 'react-helmet'


const Homes = () => {
  return (
    <>
     <Helmet>
                <title>thesolarark.com | Services - Homes | Solar Ark  </title>
                <meta
                    name="description"
                    content="Powering a Sustainable Future with Solar Ark India | Mission - Solar Ark's mission extends beyond projects. Our efforts revolve around nurturing awareness about sustainable living practices, inspiring individuals to make eco-conscious choices. | Vision - Empowering Communities, Illuminating Futures: Solar Ark's Vision for a Sustainable India At Solar Ark, we envision a future where every corner of India is bathed in the glow of ustainable energy, where communities thrive in harmony with nature, and where innovation and tradition converge to create a brighter tomorrow. Our vision is to lead the charge towards a renewable energy revolution, empowering communities across India to harness the abundant power of the sun and other sustainable resources. We see a nation where clean energy is not just a choice, but a way of life ingrained in the fabric of society."
                />
                <meta name="theme-color" content="#000000" />
                <meta name="author" content="Solar Ark" />
                <meta name="robots" content="index, follow" />
                {/* Fallback Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Solar Ark | Services - Homes " />
                <meta property="og:url" content="https://thesolarark.com/" />

            </Helmet>
      <div className="relative h-40 sm:h-28 lg:my-10 lg:bg-gradient-to-b lg:from-black lg:to-white mobile-header"></div>
      <div className="bg-gray-100 min-h-screen py-4 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl text-center">
          {/* Header Section */}
          <h1 className="text-4xl font-bold text-red-900 mb-4">
            Homes – Custom Solar Systems for Homeowners
          </h1>

          {/* Content Section */}
          <p className="text-gray-600 text-lg mb-6">
            At Solar Ark, we offer customized solar solutions for homeowners who
            want to reduce their reliance on traditional power grids, lower
            their energy bills, and contribute to a cleaner planet. Our solar
            systems are tailored to fit your home's specific energy needs,
            ensuring maximum efficiency and savings. With our expert design and
            installation services, you can trust that your system will
            seamlessly integrate with your lifestyle while providing consistent,
            renewable energy. Whether you're aiming to achieve energy
            independence or simply reduce your carbon footprint, Solar Ark makes
            it easy and affordable to switch to solar power.
          </p>

          {/* Benefits List */}
          <ul className="text-gray-700 text-left list-disc list-inside mx-auto mb-6 max-w-2xl">
            <li className="mb-2">
              <strong>Custom Design: </strong> Lower Our professional team
              ensures a hassle-free installation with minimal disruption.
            </li>
            <li className="mb-2">
              <strong>Seamless Installation:</strong> Enjoy reduced energy bills
              and potential incentives while investing in clean energy. Our
              professional team ensures a hassle-free installation with minimal
              disruption.
            </li>
            <li className="mb-2">
              <strong>Long-Term Savings:</strong> Position your business as a
              leader in sustainability by adopting renewable energy and reducing
              your carbon footprint.
            </li>
            <li>
              <strong>Energy Independence:</strong> Take control of your energy
              consumption, decrease your reliance on nonrenewable sources, and
              secure long-term savings.
            </li>
          </ul>

          {/* Call-to-Action Button */}
        </div>
      </div>
    </>
  );
};

export default Homes;
