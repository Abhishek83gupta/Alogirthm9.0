import React from "react";
import contact_image from "../assets/assets_frontend/contact_image.png";

function Contact() {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mx-6 sm:mx-12 lg:mx-24 py-8 sm:py-12 bg-[#1a2332] text-white">
      {/* Left Image Section */}
      <div className="lg:w-1/2 mb-8 lg:mb-0 flex justify-center">
        <img
          className="w-full max-w-xs sm:max-w-sm lg:max-w-md object-cover rounded-lg shadow-lg"
          src={contact_image}
          alt="Doctor with patient"
        />
      </div>

      {/* Right Info Section */}
      <div className="w-full lg:w-1/2">
        {/* Our Office */}
        <div className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            OUR OFFICE
          </h2>
          <p className="text-gray-300 mb-2">54709 Willms Station</p>
          <p className="text-gray-300 mb-2">Suite 350, Washington, USA</p>
          <p className="text-gray-300 mb-2">Tel: (415) 555-0132</p>
          <p className="text-gray-300">Email: greatstackdev@gmail.com</p>
        </div>

        {/* Careers Section */}
        <div className="mt-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
            CAREERS AT PRESCRIPTO
          </h2>
          <p className="text-gray-300 mb-6">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-[#3b82f6] text-[#3b82f6] py-2 px-6 rounded-lg hover:bg-[#1e3a8a] transition">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;