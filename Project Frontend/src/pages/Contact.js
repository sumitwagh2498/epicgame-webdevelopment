import React from "react";
import Layout from "./../components/Layout/Layout";
//import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title = 'Contact Us'>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Hi this is Team 54 of CDAC MUMBAI, Feel free to Contact us!!!
          </p>
          <p className="mt-3">
           Email: www.help@team54.com

          </p>
          <p className="mt-3">
            phone:012-3456789
          </p>
          <p className="mt-3">
            contact : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};
export default Contact;