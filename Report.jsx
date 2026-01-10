import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Report() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("category", e.target.category.value);
    formData.append("location", e.target.location.value);
    if (image) formData.append("image", image);

    axios.post("http://127.0.0.1:5000/report_issue", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then(res => {
      alert("✅ Issue submitted successfully");
      navigate("/dashboard/complaints");
    })
    .catch(err => console.error("Submit error:", err));
  };

  return (
    <div className="report-page">
      <form className="report-card" onSubmit={handleSubmit}>
        <h2>Report an Issue</h2>
        <input name="title" placeholder="Complaint Title" required />
        <textarea name="description" placeholder="Description" required></textarea>
        <select name="category" required>
          <option value="">Select Category</option>
          <option>Infrastructure</option>
          <option>Electricity</option>
          <option>Water</option>
          <option>Cleanliness</option>
        </select>
        <input name="location" placeholder="Location" required />

        <label className="upload-label">
          Upload Image (optional)
          <input type="file" accept="image/*" onChange={handleImageChange} hidden />
        </label>

        {image && <img src={URL.createObjectURL(image)} alt="Preview" className="preview-image" />}
        <button type="submit">Submit Issue</button>
      </form>

      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}

export default Report;
