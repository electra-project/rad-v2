import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="bg-black text-white min-h-screen py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Column for Image */}
            <div className="w-full mb-6 md:mb-0">
              <img
                src="https://media.istockphoto.com/id/1319183692/photo/business-man-and-information-security-images.jpg?s=612x612&w=0&k=20&c=jWWj228Qn-OzObBE9vfbc0hnqlNsEkNkHFEFuX-vQao="
                alt="Privacy Policy"
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
            {/* Right Column for Content */}
            <div className="w-full md:w-1/2 md:pl-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center bg-gray-700 p-3 rounded-lg">
                Privacy Policy
              </h1>
              <p className="text-gray-400 mb-4">
                <strong>Effective Date:</strong> 2024.09.05
              </p>
              <div className="text-gray-400">
                <h2 className="text-xl font-semibold mt-4">1. Introduction</h2>
                <p>Welcome to <strong>ELECTRA</strong>. We are committed to protecting your privacy. This policy outlines how we handle your personal information.</p>

                <h2 className="text-xl font-semibold mt-4">2. Information We Collect</h2>
                <ul className="list-disc pl-6">
                  <li><strong>Personal Information:</strong> Name, email, address, and phone number when you make a purchase or sign up.</li>
                  <li><strong>Usage Data:</strong> Information about how you use our website.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6">
                  <li><strong>To Process Orders:</strong> We use your details to process and deliver your orders.</li>
                  <li><strong>To Improve Services:</strong> We analyze usage data to enhance your experience.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">4. Sharing Your Information</h2>
                <ul className="list-disc pl-6">
                  <li><strong>Service Providers:</strong> We may share your information with partners who help us run our website and process payments.</li>
                  <li><strong>Legal Requirements:</strong> We may disclose information if required by law.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">5. Security</h2>
                <p>We use standard security measures to protect your data, but no method is completely secure.</p>

                <h2 className="text-xl font-semibold mt-4">6. Your Choices</h2>
                <ul className="list-disc pl-6">
                  <li><strong>Access and Update:</strong> You can view and update your information through your account.</li>
                  <li><strong>Opt-Out:</strong> You can opt out of marketing emails by following the unsubscribe link.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-4">7. Cookies</h2>
                <p>We use cookies to improve your experience on our website. You can manage cookie settings through your browser.</p>

                <h2 className="text-xl font-semibold mt-4">8. Contact Us</h2>
                <p>For questions, contact us at <strong>[Your Contact Email]</strong> or <strong>[Your Contact Phone Number]</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
