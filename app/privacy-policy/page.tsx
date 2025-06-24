import React from "react";

const page = () => {
  return (
    <div>
      <div className="max-w-3xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-6">
          Last updated: June 24, 2025
        </p>

        <p className="mb-4">
          We value your privacy. This privacy policy explains how we collect,
          use, and protect your information when you use our application.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Information We Collect
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            Basic profile information (name, email, profile picture) from
            Facebook or Google login
          </li>
          <li>Usage data, such as pages visited and actions taken</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>Provide and improve our service</li>
          <li>Authenticate your account</li>
          <li>Respond to customer support</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Sharing of Information
        </h2>
        <p className="mb-4">
          We do not share your personal information with third parties, except
          as required by law.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Security</h2>
        <p className="mb-4">
          We take reasonable steps to protect your data, but no method is 100%
          secure.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p>
          If you have any questions, contact us at:{" "}
          <strong>seoulmirrage@gmail.com</strong>
        </p>
      </div>
    </div>
  );
};

export default page;
