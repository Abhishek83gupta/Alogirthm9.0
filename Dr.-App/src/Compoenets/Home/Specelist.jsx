import React from "react";
import { specialityData } from "../../assets/assets_frontend/assets.js";
import { Link } from "react-router-dom";

function Specelist() {
  return (
    <>
      <div
        id="specification"
        className="flex flex-col mt-[50px] md:mt-[100px] items-center bg-[#1a2332] text-white px-4 py-8 rounded-lg"
      >
        <h1 className="text-[30px] md:text-[50px] font-bold mb-4 text-center text-white">
          Find by Speciality
        </h1>
        <span className="mb-8 text-center mt-4 md:mt-7 text-lg md:text-xl font-semibold text-gray-300">
          Simply browse through our extensive list of trusted doctors,
          <br />
          schedule your appointment hassle-free.
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mt-10 md:mt-16">
          {specialityData.map((element, index) => (
            <Link
              key={index}
              onClick={() => window.scrollTo(0, 0)}
              to={`/Doctor/${element.speciality}`}
              className="text-center hover:-translate-y-2 transition-all duration-500 p-4 rounded-lg bg-[#1e293b] border border-gray-700 hover:border-[#3b82f6]"
            >
              <img
                src={element.image}
                alt={element.speciality}
                className="w-[100px] md:w-[170px] mb-2 mx-auto"
              />
              <p className="text-center text-lg md:text-xl font-medium text-gray-300 hover:text-[#3b82f6]">
                {element.speciality}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Specelist;