// // components/DiabetesPrediction.js
// import React, { useState } from 'react';

// function DiabetesPrediction() {
//   const [formData, setFormData] = useState({
//     pregnancies: '',
//     glucose: '',
//     bloodPressure: '',
//     skinThickness: '',
//     insulin: '',
//     bmi: '',
//     diabetesPedigreeFunction: '',
//     age: ''
//   });

//   const [result, setResult] = useState(null);

//   const InputField = ({ label, name, value, onChange, placeholder }) => (
//     <div className="flex flex-col space-y-2">
//       <label className="text-gray-300 text-sm">{label}</label>
//       <input
//         type="number"
//         value={value}
//         onChange={(e) => onChange(name, e.target.value)}
//         placeholder={placeholder}
//         className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );

//   const handleInputChange = (name, value) => {
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setResult("Diabetes prediction result here");
//   };

//   return (
//     <div className="max-w-4xl mx-auto text-white">
//       <h2 className="text-2xl font-bold mb-8">
//         Diabetes Prediction Using Machine Learning
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-2 gap-6">
//           <InputField
//             label="Pregnancies"
//             name="pregnancies"
//             value={formData.pregnancies}
//             onChange={handleInputChange}
//             placeholder="6"
//           />
//           <InputField
//             label="Glucose"
//             name="glucose"
//             value={formData.glucose}
//             onChange={handleInputChange}
//             placeholder="148"
//           />
//           <InputField
//             label="Blood Pressure"
//             name="bloodPressure"
//             value={formData.bloodPressure}
//             onChange={handleInputChange}
//             placeholder="72"
//           />
//           <InputField
//             label="Skin Thickness"
//             name="skinThickness"
//             value={formData.skinThickness}
//             onChange={handleInputChange}
//             placeholder="35"
//           />
//           <InputField
//             label="Insulin"
//             name="insulin"
//             value={formData.insulin}
//             onChange={handleInputChange}
//             placeholder="0"
//           />
//           <InputField
//             label="BMI"
//             name="bmi"
//             value={formData.bmi}
//             onChange={handleInputChange}
//             placeholder="33.6"
//           />
//           <InputField
//             label="Diabetes Pedigree Function"
//             name="diabetesPedigreeFunction"
//             value={formData.diabetesPedigreeFunction}
//             onChange={handleInputChange}
//             placeholder="0.627"
//           />
//           <InputField
//             label="Age"
//             name="age"
//             value={formData.age}
//             onChange={handleInputChange}
//             placeholder="50"
//           />
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
//         >
//           Predict Diabetes
//         </button>
//       </form>

//       {result && (
//         <div className="mt-8 bg-gray-800 p-6 rounded-lg space-y-4">
//           <p className="text-lg font-semibold text-blue-500">{result}</p>
          
//           <div className="space-y-4">
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Diabetes Overview:</h3>
//               <p className="text-gray-300">
//                 Diabetes is a chronic disease that occurs when the body cannot effectively use insulin or doesn't produce enough insulin...
//               </p>
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold mb-2">Management and Prevention:</h3>
//               <ul className="list-disc list-inside text-gray-300 space-y-2">
//                 <li>Maintain a Healthy Diet</li>
//                 <li>Regular Exercise</li>
//                 <li>Monitor Blood Sugar Levels</li>
//                 <li>Regular Medical Check-ups</li>
//                 <li>Medication Compliance</li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default DiabetesPrediction;










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
          <p className="text-lg font-semibold text-blue-500">Prediction: {result}</p>
        </div>
      )}
    </div>
  );
}

export default DiabetesPrediction;