import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from "framer-motion";

function GeneralPrediction() {
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const [formData, setFormData] = useState({
    fever: "Yes",
    cough: "Yes",
    fatigue: "Yes",
    difficultyBreathing: "Yes",
    age: "",
    gender: "Male",
    bloodPressure: "",
    cholesterolLevel: "",
  });

  const [result, setResult] = useState(null);
  const [diseaseInfo, setDiseaseInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const resultRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [result]);

  const formatDiseaseInfo = (text) => {
    const cleanedText = text
      .replace(/\*/g, "")
      .replace(/## /g, "")
      .split(/\n{2,}/g)
      .filter(section => section.trim());

    const formattedSections = [];
    let currentSection = null;

    cleanedText.forEach((section) => {
      const parts = section.split(':');
      if (parts.length >= 2) {
        const heading = parts[0].trim();
        const content = parts.slice(1).join(':').trim();
        
        currentSection = {
          heading,
          content: content.split('\n').map(line => line.trim()).filter(Boolean)
        };
        formattedSections.push(currentSection);
      } else if (currentSection) {
        currentSection.content.push(...section.split('\n').map(line => line.trim()).filter(Boolean));
      }
    });

    return formattedSections.map((section, index) => (
      <motion.div
        key={index}
        className="mb-6 bg-gray-800 rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
      >
        <motion.div
          className="bg-blue-600 p-4"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <h3 className="text-xl font-bold text-white">
            {section.heading}
          </h3>
        </motion.div>
        <motion.div
          className="p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: (index * 0.2) + 0.2 }}
        >
          {section.content.map((paragraph, pIndex) => (
            <p 
              key={pIndex} 
              className={`text-white mb-2 ${paragraph.trim().startsWith('-') ? 'pl-4' : ''}`}
            >
              {paragraph.trim().startsWith('-') ? 
                paragraph.substring(1).trim() : 
                paragraph}
            </p>
          ))}
        </motion.div>
      </motion.div>
    ));
  };

  const fetchDiseaseInfo = async (disease) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `Provide detailed information about the disease "${disease}".\n\nCauses\nSymptoms\nDiagnosis\nTreatment Options\nPreventive Measures\nRisk Factors\nAdditional Details`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      setDiseaseInfo(formatDiseaseInfo(text));
    } catch (err) {
      console.error("Error fetching disease info:", err);
      setDiseaseInfo(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });


      const nodeRequest = fetch("http://localhost:3000/api/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to get prediction");

      const data = await response.json();
      setResult(data.Disease);

      if (data.Disease) {
        fetchDiseaseInfo(data.Disease);
      }
    } catch (err) {
      setError("An error occurred while getting the prediction. Please try again.");
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <motion.h2 
        className="text-2xl font-bold text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        General Health Prediction Using Machine Learning
      </motion.h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["fever", "cough", "fatigue", "difficultyBreathing"].map((field) => (
            <div key={field} className="flex flex-col space-y-2">
              <label className="text-gray-300 text-sm capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <select
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-md"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          ))}

          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter age"
              className="bg-gray-700 text-white p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Blood Pressure</label>
            <input
              type="text"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleInputChange}
              placeholder="Normal: 90-120 / 60-80 mmHg | High: ≥130 / ≥80 mmHg"
              className="bg-gray-700 text-white p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Cholesterol Level</label>
            <input
              type="text"
              name="cholesterolLevel"
              value={formData.cholesterolLevel}
              onChange={handleInputChange}
              placeholder="Normal: <200 mg/dL | High: ≥240 mg/dL"
              className="bg-gray-700 text-white p-2 rounded-md"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white px-8 py-3 rounded-md font-semibold transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 hover:shadow-lg"
            }`}
          >
            {loading ? "Processing..." : "Predict Health Status"}
          </button>
        </div>
      </form>

      {error && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-4 bg-red-500 bg-opacity-20 text-red-500 rounded-md"
        >
          {error}
        </motion.div>
      )}

      <div ref={resultRef}>
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-gray-800 p-6 rounded-lg space-y-4"
          >
            <p className="text-lg font-semibold text-green-500">
             {result}
            </p>
          </motion.div>
        )}

        {diseaseInfo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 space-y-4"
          >
            <h3 className="text-xl font-bold text-blue-500 mb-6">
              Disease Information
            </h3>
            {diseaseInfo}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default GeneralPrediction;