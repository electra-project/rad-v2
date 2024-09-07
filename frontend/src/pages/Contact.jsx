import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="https://media.istockphoto.com/id/1397549690/photo/reading-the-contracts-terms-and-conditions-and-privacy-policy-businessman-making-a-deal-the.jpg?s=612x612&w=0&k=20&c=s2YwLrxYVeaaqaABI54NFI0PZv0s8TTTm-63VOdhFrY="
            alt="contactus"
            style={{ width: "100%" , marginTop:"60px",height:"400px"}}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center" style={{borderRadius:"10px"}}>CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
