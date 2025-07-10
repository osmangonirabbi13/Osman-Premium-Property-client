import React from "react";

const TermsAndConditions = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto pt-30">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="mb-4">
          Welcome to <strong>Osman Premium Property</strong>. By accessing or
          using our Building Management System (BMS), you agree to be bound by
          the following terms and conditions. Please read them carefully.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Account Registration
        </h2>
        <p className="mb-4">
          You must provide accurate and complete information when creating an
          account. Users are responsible for maintaining the confidentiality of
          their account and password.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. User Roles & Permissions
        </h2>
        <p className="mb-4">
          There are three types of roles in the system: Users, Members, and
          Admins. Admins control apartment listings, coupons, and announcements.
          Members can apply for agreements and make payments.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">3. Payments</h2>
        <p className="mb-4">
          All rent payments must be made through the secure payment gateway
          integrated into the system. Applied coupons are subject to validation
          and availability.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Privacy</h2>
        <p className="mb-4">
          Your data is stored securely. We do not sell or share your personal
          information with third parties without your consent, except as
          required by law.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          5. Agreement Requests
        </h2>
        <p className="mb-4">
          Users can apply for an apartment through an agreement request.
          Acceptance or rejection of such requests is at the sole discretion of
          the Admin.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          6. Prohibited Activities
        </h2>
        <ul className="list-disc list-inside mb-4">
          <li>Misuse of the platform or impersonation</li>
          <li>Unauthorized access attempts to other user data</li>
          <li>Sharing fake documents or false agreement information</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate user access if any
          activity violates the above terms.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Changes to Terms</h2>
        <p className="mb-4">
          We may update our Terms & Conditions from time to time. Users will be
          notified of any significant changes via the announcements section.
        </p>

        <p className="text-sm text-gray-600 mt-10">
          Last updated: July 7, 2025
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
