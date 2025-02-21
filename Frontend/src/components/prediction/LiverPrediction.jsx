import React, { useState } from "react";

function LiverPrediction() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    tot_bilirubin: "",
    direct_bilirubin: "",
    tot_proteins: "",
    albumin: "",
    ag_ratio: "",
    sgpt: "",
    sgot: "",
    alkphos: ""
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict/liver", {
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
        Liver Disease Prediction Using Machine Learning
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleInputChange} className="bg-gray-700 text-white p-2 rounded-md" />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleInputChange} className="bg-gray-700 text-white p-2 rounded-md">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {Object.entries(formData).slice(2).map(([key, value]) => (
            <div key={key} className="flex flex-col space-y-2">
              <label className="text-gray-300 text-sm">{key.replace(/_/g, " ").toUpperCase()}</label>
              <input type="number" name={key} value={value} onChange={handleInputChange} className="bg-gray-700 text-white p-2 rounded-md" />
            </div>
          ))}
        </div>

        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
          Predict Liver Disease
        </button>
      </form>

      {loading && <p className="text-yellow-400 mt-4">Loading...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {result && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <p className="text-lg font-semibold text-red-500">{result}</p>
        </div>
      )}
    </div>
  );
}

export default LiverPrediction;