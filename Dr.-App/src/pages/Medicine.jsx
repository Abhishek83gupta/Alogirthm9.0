import React, { useState } from 'react';
import axios from 'axios';

function MedicineForm() {
  const [composition, setComposition] = useState('');
  const [age, setAge] = useState('');
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult([]);
    setError('');

    const data = {
      composition,
      age: parseInt(age),
    };

    try {
      const response = await axios.post('http://127.0.0.1:4000/', data);
      const { result, error } = response.data;
      if (error) {
        setError(error);
      } else {
        setResult(result);
      }
    } catch (err) {
      console.error("Error while fetching data", err);
      setError("There was an error communicating with the server.");
    }
  };

  return (
    <div className="min-h-screen bg-[#1a202c] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white text-center mb-8">Medicine Information Form</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-white mb-2">Medicine Name</label>
              <input
                type="text"
                value={composition}
                onChange={(e) => setComposition(e.target.value)}
                className="w-full p-3 bg-[#2d3748] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-3 bg-[#2d3748] text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#4299e1] text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Predict Health Status
          </button>
        </form>

        {error && (
          <div className="mt-6 text-red-400 text-center font-medium">
            {error}
          </div>
        )}

        {result.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-white text-center mb-6">Results:</h2>
            <div className="space-y-4">
              {result.map((item, index) => (
                <div key={index} className="bg-[#2d3748] p-6 rounded-md">
                  <p className="text-white"><strong>Composition:</strong> {item.composition}</p>
                  <p className="text-white"><strong>Amount:</strong> {item.amount}</p>
                  <p className="text-white"><strong>Unit:</strong> {item.unit}</p>
                  <p className="text-white"><strong>Profil:</strong> {item.profil}</p>
                  <p className="text-white"><strong>Dose:</strong> {item.dose}</p>
                  <p className="text-white"><strong>Contraindication:</strong> {item.contraindication}</p>
                  <p className="text-white"><strong>Usage Rule:</strong> {item.usage_rule}</p>
                  <p className="text-white"><strong>Side Effects:</strong> {item.side_effects}</p>
                  <p className="text-white"><strong>Usage Period:</strong> {item.usage_periode}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicineForm;