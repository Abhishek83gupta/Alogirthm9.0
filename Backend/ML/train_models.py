import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
from sklearn.preprocessing import LabelEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
import os
import joblib


# Ensure models directory exists
if not os.path.exists('models'):
    os.makedirs('models')

# Function to train a model for the Diabetes dataset
def train_diabetes_model():
    data = pd.read_csv('datasets/diabetes.csv')
    X = data.drop(columns=['Outcome'])
    y = data['Outcome']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)
    accuracy = accuracy_score(y_test, model.predict(X_test))
    print(f"Diabetes Model Accuracy: {accuracy:.2f}")
    with open('models/diabetes_model.pkl', 'wb') as file:
        pickle.dump(model, file)

# Function to train a model for the Heart Disease dataset
def train_heart_model():
    data = pd.read_csv('datasets/heart.csv')
    X = data.drop(columns=['target'])
    y = data['target']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)
    accuracy = accuracy_score(y_test, model.predict(X_test))
    print(f"Heart Disease Model Accuracy: {accuracy:.2f}")
    with open('models/heart_model.pkl', 'wb') as file:
        pickle.dump(model, file)

# Function to train a model for the Liver Disease dataset
def train_liver_model():
    data = pd.read_csv('datasets/liver.csv')
    label_encoder = LabelEncoder()
    data['gender'] = label_encoder.fit_transform(data['gender'])  # Encode gender: Female -> 0, Male -> 1
    X = data.drop(columns=['is_patient'])
    y = data['is_patient']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)
    accuracy = accuracy_score(y_test, model.predict(X_test))
    print(f"Liver Model Accuracy: {accuracy:.2f}")
    with open('models/liver_model.pkl', 'wb') as file:
        pickle.dump(model, file)

# Function to train a model for the General dataset
def train_general_model():
    # Load the dataset
    data = pd.read_csv("datasets/general.csv")  # Replace with the filename
    # Preprocess the data
    data['Fever'] = data['Fever'].apply(lambda x: 1 if x == 'Yes' else 0)
    data['Cough'] = data['Cough'].apply(lambda x: 1 if x == 'Yes' else 0)
    data['Fatigue'] = data['Fatigue'].apply(lambda x: 1 if x == 'Yes' else 0)
    data['Difficulty Breathing'] = data['Difficulty Breathing'].apply(lambda x: 1 if x == 'Yes' else 0)
    data['Gender'] = data['Gender'].apply(lambda x: 1 if x == 'Male' else 0)
    data['Blood Pressure'] = data['Blood Pressure'].map({'Low': 1, 'Normal': 2, 'High': 3})
    data['Cholesterol Level'] = data['Cholesterol Level'].map({'Low': 1, 'Normal': 2, 'High': 3})

    # Encode Disease column (target)
    le = LabelEncoder()
    data['Disease'] = le.fit_transform(data['Disease'])

    # Features and Target
    X = data.drop(['Disease'], axis=1)
    y = data['Disease']

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Train the model
    model = RandomForestClassifier(random_state=42)
    model.fit(X_train, y_train)

    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"General Model Accuracy: {accuracy:.2f}")

    # Save the model
    joblib.dump(model, 'models/general_model.pkl')
    joblib.dump(le, 'models/label_encoder.pkl')

def train_qa_model():
    # Load dataset
    data = pd.read_csv('datasets/qa.csv')  # Ensure your dataset is saved as "data.csv"
    data = data.fillna("")  # Replace NaN values with empty strings

     # Extract questions and answers
    questions = data['question'].values
    answers = data['answer'].values

    # Vectorize questions using TF-IDF
    vectorizer = TfidfVectorizer()
    question_vectors = vectorizer.fit_transform(questions)

    # Save the model and vectorizer
    with open('models/qa_model.pkl', 'wb') as model_file:
     pickle.dump((questions, answers, vectorizer), model_file)

    print("Model and vectorizer saved!")


# Main function to train all models
if __name__ == '__main__':
    print("Training models...\n")
    train_diabetes_model()
    print("Diabetes model completed...\n")
    train_heart_model()
    print("Heart model completed...\n")
    train_liver_model()
    print("Liver model completed...\n")
    # train_cancer_model()
    print("Cancer model completed...\n")
    train_general_model()
    print("General model completed...\n")
    train_qa_model()
    print("QA model completed...\n")
    print("\nTraining completed. Models saved in 'models/' directory.")








































                                                  # Function to train a model for the Cancer dataset
# def train_cancer_model():
#     data = pd.read_csv('datasets/cancer.csv')
#     X = data.drop(columns=['diagnosis'])
#     y = data['diagnosis'].map({'M': 1, 'B': 0})  # Encode 'M' as 1 and 'B' as 0
#     X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
#     model = RandomForestClassifier(random_state=42)
#     model.fit(X_train, y_train)
#     accuracy = accuracy_score(y_test, model.predict(X_test))
#     print(f"Cancer Model Accuracy: {accuracy:.2f}")
#     with open('models/cancer_model.pkl', 'wb') as file:
#         pickle.dump(model, file)
