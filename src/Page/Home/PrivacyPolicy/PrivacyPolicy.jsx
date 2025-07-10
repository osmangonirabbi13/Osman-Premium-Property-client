import React from "react";

const PrivacyPolicy = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto pt-30">
        <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4">
          At <strong>Osman Premium Property</strong>, we respect your privacy
          and are committed to protecting the personal information you share
          with us through our Building Management System (BMS).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>Your name, email, and profile image</li>
          <li>Agreement and apartment preferences</li>
          <li>Payment and coupon usage data</li>
          <li>Authentication metadata (login provider, timestamps)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>To verify and authenticate users</li>
          <li>To manage apartment agreements and payments</li>
          <li>To improve service quality and dashboard personalization</li>
          <li>To send announcements and notifications</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
        <p className="mb-4">
          Your personal data is securely stored in Firebase and our MongoDB
          database. All sensitive data is transmitted over HTTPS and access is
          restricted to authorized personnel only.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Third-Party Services
        </h2>
        <p className="mb-4">
          We use trusted third-party services such as Firebase Authentication
          and Payment Gateway. Your data may be stored on their secure servers
          under their respective privacy policies.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies</h2>
        <p className="mb-4">
          We may use cookies for session management and login persistence. These
          do not store personal details beyond your session or login status.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
        <p className="mb-4">
          You can view, edit, or delete your account information at any time.
          For any data-related requests, please contact our support team.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          7. Changes to Policy
        </h2>
        <p className="mb-4">
          We may update this policy as required. If we make significant changes,
          you will be notified through an announcement or email.
        </p>

        <p className="text-sm text-gray-600 mt-10">
          Last updated: July 7, 2025
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
