from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
from ml_logic import run_smart_campus_pipeline

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Smart Campus API is running!"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    try:
        df = pd.read_csv(request.files['file'])
    except Exception as e:
        return jsonify({"error": str(e)}), 400

    result = run_smart_campus_pipeline(df)
    return jsonify(result.to_dict(orient='records'))

@app.route('/ml_input', methods=['POST'])
def ml_input():
    data = request.get_json(force=True, silent=True)
    if not data:
        return jsonify({"error": "No JSON received"}), 400

    df = pd.DataFrame([{
        'feature1': len(c.get('title', '')) % 10,
        'feature2': 1 if c.get('priority', '').lower() == 'high' else 0,
        'priority': c.get('priority', 'Medium'),
        'severity': 5,
        'area': c.get('category', 'Unknown'),
        'hotspot': False
    } for c in data])

    df = run_smart_campus_pipeline(df)
    return jsonify(df.to_dict(orient='records'))

@app.route('/report_issue', methods=['POST'])
def report_issue():
    return jsonify(dict(request.form))

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
