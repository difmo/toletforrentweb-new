import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6 md:px-16 lg:px-32 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Privacy Policy & Terms & Conditions
        </h1>
        <p className="text-center text-sm text-gray-500 mb-8">
          Effective Date: August 26, 2025
        </p>

        {/* Privacy Policy Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
          <ol className="list-decimal ml-6 space-y-4">
            <li>
              <strong>What Information We Collect</strong> <br />
              We collect personal information like name, email, phone number,
              and property details when you use our app.
            </li>
            <li>
              <strong>What We Use Your Information For</strong> <br />
              We use this data to help tenants find rentals, allow owners/agents
              to post listings, and connect tenants with property owners/agents.
            </li>
            <li>
              <strong>Disclosure of Your Information</strong> <br />
              We never sell or rent your data. Information is only shared if
              required by law.
            </li>
            <li>
              <strong>Your Rights</strong> <br />
              You may request access or corrections to your personal data by
              contacting us.
            </li>
            <li>
              <strong>Changes to Privacy Policy</strong> <br />
              Updates will be posted here and, where appropriate, sent via
              email.
            </li>
          </ol>
        </section>

        {/* Terms & Conditions Section */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Terms & Conditions</h2>
          <ol className="list-decimal ml-6 space-y-4">
            <li>
              <strong>Agreement to Terms</strong> <br />
              By using this app, you agree to comply with these terms.
            </li>
            <li>
              <strong>Eligibility</strong> <br />
              You must be at least 18 years old to use this app.
            </li>
            <li>
              <strong>User Accounts & Responsibilities</strong> <br />
              Provide accurate information, keep credentials secure, and remain
              responsible for all activity under your account.
            </li>
            <li>
              <strong>Posting and Listing Conduct</strong> <br />
              Owners/agents must ensure listings are accurate and lawful. False
              listings are prohibited.
            </li>
            <li>
              <strong>Use of the Platform</strong> <br />
              We only connect tenants with owners/agents. We do not handle
              payments or agreements.
            </li>
            <li>
              <strong>Intellectual Property</strong> <br />
              All content in the app is owned by ToLet For Rent and may not be
              reproduced without permission.
            </li>
            <li>
              <strong>Limitation of Liability</strong> <br />
              We are not responsible for disputes, false listings, or indirect
              damages.
            </li>
            <li>
              <strong>Termination</strong> <br />
              Accounts violating these terms may be suspended or terminated.
            </li>
            <li>
              <strong>Governing Law</strong> <br />
              Governed by Indian law. Disputes will be settled within Indian
              jurisdiction.
            </li>
            <li>
              <strong>Modifications</strong> <br />
              Terms may be updated anytime and will be posted here or emailed.
            </li>
            <li>
              <strong>Contact Us</strong> <br />
              Email:{" "}
              <a
                href="mailto:your-support-email@example.com"
                className="text-blue-500 underline"
              >
                your-support-email@example.com
              </a>
            </li>
          </ol>
        </section>

        {/* Demo Login Instructions */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Demo Login Credentials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg text-gray-700 mb-2">Tenant</h3>
              <p>
                <strong>Email:</strong> tenant@rentspace.com
              </p>
              <p>
                <strong>Password:</strong> tenant123
              </p>
            </div>
            <div className="border p-4 rounded-xl shadow-sm">
              <h3 className="font-bold text-lg text-gray-700 mb-2">Owner</h3>
              <p>
                <strong>Email:</strong> owner@rentspace.com
              </p>
              <p>
                <strong>Password:</strong> owner123
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
