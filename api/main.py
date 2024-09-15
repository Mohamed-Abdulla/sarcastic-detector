
from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import numpy as np
import joblib
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

#allow cors

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Load the pre-trained model and vectorizer
model = joblib.load('../models/sarcasm_model.pkl')
vectorizer = joblib.load('../models/vectorizer.pkl')

class SentenceRequest(BaseModel):
    sentence: str

@app.post("/detect-sarcasm/")
async def detect_sarcasm(request: SentenceRequest):
    # Extract the sentence from the request
    sentence = request.sentence
    
    # Vectorize the input sentence using the TF-IDF vectorizer
    sentence_vector = vectorizer.transform([sentence])
    
    # Make prediction using the loaded model
    prediction = model.predict(sentence_vector)[0]
    
    # Convert numpy int64 to native Python int
    prediction = int(prediction)
    
    # Prepare the response
    response = {
        "sentence": sentence,
        "sarcasm": "Sarcastic" if prediction == 1 else "Not Sarcastic",
        "label": prediction
    }
    
    return response