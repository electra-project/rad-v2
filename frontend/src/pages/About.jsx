import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommerce App"}>
      <div className="bg-black text-white min-h-screen py-12">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Column for Image */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0">
              <img
                src="https://st2.depositphotos.com/3591429/10464/i/450/depositphotos_104648666-stock-photo-group-of-people-brainstorming-on.jpg"
                alt="About Us"
                className="w-full max-w-md md:max-w-lg rounded-lg"
              />
            </div>
            {/* Right Column for Description */}
            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Welcome to <strong>ELECTRA</strong>
              </h2>
              <p className="text-gray-400 mb-6">
                Your one-stop destination for the latest and greatest in electronics! Founded in <strong>2024</strong>, we are passionate about delivering high-quality gadgets and devices at competitive prices. Our team of tech enthusiasts carefully curates a wide range of products, from smartphones and laptops to home entertainment systems and smart devices.
              </p>
              <h5 className="text-xl font-semibold mb-4">Why Shop With Us?</h5>
              <ul className="list-disc list-inside text-gray-400 mb-6">
                <li><strong>Quality:</strong> We offer products from top brands to ensure reliability and satisfaction.</li>
                <li><strong>Affordability:</strong> Competitive pricing without compromising on quality.</li>
                <li><strong>Fast Shipping:</strong> Quick and reliable delivery to get your products to you faster.</li>
                <li><strong>Customer Support:</strong> Our friendly team is here to help with any questions or concerns.</li>
              </ul>
              <p className="text-gray-400 mb-6">
                At <strong>ELECTRA</strong>, our mission is to make technology accessible and enjoyable for everyone. We value innovation, trust, and customer satisfaction, and strive to provide a seamless shopping experience.
              </p>
              <p className="text-gray-400">
                Thank you for choosing ELECTRA! We look forward to serving all your electronic needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
