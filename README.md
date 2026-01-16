# 🏫 Smart Campus Intelligence System (ML-Driven)

An **ML-powered Smart Campus platform** designed to intelligently manage, prioritize, and visualize campus complaints and incidents in real time.
The system combines **machine learning, backend engineering, and geospatial visualization** to assist campus authorities in data-driven decision making.

---

## 🚀 Key Highlights

* 📊 **Machine Learning–based complaint prioritization**
* 🧠 **Automated severity scoring using NLP & feature engineering**
* 🗺️ **Real-time geospatial hotspot visualization**
* 🔁 **Live data refresh with backend polling**
* 🏗️ **End-to-end system: ML → API → Frontend**

---

## 🧠 Problem Statement

Large campuses receive **hundreds of complaints** related to infrastructure, safety, cleanliness, and services.
Manual handling leads to:

* Delayed responses
* Poor prioritization
* No insight into recurring problem zones

This project solves that by **automatically analyzing complaints**, assigning **priority scores**, and **visualizing hotspots** on a live campus map.

---

## 🏗️ System Architecture

```
User Complaints
      ↓
Flask REST API
      ↓
ML Pipeline (Feature Engineering + Scoring)
      ↓
SQLite Database
      ↓
React Dashboard + Map Visualization
```

---

## 🤖 Machine Learning Pipeline (Core Focus)

### 🔹 Input

* Complaint text
* Category (Infrastructure, Safety, Cleanliness, etc.)
* Timestamp
* Location (latitude, longitude)

### 🔹 Feature Engineering

* Text-based severity indicators (keywords, urgency terms)
* Complaint category weighting
* Time-based factors (recency boost)
* Frequency of similar complaints in nearby locations

### 🔹 Priority Scoring

Each complaint is assigned a **priority score**:

* 🔴 High
* 🟡 Medium
* 🟢 Low

This score directly impacts:

* Dashboard ordering
* Hotspot intensity on the map
* Administrative attention

> The ML logic is modular and designed to be extensible to future supervised models.

---

## 🗺️ Geospatial Hotspot Detection

* Uses latitude–longitude clustering
* Severity-weighted visualization
* Dynamic glow/intensity based on complaint density
* Enables authorities to identify **problem-prone zones instantly**

---

## 🧩 Tech Stack

### **Frontend**

* React (Vite)
* Tailwind CSS
* React-Leaflet (Maps & visualization)

### **Backend**

* Flask
* RESTful APIs
* Flask-CORS

### **Machine Learning / Data**

* Python
* Pandas
* Custom ML logic for scoring & prioritization

### **Database**

* SQLite

### **Deployment**

* Frontend: Vercel
* Backend: Local / Ngrok (configurable)

---

## 📊 Features

* 📌 Submit and track complaints
* 📈 Auto-prioritized complaint dashboard
* 🗺️ Live campus hotspot map
* 🔄 Real-time updates via polling
* 🧪 Modular ML pipeline for experimentation

---

## 📷 Screenshots

*(Add screenshots of dashboard & map here for maximum impact)*

---

## 🧪 Future Improvements

* Replace rule-based scoring with trained NLP models
* Clustering algorithms (DBSCAN / KMeans) for hotspots
* Admin role-based access
* Alert system for critical complaints
* Cloud-hosted backend with scalable database

---

## 👤 My Contribution

* Designed and implemented the **entire ML prioritization pipeline**
* Built Flask backend APIs and database schema
* Integrated ML output with live dashboard & map
* Engineered end-to-end data flow from complaint ingestion to visualization

---

## 📌 Why This Project Matters

This project demonstrates:

* Practical application of **ML in real-world systems**
* Strong **backend + ML integration**
* Ability to design **scalable, data-driven platforms**
* Real-time systems thinking beyond toy ML models

---

## 📄 License

MIT License
