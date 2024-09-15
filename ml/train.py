# ml/train.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
import joblib

# 1. Load Dataset
data_path = '../data/sarcasm_dataset.csv'
df = pd.read_csv(data_path)

# 2. Data Preprocessing
# Features (X) and Labels (y)
X = df['sentence']  # Text sentences
y = df['label']     # 0 = non-sarcastic, 1 = sarcastic

# 3. Split the data into training and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Convert text data to numeric using TF-IDF Vectorizer
vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
X_train_tfidf = vectorizer.fit_transform(X_train)
X_test_tfidf = vectorizer.transform(X_test)

# 5. Train the Sarcasm Detection Model using Support Vector Classifier (SVC)
model = SVC(kernel='linear')
model.fit(X_train_tfidf, y_train)

# 6. Make predictions on the test set
y_pred = model.predict(X_test_tfidf)

# 7. Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy * 100:.2f}%')
print('Classification Report:')
print(classification_report(y_test, y_pred))

# 8. Save the model and the vectorizer for later use
joblib.dump(model, '../models/sarcasm_model.pkl')
joblib.dump(vectorizer, '../models/vectorizer.pkl')