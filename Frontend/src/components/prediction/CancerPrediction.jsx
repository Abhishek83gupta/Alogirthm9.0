import React, { useState } from "react";

function CancerPrediction() {
  const [formData, setFormData] = useState({
    radius_mean: "",
    texture_mean: "",
    perimeter_mean: "",
    area_mean: "",
    smoothness_mean: "",
    compactness_mean: "",
    concavity_mean: "",
    concavepoints_mean: "",
    symmetry_mean: "",
    fractaldimension_mean: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict/cancer", {
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
        Cancer Prediction Using Machine Learning
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Radius Mean */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Radius Mean</label>
            <input
              type="number"
              name="radius_mean"
              value={formData.radius_mean}
              onChange={handleInputChange}
              placeholder="17.99"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Texture Mean */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Texture Mean</label>
            <input
              type="number"
              name="texture_mean"
              value={formData.texture_mean}
              onChange={handleInputChange}
              placeholder="10.38"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Perimeter Mean */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Perimeter Mean</label>
            <input
              type="number"
              name="perimeter_mean"
              value={formData.perimeter_mean}
              onChange={handleInputChange}
              placeholder="122.8"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Area Mean */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Area Mean</label>
            <input
              type="number"
              name="area_mean"
              value={formData.area_mean}
              onChange={handleInputChange}
              placeholder="1001"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Smoothness Mean */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Smoothness Mean</label>
            <input
              type="number"
              step="0.0001"
              name="smoothness_mean"
              value={formData.smoothness_mean}
              onChange={handleInputChange}
              placeholder="0.1184"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Compactness Mean */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Compactness Mean</label>
            <input
              type="number"
              step="0.0001"
              name="compactness_mean"
              value={formData.compactness_mean}
              onChange={handleInputChange}
              placeholder="0.2776"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Concavity Mean */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Concavity Mean</label>
            <input
              type="number"
              step="0.0001"
              name="concavity_mean"
              value={formData.concavity_mean}
              onChange={handleInputChange}
              placeholder="0.3001"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Concave Points Mean */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Concave Points Mean</label>
            <input
              type="number"
              step="0.0001"
              name="concavepoints_mean"
              value={formData.concavepoints_mean}
              onChange={handleInputChange}
              placeholder="0.1471"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Symmetry Mean */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Symmetry Mean</label>
            <input
              type="number"
              step="0.0001"
              name="symmetry_mean"
              value={formData.symmetry_mean}
              onChange={handleInputChange}
              placeholder="0.2419"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Fractal Dimension Mean */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-300 text-sm">Fractal Dimension Mean</label>
            <input
              type="number"
              step="0.0001"
              name="fractaldimension_mean"
              value={formData.fractaldimension_mean}
              onChange={handleInputChange}
              placeholder="0.07871"
              className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
          {loading ? "Processing..." : "Predict Cancer Disease"}
        </button>
      </form>

      {/* Display Errors */}
      {error && <div className="mt-4 text-red-500">{error}</div>}

      {/* Display Prediction Result */}
      {result && !error && (
        <div className="mt-8 bg-gray-800 p-6 rounded-lg space-y-4">
          <p className="text-lg font-semibold text-red-500">Prediction: {result}</p>
        </div>
      )}
    </div>
  );
}

export default CancerPrediction;