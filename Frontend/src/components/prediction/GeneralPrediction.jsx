import React, { useState } from "react";

function GeneralPrediction() {
  const [formData, setFormData] = useState({
    fever: "",
    cough: "",
    fatigue: "",
    difficultyBreathing: "",
    age: "",
    gender: "",
    bloodPressure: "",
    cholesterolLevel: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Corrected function to update state properly
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Fixed form submission to prevent reloads
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict/general", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      console.log("Raw Response:", response);

      if (!response.ok) throw new Error("Failed to get prediction");

      const data = await response.json();
      console.log(data);
      setResult(data.Disease);
    } catch (err) {
      setError("An error occurred while getting the prediction. Please try again.");
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-white p-6">
      <h2 className="text-2xl font-bold mb-8 text-center">
        General Health Prediction Using Machine Learning
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Fever Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Fever</label>
            <select
              name="fever"
              value={formData.fever}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
             
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Cough Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Cough</label>
            <select
              name="cough"
              value={formData.cough}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
             
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Fatigue Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Fatigue</label>
            <select
              name="fatigue"
              value={formData.fatigue}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
             
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Difficulty Breathing Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Difficulty Breathing</label>
            <select
              name="difficultyBreathing"
              value={formData.difficultyBreathing}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
             
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Age Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter age"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Gender Dropdown */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Blood Pressure Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Blood Pressure</label>
            <input
              type="text"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleInputChange}
              placeholder="e.g., 120/80"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Cholesterol Level Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Cholesterol Level</label>
            <input
              type="text"
              name="cholesterolLevel"
              value={formData.cholesterolLevel}
              onChange={handleInputChange}
              placeholder="e.g., Normal/High"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`bg-blue-500 text-white px-8 py-3 rounded-md font-semibold transition-colors duration-200 ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 hover:shadow-lg"}`}
          >
            {loading ? "Processing..." : "Predict Health Status"}
          </button>
        </div>
      </form>

      {error && <div className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded-md">{error}</div>}

      {result && !error && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg space-y-4">
          <p className="text-lg font-semibold text-green-500">
            {typeof result === "string" ? result : JSON.stringify(result, null, 2)}
          </p>
        </div>
      )}
    </div>
  );
}

export default GeneralPrediction;