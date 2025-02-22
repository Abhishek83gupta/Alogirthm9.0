import React, { useState } from "react";

function DiabetesPrediction() {
  const [formData, setFormData] = useState({
    pregnancies: "",
    glucose: "",
    bloodPressure: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigreeFunction: "",
    age: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict/diabetes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const nodeRequest = fetch("http://localhost:3000/api/diabetes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const data = await response.json();
      setResult(data.prediction);
    } catch (err) {
      setError("An error occurred while getting the prediction. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto text-white p-6">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Diabetes Prediction Using Machine Learning
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Pregnancies */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Pregnancies</label>
            <input
              type="number"
              name="pregnancies"
              value={formData.pregnancies}
              onChange={handleInputChange}
              placeholder="Enter number of pregnancies"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Glucose */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Glucose Level</label>
            <input
              type="number"
              name="glucose"
              value={formData.glucose}
              onChange={handleInputChange}
              placeholder="Enter glucose level"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Blood Pressure */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Blood Pressure</label>
            <input
              type="number"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleInputChange}
              placeholder="Enter blood pressure"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Skin Thickness */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Skin Thickness</label>
            <input
              type="number"
              name="skinThickness"
              value={formData.skinThickness}
              onChange={handleInputChange}
              placeholder="Enter skin thickness"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Insulin */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Insulin Level</label>
            <input
              type="number"
              name="insulin"
              value={formData.insulin}
              onChange={handleInputChange}
              placeholder="Enter insulin level"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* BMI */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">BMI</label>
            <input
              type="number"
              name="bmi"
              value={formData.bmi}
              onChange={handleInputChange}
              placeholder="Enter BMI"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Diabetes Pedigree Function */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Diabetes Pedigree Function</label>
            <input
              type="number"
              name="diabetesPedigreeFunction"
              value={formData.diabetesPedigreeFunction}
              onChange={handleInputChange}
              placeholder="Enter diabetes pedigree function"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Age */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter age"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-500 text-white px-6 py-2 rounded-md font-semibold transition-colors duration-200 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600 hover:shadow-lg"
          }`}
        >
          {loading ? "Processing..." : "Predict Diabetes"}
        </button>
      </form>

      {/* Display Errors */}
      {error && (
        <div className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded-md">
          {error}
        </div>
      )}

      {/* Display Prediction Result */}
      {result && !error && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg space-y-4">
          <p className="text-lg font-semibold text-blue-500">{result}</p>
        </div>
      )}
    </div>
  );
}

export default DiabetesPrediction;