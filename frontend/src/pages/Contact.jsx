import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="bg-black text-white min-h-screen py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Column for Image */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <img
                src="https://media.istockphoto.com/id/1397549690/photo/reading-the-contracts-terms-and-conditions-and-privacy-policy-businessman-making-a-deal-the.jpg?s=612x612&w=0&k=20&c=s2YwLrxYVeaaqaABI54NFI0PZv0s8TTTm-63VOdhFrY="
                alt="Contact Us"
                className="w-full h-auto rounded-lg"
              />
            </div>
            {/* Right Column for Contact Information */}
            <div className="w-full md:w-1/2 px-4">
              <h1 className="text-3xl md:text-4xl font-bold bg-gray-800 p-4 rounded-lg text-center mb-6">
                CONTACT US
              </h1>
              <p className="text-gray-400 mb-6">
                If you have any queries or need information about our products, feel free to call us anytime. We are available 24/7.
              </p>
              <div className="space-y-4">
                <p className="flex items-center text-gray-400">
                  <BiMailSend className="mr-3 text-xl" />
                  <span>Email: <a href="mailto:www.help@ecommerceapp.com" className="text-blue-400">www.help@electra.com</a></span>
                </p>
                <p className="flex items-center text-gray-400">
                  <BiPhoneCall className="mr-3 text-xl" />
                  <span>Phone: <a href="tel:012-3456789" className="text-blue-400">011-2714031</a></span>
                </p>
                <p className="flex items-center text-gray-400">
                  <BiSupport className="mr-3 text-xl" />
                  <span>Toll Free: <a href="tel:1800-0000-0000" className="text-blue-400">+94-778070245</a></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
