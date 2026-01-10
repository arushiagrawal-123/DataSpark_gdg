# ---------------- Imports ----------------
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
from ml_logic import run_smart_campus_pipeline

# ---------------- Flask App ----------------
app = Flask(__name__)
CORS(app)

# ---------------- Routes ----------------

@app.route('/')
def home():
    return "Smart Campus API is running!"

# ---------- CSV Upload ----------
@app.route('/upload', methods=['POST'])
def upload_file():
    """
    Upload CSV and get hotspot analysis
    """
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        df = pd.read_csv(request.files['file'])
    except Exception as e:
        return jsonify({"error": f"Failed to read CSV: {str(e)}"}), 400

    result = run_smart_campus_pipeline(df)
    return jsonify(result.to_dict(orient='records'))

# ---------- ML Input from Frontend ----------
@app.route('/ml_input', methods=['POST'])
def ml_input():
    """
    Accepts JSON array from frontend complaints
    """
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON received"}), 400

    # Map frontend complaints to ML pipeline input
    df = pd.DataFrame([{
        'area': c.get('category', 'Unknown'),
        'feature1': len(c.get('title','')) % 10,  # example dummy feature
        'feature2': 1 if c.get('priority') == 'High' else 0,
        'priority': c.get('priority', 'Medium'),
        'severity': 5,     # dummy severity
        'hotspot': False
    } for c in data])

    # Run ML pipeline if desired
    df = run_smart_campus_pipeline(df)

    return jsonify(df.to_dict(orient='records'))

# ---------- Report Issue ----------
@app.route('/report_issue', methods=['POST'])
def report_issue():
    """
    Accepts form-data with optional image from frontend Report.jsx
    """
    title = request.form.get('title')
    description = request.form.get('description')
    category = request.form.get('category')
    location = request.form.get('location')
    image = request.files.get('image')  # may be None

    response = {
        "title": title,
        "description": description,
        "category": category,
        "location": location,
        "image_uploaded": bool(image)
    }

    print("New report received:", response
