from flask import Flask, request, jsonify
import pickle
import numpy as np
import joblib
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

# Load pre-trained models
diabetes_model = pickle.load(open("./models/diabetes_model.pkl", "rb"))
cancer_model = pickle.load(open("./models/cancer_model.pkl", "rb"))
heart_model = pickle.load(open("./models/heart_model.pkl", "rb"))
liver_model = pickle.load(open("./models/liver_model.pkl", "rb"))
general_model = joblib.load("./models/general_model.pkl")
label_encoder = joblib.load('./models/label_encoder.pkl')
with open('./models/qa_model.pkl', 'rb') as model_file:
    questions, answers, vectorizer = pickle.load(model_file)


@app.route("/")
def home():
    return jsonify({"message": "Welcome to the ML Prediction API!"})

@app.route("/predict/diabetes", methods=["POST"])
def predict_diabetes():
    data = request.json
    features = np.array([list(data.values())])
    prediction = diabetes_model.predict(features)
    result = "Positive" if prediction[0] == 1 else "Negative"
    return jsonify({"prediction": result})

@app.route("/predict/cancer", methods=["POST"])
def predict_cancer():
    data = request.json

    # Remove 'diagnosis' key if present
    if "diagnosis" in data:
        del data["diagnosis"]

    features = np.array([list(data.values())], dtype=float)  # Convert values to float
    prediction = cancer_model.predict(features)
    result = "Malignant" if prediction[0] == 1 else "Benign"
    
    return jsonify({"prediction": result})

@app.route("/predict/heart", methods=["POST"])
def predict_heart():
    data = request.json
    features = np.array([list(data.values())])
    prediction = heart_model.predict(features)
    result = "Heart Disease" if prediction[0] == 1 else "No Heart Disease"
    return jsonify({"prediction": result})

@app.route("/predict/liver", methods=["POST"])
def predict_liver():
    data = request.json

    # Convert gender to numerical (e.g., Female -> 0, Male -> 1)
    gender_mapping = {"Male": 1, "Female": 0}
    if "gender" in data:
        data["gender"] = gender_mapping.get(data["gender"], -1)  # Default to -1 if unknown

    features = np.array([list(data.values())], dtype=np.float64)  # Ensure correct type
    prediction = liver_model.predict(features)
    result = "Liver Disease" if prediction[0] == 1 else "No Liver Disease"
    
    return jsonify({"prediction": result})

@app.route('/predict/general', methods=['POST'])
def predict_general():
    # Get JSON data
    data = request.get_json()

    # Extract features
    fever = 1 if data['Fever'] == 'Yes' else 0
    cough = 1 if data['Cough'] == 'Yes' else 0
    fatigue = 1 if data['Fatigue'] == 'Yes' else 0
    difficulty_breathing = 1 if data['Difficulty Breathing'] == 'Yes' else 0
    age = int(data['Age'])
    gender = 1 if data['Gender'] == 'Male' else 0
    blood_pressure = {'Low': 1, 'Normal': 2, 'High': 3}[data['Blood Pressure']]
    cholesterol = {'Low': 1, 'Normal': 2, 'High': 3}[data['Cholesterol Level']]

    # Predict
    features = np.array([[fever, cough, fatigue, difficulty_breathing, age, gender, blood_pressure, cholesterol]])
    prediction = general_model.predict(features)
    predicted_disease = label_encoder.inverse_transform(prediction)[0]

    return jsonify({'Disease': predicted_disease})

@app.route('/predict/qa', methods=['POST'])
def predict():
    data = request.get_json()
    user_question = data.get('question', '')

    # Preprocess and vectorize the input question
    user_question_vector = vectorizer.transform([user_question])
    similarities = cosine_similarity(user_question_vector, vectorizer.transform(questions))
    
    # Find the most similar question
    most_similar_idx = np.argmax(similarities)
    best_answer = answers[most_similar_idx]

    return jsonify({'answer': best_answer})

   
if __name__ == "__main__":
    app.run(debug=True, port=5000)