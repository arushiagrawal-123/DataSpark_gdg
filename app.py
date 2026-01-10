# ---------------- Imports ----------------
from flask import Flask, request, jsonify, render_template
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


# ---------------- CSV Upload Route ----------------
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


# ---------------- ML Input Route ----------------
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
        'feature1': len(c.get('title', '')) % 10,   # dummy numeric feature
        'feature2': 1 if c.get('priority', '').lower() == 'high' else 0,
        'priority': c.get('priority', 'Medium'),
        'severity': 5,
        'area': c.get('category', 'Unknown'),
        'hotspot': False
    } for c in data])

    # Run your real ML pipeline
    df = run_smart_campus_pipeline(df)

    return jsonify(df.to_dict(orient='records'))


# ---------------- Report Issue Route ----------------
@app.route('/report_issue', methods=['POST'])
def report_issue():
    title = request.form.get('title')
    description = request.form.get('description')
    category = request.form.get('category')
    location = request.form.get('location')
    image = request.files.get('image')  # optional

    response = {
        "title": title,
        "description": description,
        "category": category,
        "location": location,
        "image_uploaded": bool(image)
    }

    print("New report received:", response)
    return jsonify(response)


# ---------------- Optional Dashboard Route ----------------
@app.route('/dashboard')
def dashboard():
    return render_template('index.html')


# ---------------- Run App ----------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
