from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Complaint
from ml_logic import run_smart_campus_pipeline
import pandas as pd
import os
from datetime import datetime, date

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

with app.app_context():
    db.create_all()

# ----------------- Create complaint -----------------
@app.route("/report_issue", methods=["POST", "OPTIONS"])
def report_issue():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    data = request.get_json()

    df = pd.DataFrame([{
        "description": data.get("description", ""),
        "repeat_count": data.get("repeat_count", 0),
        "unsafe_flag": data.get("unsafe_flag", 0)
    }])
    ml_out = run_smart_campus_pipeline(df).iloc[0]

    priority = ml_out.get("priority_label", "Low")
    severity = int(ml_out.get("severity_score", 1))
    is_hotspot = bool(ml_out.get("is_hotspot", False))

    category = data.get("category", "")

    # RULE: Infrastructure/Electricity → High + hotspot
    if category in ["Infrastructure", "Electricity"]:
        priority = "High"
        severity = max(severity, 3)
        is_hotspot = True
    elif severity == 2:
        priority = "Medium"
    elif severity >= 3:
        priority = "High"

    complaint = Complaint(
        title=data.get("title", "No Title"),
        description=data.get("description", ""),
        category=category or "Uncategorized",
        priority_label=priority,
        severity_score=severity,
        location=data.get("location", "Unknown"),
        is_hotspot=is_hotspot,
        latitude=data.get("latitude", 0),
        longitude=data.get("longitude", 0),
        created_at=datetime.utcnow(),
        reporter=data.get("reporter", "Anonymous")
    )
    db.session.add(complaint)
    db.session.commit()

    return jsonify({
        "message": "Complaint registered successfully",
        "priority": priority,
        "severity": severity,
        "hotspot": is_hotspot
    }), 201

# ----------------- All complaints -----------------
@app.route("/complaints", methods=["GET"])
def get_complaints():
    complaints = Complaint.query.order_by(Complaint.created_at.desc()).all()
    return jsonify([{
        "id": c.id,
        "title": c.title,
        "description": c.description,
        "category": c.category,
        "priority": c.priority_label,
        "severity": c.severity_score,
        "location": c.location,
        "hotspot": c.is_hotspot,
        "lat": c.latitude,
        "lng": c.longitude,
        "reporter": getattr(c, "reporter", "Anonymous"),
        "time": c.created_at.strftime("%Y-%m-%d %H:%M:%S")
    } for c in complaints])

# ----------------- Dashboard counts -----------------
@app.route("/complaints/count", methods=["GET"])
def complaint_count():
    today_start = datetime.combine(date.today(), datetime.min.time())
    new_complaints = Complaint.query.filter(Complaint.created_at >= today_start).all()
    
    high = sum(1 for c in new_complaints if c.priority_label == "High")
    medium = sum(1 for c in new_complaints if c.priority_label == "Medium")
    low = sum(1 for c in new_complaints if c.priority_label == "Low")

    return jsonify({
        "total": len(new_complaints),
        "high": high,
        "medium": medium,
        "low": low
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
