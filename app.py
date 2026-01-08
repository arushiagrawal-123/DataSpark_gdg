# ---------------- Imports ----------------
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd
from ml_logic import run_smart_campus_pipeline

# ---------------- Flask App ----------------
app = Flask(__name__)
CORS(app)

# ---------------- Routes ----------------
@app.route('/')
def home():
    return "Smart Campus API is running!"

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

@app.route('/ml_input', methods=['POST'])
def ml_input():
    """
    Accepts JSON from ML/image service
    """
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON received"}), 400

    required_keys = ['issue_type', 'unsafe_flag', 'severity_hint']
    for key in required_keys:
        if key not in data:
            return jsonify({"error": f"Missing key: {key}"}), 400

    # Feature mapping
    df = pd.DataFrame([{
        'area': data['issue_type'],
        'feature1': data['severity_hint'] / 2,      # normalize
        'feature2': int(data['unsafe_flag'])
    }])

    result = run_smart_campus_pipeline(df)
    return jsonify(result.to_dict(orient='records'))

@app.route('/dashboard')
def dashboard():
    """
    Optional HTML dashboard
    """
    return render_template('index.html')

# ---------------- Run App ----------------
if __name__ == "__main__":
    app.run(debug=True)
