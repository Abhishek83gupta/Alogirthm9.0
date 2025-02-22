import React, { useContext, useState } from "react";
import profile from "../assets/assets_frontend/profile_pic.png";
import { Appcontext } from "../Context/Context";
import axios from "axios";
import { toast } from "react-toastify";

function MyProfile() {
  const { data, setData, token, getproile, backendurl } = useContext(Appcontext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setimage] = useState(false);

  // ... keep all the functions the same ...

  return data && (
    <div className="max-w-2xl mx-auto p-8 bg-[#1e293b] rounded-lg shadow-2xl mb-16 border border-gray-700">
      {/* Profile Picture */}
      <div className="flex items-center justify-center mb-8">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer">
            <div>
              <img 
                src={image ? URL.createObjectURL(image) : data.image} 
                alt="" 
                className="w-32 h-32 rounded-full border-4 border-[#3b82f6] shadow-lg"
              />
            </div>
            <input 
              onChange={(e) => setimage(e.target.files[0])} 
              type="file" 
              id="image" 
              className="hidden"
            />
          </label>
        ) : (
          <img
            src={data.image}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-[#3b82f6] shadow-lg"
          />
        )}
      </div>

      {/* Profile Info */}
      <div className="space-y-4">
        {/* Name */}
        <div className="flex flex-col items-start">
          <label className="text-sm font-bold text-gray-300">Name:</label>
          {isEdit ? (
            <input
              type="text"
              className="w-full px-3 py-2 bg-[#2d3748] border border-gray-600 rounded-md focus:ring-2 focus:ring-[#3b82f6] text-white"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          ) : (
            <p className="text-lg font-medium text-white">{data.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col items-start">
          <label className="text-sm font-bold text-gray-300">Email:</label>
          <p className="text-lg font-medium text-white">{data.email}</p>
        </div>

        {/* Phone */}
        <div className="flex flex-col items-start">
          <label className="text-sm font-semibold text-gray-300">Phone:</label>
          {isEdit ? (
            <input
              type="text"
              className="w-full px-3 py-2 bg-[#2d3748] border border-gray-600 rounded-md focus:ring-2 focus:ring-[#3b82f6] text-white"
              value={data.Phone}
              onChange={(e) => setData({ ...data, Phone: e.target.value })}
            />
          ) : (
            <p className="text-lg font-medium text-white">{data.phone}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <p className="text-lg font-semibold text-white">Address:</p>
          <div className="flex flex-col">
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="w-full px-3 py-2 mb-2 bg-[#2d3748] border border-gray-600 rounded-md focus:ring-2 focus:ring-[#3b82f6] text-white"
                  value={data.address?.line1 || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      address: { ...data.address, line1: e.target.value },
                    })
                  }
                />
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-[#2d3748] border border-gray-600 rounded-md focus:ring-2 focus:ring-[#3b82f6] text-white"
                  value={data.address?.line2 || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      address: { ...data.address, line2: e.target.value },
                    })
                  }
                />
              </>
            ) : (
              <>
                <p className="text-gray-300">{data.address.line1}</p>
                <p className="text-gray-300">{data.address.line2}</p>
              </>
            )}
          </div>
        </div>

        {/* Basic Information */}
        <p className="text-lg font-semibold text-white">Basic Information</p>
        <div className="flex flex-col space-y-4">
          {/* Gender */}
          <div className="flex flex-col items-start">
            <label className="text-sm font-semibold text-gray-300">
              Gender
            </label>
            {isEdit ? (
              <select
                value={data.Gender}
                className="w-full px-3 py-2 bg-[#2d3748] border border-gray-600 rounded-md focus:ring-2 focus:ring-[#3b82f6] text-white"
                onChange={(e) => setData({ ...data, Gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-lg font-medium text-white">{data.gender}</p>
            )}
          </div>

          {/* Birthday */}
          <div className="flex flex-col items-start">
            <label className="text-sm font-semibold text-gray-300">
              Date of Birth
            </label>
            {isEdit ? (
              <input
                type="date"
                className="w-full px-3 py-2 bg-[#2d3748] border border-gray-600 rounded-md focus:ring-2 focus:ring-[#3b82f6] text-white"
                value={data.Birthday}
                onChange={(e) => setData({ ...data, Birthday: e.target.value })}
              />
            ) : (
              <p className="text-lg font-medium text-white">{data.dob}</p>
            )}
          </div>
        </div>

        {/* Edit/Save Button */}
        <div className="mt-6">
          {isEdit ? (
            <button
              onClick={updatetheprofile}
              className="px-4 py-2 bg-[#3b82f6] text-white rounded-md hover:bg-[#1e3a8a] transition-colors duration-300"
            >
              Save
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 bg-[#4b5563] text-white rounded-md hover:bg-[#374151] transition-colors duration-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;