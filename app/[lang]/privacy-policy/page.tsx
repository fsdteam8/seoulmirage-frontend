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
          At Seoul Mirage, we care deeply about your privacy and are committed
          to protecting your personal information. This Privacy Policy explains
          how we collect, use, and safeguard your data when you visit or make a
          purchase from our website.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <p className="mb-2">
          When you use our site, we may collect the following:
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>
            <strong>Personal Information:</strong> such as your name, email
            address, phone number, billing/shipping address.
          </li>
          <li>
            <strong>Payment Information:</strong> processed securely through
            Stripe. We do not store credit card details.
          </li>
          <li>
            <strong>Order History:</strong> including products you purchase and
            return.
          </li>
          <li>
            <strong>Device Information:</strong> IP address, browser type, and
            interactions with our site (via cookies and analytics).
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <p className="mb-2">We use your data to:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Process and deliver your orders</li>
          <li>Provide customer support</li>
          <li>Improve our website and services</li>
          <li>Communicate with you about orders, offers, or updates</li>
          <li>Comply with legal obligations</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. How We Protect Your Data
        </h2>
        <p className="mb-4">
          We implement strong security measures (SSL encryption, secure servers)
          to keep your information safe and prevent unauthorized access or
          misuse.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Cookies & Tracking
        </h2>
        <p className="mb-4">
          We use cookies and similar tools to improve your browsing experience,
          understand how you use the site, and offer personalized content. You
          can disable cookies in your browser settings, but some features of the
          website may not function properly.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          5. Sharing Your Information
        </h2>
        <p className="mb-2">We never sell your data.</p>
        <p className="mb-2">We may share limited information with:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Service providers (e.g. payment gateways, delivery partners)</li>
          <li>Legal authorities if required by law</li>
        </ul>
        <p className="mb-4">
          All third-party partners are required to respect the confidentiality
          of your data.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
        <p className="mb-2">You can:</p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Access or update your personal data</li>
          <li>Request deletion of your data</li>
          <li>
            Opt out of marketing emails at any time by clicking “unsubscribe”
          </li>
        </ul>
        <p className="mb-4">
          To request any of the above, please contact us at{" "}
          <strong>contact.seoulmirage@gmail.com</strong>.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          7. International Users
        </h2>
        <p className="mb-4">
          Our website is operated in the UAE. If you access it from outside, you
          consent to the transfer of your information to and from the UAE, where
          privacy laws may differ.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          8. Updates to This Policy
        </h2>
        <p className="mb-4">
          We may occasionally update this Privacy Policy to reflect changes in
          our practices or legal requirements. The latest version will always be
          posted on this page.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
        <p>
          If you have any questions or concerns about this policy, feel free to
          reach out to us at: <strong>contact.seoulmirage@gmail.com</strong>
        </p>
      </div>
    </div>
  );
};

export default page;
