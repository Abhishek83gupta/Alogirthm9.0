import React, { useContext, useState, useEffect } from "react";
import { Appcontext } from "../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import verified_icon from "../assets/assets_frontend/verified_icon.svg";
import info_icon from "../assets/assets_frontend/info_icon.svg";
import Relatabledr from "../Compoenets/Appoiment/Relatabledr";
import { toast } from "react-toastify";


function Appoiment() {
  const { doctors, backendurl, listdoctor, token } = useContext(Appcontext);
  const { DocId } = useParams();
const daysofweak=[  ' SUN','MON','TUS','WED','THU','FRI ','SAT']


  const [docInfo, setDocInfo] = useState(null);
  const [docslots, setDocSlots] = useState([]);
  const [docIndex, setdocIndex] = useState(0);
  const [slotTime, setslotTime] = useState('');

  const fetchInfo = () => {
    const doctor = doctors.find((doc) => doc._id === DocId);
    setDocInfo(doctor);
  };

  const getavilslots = () => {
    let today = new Date();
    let slotsArray = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endtime = new Date();
      endtime.setDate(today.getDate() + i);
      endtime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeslots = [];

      while (currentDate < endtime) {
        let formattedTime = currentDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' });

        timeslots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slotsArray.push(timeslots);
    }

    setDocSlots(slotsArray);  // Set state only once after the loop completes
  };

  const navigate = useNavigate();





  //============================================================
  const appointbook = async () => {
    if (!token) {
      toast.warn("Please login to book an appointment");
      return navigate("/login");
    }

    try {
      const date = docslots[docIndex]?.[0]?.datetime;
      if (!date) {
        toast.error("Invalid date selected");
        return;
      }

      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const slotDate = `${String(day).padStart(2, "0")}-${String(
        month
      ).padStart(2, "0")}-${year}`;

      if (!DocId || !slotDate || !slotTime) {
        toast.error("Please select a valid date, time, and doctor");
        return;
      }

      console.log({ DocId, slotDate, slotTime, token });

      const { data } = await axios.post(
        `${backendurl}/api/user/bookappointment`,
        { DocId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success("Appointment booked successfully");
        listdoctor();
        navigate("/My_Appoiment");
      } else {
        toast.error(data.error || "Booking slot is not available");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };






  useEffect(() => {
    fetchInfo();
  }, [DocId, doctors]);

  useEffect(() => {
    if (docInfo) {
      getavilslots();
    }
  }, [docInfo]);

  useEffect(() => {
    console.log(docslots);
    console.log();
    
  }, [docslots]);
    
    return (
      docInfo && (
        <>
          <div className="mx-auto my-10 max-w-7xl px-4">
            <div className="flex flex-col lg:flex-row gap-8 bg-white shadow-md rounded-lg p-8">
              {/* Doctor's Image */}
              <div className="flex-shrink-0">
                <img
                  className="bg-primary rounded-md w-full lg:w-[350px] object-cover"
                  src={docInfo.image}
                  alt={docInfo.name}
                />
              </div>

              {/* Doctor's Info */}
              <div className="flex-grow border-2 border-gray-200 p-6 rounded-lg space-y-4">
                {/* Name and Verified Icon */}
                <div className="flex flex-row items-center gap-2 text-3xl font-bold">
                  {docInfo.name}
                  <img src={verified_icon} alt="Verified" className="w-6 h-6" />
                </div>

                {/* Degree and Speciality */}
                <p className="text-lg font-semibold flex flex-wrap gap-2">
                  {docInfo.degree} - {docInfo.speciality}
                  <button className="ml-4 px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm">
                    {docInfo.experience} years experience
                  </button>
                </p>

                {/* About Section */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    About <img src={info_icon} alt="Info" className="w-5 h-5" />
                  </div>
                  <p className="text-gray-600 text-base">{docInfo.about}</p>
                </div>

                {/* Fee Section */}
                <div className="mt-8 text-lg font-semibold text-gray-900">
                  <span className="bg-green-100 text-green-600 py-2 px-4 rounded-lg">
                    Appointment fee: $ {docInfo.fees}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* date and time section  */}

          {/* BOOKING Slo*/}
          <div className="text-gray-600 mt-10 font-medium items-center ">
            <p className=" font-bold text-2xl ml-[90px]">Booking Slots</p>

            <div className="mt-4 ml-8 flex flex-row gap-16 justify-center items-center ">
              {docslots.length &&
                docslots.map((items, index) => (
                  <div
                    key={index}
                    onClick={() => setdocIndex(index)}
                    className={`border-2 border-gray-500 rounded-full ${
                      docIndex === index ? "bg-primary text-white" : ""
                    } p-4 cursor-pointer `}
                  >
                    <p>{items[0] && daysofweak[items[0].datetime.getDay()]}</p>
                    <p>{items[0] && items[0].datetime.getDate()}</p>
                  </div>
                ))}
            </div>

            <div className="mt-8">
              {/* Time Slots Section */}
              {docslots.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {docslots[docIndex].map((items, index) => (
                    <div
                      key={index}
                      className={`border-2 border-gray-300 rounded-full p-4 text-center cursor-pointer transition duration-200 ease-in-out
            ${
              slotTime === items.time
                ? "bg-primary text-white border-primary"
                : "hover:bg-gray-100"
            }`}
                      onClick={() => setslotTime(items.time)}
                    >
                      <p className="font-medium text-lg">
                        {items.time.toLowerCase()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={appointbook}
              className="bg-primary p-5 rounded-full text-white mt-16 ml-[600px] text-xl items-center mb-16"
            >
              Book an appointment
            </button>
          </div>

          <Relatabledr DocId={DocId} specfication={docInfo.speciality} />
        </>
      )
    );
  }


export default Appoiment;