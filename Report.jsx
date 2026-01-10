import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Report() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  // Handle optional image selection
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) setImage(e.target.files[0]);
  };

  // Submit form to Flask backend
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("category", e.target.category.value);
    formData.append("location", e.target.location.value);
    if (image) formData.append("image", image);

    fetch("http://127.0.0.1:5000/report_issue", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
        alert("✅ Issue submitted successfully");
      })
      .catch((err) => {
        console.error("Error submitting issue:", err);
        alert("❌ Submission failed");
      });
  };

  return (
    <div className="report-page">
      <form className="report-card" onSubmit={handleSubmit}>
        <h2>Report an Issue</h2>

        <input name="title" placeholder="Complaint Title" required />

        <textarea
          name="description"
          placeholder="Description"
          required
        ></textarea>

        <select name="category" required>
          <option value="">Select Category</option>
          <option>Infrastructure</option>
          <option>Electricity</option>
          <option>Water</option>
          <option>Cleanliness</option>
        </select>

        <input name="location" placeholder="Location" required />

        {/* Optional image */}
        <label className="upload-label">
          Upload Image (optional)
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>

        {/* Image preview */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="preview-image"
          />
        )}

        <button type="submit">Submit Issue</button>
      </form>

      {/* Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
    </div>
  );
}

export default Report;
