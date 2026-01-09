import React from "react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Report() {
    const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Image is OPTIONAL
    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      category: e.target.category.value,
      location: e.target.location.value,
      image: image, // may be null
    };

    console.log("Submitted issue:", formData);
    alert(" ✅ Issue submitted successfully");
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

        {/* OPTIONAL IMAGE UPLOAD */}
        <label className="upload-label">
          Upload Image (optional)
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>

        {/* Image Preview */}
        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="preview-image"
          />
        )}

        <button type="submit">Submit Issue</button>
      </form>
      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate(-1)} // ← goes back in history
      >
        ← Back
      </button>
    </div>
  );
}

export default Report;
