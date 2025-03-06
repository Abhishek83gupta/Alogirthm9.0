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
    // Extract sections for each heading
    const sections = {
      "Causes": extractSection(text, "Causes"),
      "Symptoms": extractSection(text, "Symptoms"),
      "Diagnosis": extractSection(text, "Diagnosis"),
      "Treatment Options": extractSection(text, "Treatment Options"),
      "Preventive Measures": extractSection(text, "Preventive Measures"),
      "Risk Factors": extractSection(text, "Risk Factors"),
      "Additional Details": extractSection(text, "Additional Details")
    };

    return (
      <div className="grid-container">
        {Object.entries(sections).map(([heading, content], index) => (
          <motion.div
            key={heading}
            className="grid-item bg-gray-800 rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className="bg-blue-600 p-4"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-bold text-white">
                {heading}
              </h3>
            </motion.div>
            <motion.div
              className="p-4 content-area"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: (index * 0.1) + 0.2 }}
            >
              {content.length > 0 ? (
                content.map((paragraph, pIndex) => (
                  <p 
                    key={pIndex} 
                    className={`text-white mb-2 ${paragraph.trim().startsWith('-') ? 'pl-4' : ''}`}
                  >
                    {paragraph.trim().startsWith('-') ? 
                      paragraph.substring(1).trim() : 
                      paragraph}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 italic">No information available</p>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  const extractSection = (text, sectionName) => {
    const cleanedText = text.replace(/\*/g, "").replace(/## /g, "");
    
    // Try to find the section using different patterns
    const sectionRegex = new RegExp(`${sectionName}[:\\s]([\\s\\S]*?)(?=\\n(?:Causes|Symptoms|Diagnosis|Treatment Options|Preventive Measures|Risk Factors|Additional Details)[:\\s]|$)`, 'i');
    const match = cleanedText.match(sectionRegex);
    
    if (match && match[1]) {
      return match[1]
        .trim()
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }
    
    return [];
  };

  const fetchDiseaseInfo = async (disease) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `Provide detailed information about the disease "${disease}" with clear section headings.\n\nPlease organize your response with these exact headings:\n- Causes\n- Symptoms\n- Diagnosis\n- Treatment Options\n- Preventive Measures\n- Risk Factors\n- Additional Details\n\nMake each section concise and informative.`;
      
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
    <div className="max-w-6xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
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
              Prediction Result: {result}
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

      <style jsx>{`
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          grid-gap: 1.5rem;
          width: 100%;
        }

        .grid-item {
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .grid-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }

        .content-area {
          flex-grow: 1;
          overflow-y: auto;
          max-height: 250px;
        }

        /* Custom scrollbar for better UX */
        .content-area::-webkit-scrollbar {
          width: 6px;
        }

        .content-area::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .content-area::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }

        .content-area::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        @media (min-width: 768px) {
          .grid-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .grid-container {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (min-width: 1280px) {
          .grid-container {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

export default GeneralPrediction;