from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Complaint(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200))
    description = db.Column(db.Text)
    category = db.Column(db.String(100))

    priority_label = db.Column(db.String(20))
    severity_score = db.Column(db.Integer)
    location = db.Column(db.String(100))
    is_hotspot = db.Column(db.Boolean, default=False)

    latitude = db.Column(db.Float, nullable=True)
    longitude = db.Column(db.Float, nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
