import React, { useState } from "react";

function HeartPrediction() {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
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
      const response = await fetch("http://127.0.0.1:5000/predict/heart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const nodeRequest = fetch("http://localhost:3000/api/heart", {
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
            Heart Disease Prediction Using Machine Learning
          </h2>
    
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleInputChange} placeholder="Enter you age" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Sex</label>
                <input type="number" name="sex" value={formData.sex} onChange={handleInputChange} placeholder="(1 = Male, 0 = Female)" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Chest pain type (0-3)</label>
                <input type="number" name="cp" value={formData.cp} onChange={handleInputChange} placeholder="Enter the value" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Resting blood pressure (mm Hg)</label>
                <input type="number" name="trestbps" value={formData.trestbps} onChange={handleInputChange} placeholder="Enter the value" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2"> cholesterol level (mg/dL)</label>
                <input type="number" name="chol" value={formData.chol} onChange={handleInputChange} placeholder="Enter the value" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Fasting blood sugar</label>
                <input type="number" name="fbs" value={formData.fbs} onChange={handleInputChange} placeholder="(1 = >120 mg/dL, 0 = <=120 mg/dL)" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Resting electrocardiographic results (0-2)</label>
                <input type="number" name="restecg" value={formData.restecg} onChange={handleInputChange} placeholder="Enter the value" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Maximum heart rate achieved (bpm.)</label>
                <input type="number" name="thalach" value={formData.thalach} onChange={handleInputChange} placeholder="Enter the value" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Exercise-induced angina</label>
                <input type="number" name="exang" value={formData.exang} onChange={handleInputChange} placeholder="(1 = Yes, 0 = No)" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">heart stress</label>
                <input type="number" name="oldpeak" value={formData.oldpeak} onChange={handleInputChange} placeholder="Enter the value" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Slope of the peak exercise ST segment (0-2)</label>
                <input type="number" name="slope" value={formData.slope} onChange={handleInputChange} placeholder="(0 = Upsloping, 1 = Flat, 2 = Downsloping)" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Number of major vessels (0-3) colored by fluoroscopy</label>
                <input type="number" name="ca" value={formData.ca} onChange={handleInputChange} placeholder="Enter the value" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">Thalassemia</label>
                <input type="number" name="thal" value={formData.thal} onChange={handleInputChange} placeholder="(1 = Normal, 2 = Fixed defect, 3 = Reversible defect)" className="w-full bg-gray-700 text-white p-2 rounded-md" />
              </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200">
              Predict Heart Disease
            </button>
          </form>
        </div>
  );
}

export default HeartPrediction;