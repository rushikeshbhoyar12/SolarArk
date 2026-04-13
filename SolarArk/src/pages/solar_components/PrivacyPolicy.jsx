import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-gray-800">
       <h2 className="text-4xl font-bold text-black">
            Privacy <span className="text-red-900">Policy</span>
          </h2>

      <p className="mb-4">
        At <strong>Solar Ark</strong>, we respect your privacy and are committed to protecting your personal data. This privacy policy outlines how we collect, use, and safeguard your information.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-red-900">1. Information We Collect</h2>
      <p className="mb-4">
        We may collect the following information:
        <ul className="list-disc list-inside ml-4">
          <li>Name and contact details</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Location and usage data (for analytics)</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-red-900">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your data to:
        <ul className="list-disc list-inside ml-4">
          <li>Provide solar installation services</li>
          <li>Respond to your inquiries</li>
          <li>Send updates and promotional emails (only with your consent)</li>
          <li>Improve website performance and user experience</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-red-900">3. Data Sharing & Security</h2>
      <p className="mb-4">
        We do not sell or share your data with third parties except to comply with legal obligations or deliver services. Your information is stored securely.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-red-900">4. Cookies</h2>
      <p className="mb-4">
        Our website uses cookies to enhance user experience and analyze traffic. You can disable cookies in your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-red-900">5. Your Rights</h2>
      <p className="mb-4">
        You have the right to access, modify, or delete your data. Contact us at <a href="mailto:info@thesolarark.com" className="text-blue-600 underline">info@thesolarark.com</a>.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2 text-red-900">6. Updates to This Policy</h2>
      <p className="mb-4">
        We may update this policy occasionally. The latest version will always be posted on this page with the last updated date.
      </p>

      <p className="mt-8 text-sm text-gray-600">Last Updated: July 28, 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
