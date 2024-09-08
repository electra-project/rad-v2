import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport, BiMap } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title="Contact Us">
      <div className="bg-[#1A1A1A] text-white min-h-screen py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Contact Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column: Contact Information */}
            <div className="space-y-8">
              <div className="bg-[#161616] rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
                <h2 className="text-2xl font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  <p className="flex items-center text-gray-300">
                    <BiMailSend className="mr-3 text-xl text-blue-400" />
                    <span>
                      Email:{" "}
                      <a
                        href="mailto:help@electra.com"
                        className="text-blue-400 hover:underline"
                      >
                        help@electra.com
                      </a>
                    </span>
                  </p>
                  <p className="flex items-center text-gray-300">
                    <BiPhoneCall className="mr-3 text-xl text-green-400" />
                    <span>
                      Phone:{" "}
                      <a
                        href="tel:011-2714031"
                        className="text-green-400 hover:underline"
                      >
                        011-2714031
                      </a>
                    </span>
                  </p>
                  <p className="flex items-center text-gray-300">
                    <BiSupport className="mr-3 text-xl text-yellow-400" />
                    <span>
                      Toll Free:{" "}
                      <a
                        href="tel:+94-778070245"
                        className="text-yellow-400 hover:underline"
                      >
                        +94-778070245
                      </a>
                    </span>
                  </p>
                  <p className="flex items-center text-gray-300">
                    <BiMap className="mr-3 text-xl text-red-400" />
                    <span>Address: 123 Electra Street, Tech City, 10001</span>
                  </p>
                </div>
              </div>
              <div className="bg-[#161616] rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
                <h2 className="text-2xl font-semibold mb-4">Business Hours</h2>
                <ul className="space-y-2 text-gray-300">
                  <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                  <li>Saturday: 10:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-[#161616] rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300">
              <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-3 py-2 bg-[#222222] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-3 py-2 bg-[#222222] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full px-3 py-2 bg-[#222222] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message here..."
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-electra-red text-white font-bold py-2 px-4 rounded-md transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
