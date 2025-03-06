import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Appcontext } from "../../Context/Context.jsx";

function Topdoctor() {
  const { doctors } = useContext(Appcontext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-8 bg-[#1a2332] text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Top Doctors to Book
      </h1>
      <p className="text-lg md:text-xl font-semibold text-gray-300 text-center mb-8">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {doctors.slice(0, 10).map((Element, index) => (
          <div
            key={index}
            onClick={() => navigate(`/Appoiment/${Element._id}`)}
            className="border-2 border-gray-700 bg-[#1e293b] p-6 rounded-lg cursor-pointer shadow-md hover:-translate-y-2 transition-all duration-500 hover:border-[#3b82f6]"
          >
            <img
              className="w-full h-40 object-cover mb-4 rounded-lg bg-[#3b82f6]/10"
              src={Element.image}
              alt={Element.name}
            />

            <div className="text-center">
              <p className="font-semibold text-xl mb-2 text-white">
                {Element.name}
              </p>
              <p className="text-gray-300">{Element.speciality}</p>
              <p className="text-[#3b82f6] mt-2">Available</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate("/Doctor");
          scrollTo(0, 0);
        }}
        className="items-center justify-center border-2 border-gray-600 bg-[#1e293b] p-3 mt-9 text-xl font-semibold text-white hover:bg-[#3b82f6] hover:border-[#3b82f6] transition-all duration-300 rounded-lg"
      >
        More
      </button>
    </div>
  );
}

export default Topdoctor;