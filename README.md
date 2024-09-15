# Sarcastic Detection

## Overview

This project involves a sarcastic detection system built using machine learning techniques. The backend is implemented with FastAPI to handle requests and serve predictions, while the frontend is developed with React using Vite for fast development and build processes.

## Features

- **Machine Learning Model**: A trained model for detecting sarcasm in text.
- **FastAPI Backend**: Provides an endpoint to make predictions based on user input.
- **React Frontend**: A user-friendly interface to interact with the backend and display results.

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- Git

### Backend Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Mohamed-Abdulla/sarcastic-detector.git
   cd <repository-directory>
   ```

2. **Set up a virtual environment:**

   ```sh
   python3 -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. **Install dependencies:**

   ```sh
   pip install -r requirements.txt
   ```

4. **Run the FastAPI server:**

   ```sh
   uvicorn main:app --reload
   ```

   The server will be available at `http://127.0.0.1:8000`.

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```sh
   cd frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

   The React application will be available at `http://localhost:5173`.

## API Endpoint

### `POST /detect-sarcasm/`

**Request:**

- **URL**: `/detect-sarcasm/`
- **Method**: POST
- **Body**: JSON
  ```json
  {
    "sentence": "I can't wait to see the new movie."
  }
  ```

**Response:**

- **Content-Type**: application/json
- **Body**: JSON
  ```json
  {
    "sentence": "I can't wait to see the new movie.",
    "sarcasm": "Not Sarcastic",
    "label": 0
  }
  ```

## Testing the API with cURL

To test the sarcasm detection API, you can use the following `cURL` command:

```sh
curl -X POST "http://127.0.0.1:8000/detect-sarcasm/" -H "Content-Type: application/json" -d '{"sentence": "I can't wait to see the new movie."}'
```
