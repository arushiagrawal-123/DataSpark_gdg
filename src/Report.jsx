import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Report() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("category", e.target.category.value);
    formData.append("location", e.target.location.value);
    if (image) formData.append("image", image);

    fetch(
      "https://unpunishable-vickey-unexpansively.ngrok-free.dev/report_issue",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then(() => alert("✅ Issue submitted successfully"))
      .catch(() => alert("❌ Submission failed"));
  };

  return (
    <div className="report-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="report-card">
        <h2>Report an Issue</h2>
        <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "20px" }}>
          Help us improve campus facilities by reporting issues
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input
            name="title"
            placeholder="Issue Title"
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              outline: "none",
              transition: "border 0.2s ease"
            }}
            onFocus={(e) => e.target.style.border = "1px solid #4f46e5"}
            onBlur={(e) => e.target.style.border = "1px solid #d1d5db"}
          />

          <textarea
            name="description"
            placeholder="Describe the issue in detail"
            required
            rows="4"
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              resize: "vertical",
              outline: "none",
              transition: "border 0.2s ease"
            }}
            onFocus={(e) => e.target.style.border = "1px solid #4f46e5"}
            onBlur={(e) => e.target.style.border = "1px solid #d1d5db"}
          />

          <select
            name="category"
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              outline: "none",
              cursor: "pointer",
              backgroundColor: "white"
            }}
          >
            <option value="">Select Category</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Electricity">Electricity</option>
            <option value="Cleanliness">Cleanliness</option>
          </select>

          <input
            name="location"
            placeholder="Location (e.g., Hostel A, Lab 3)"
            required
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              outline: "none",
              transition: "border 0.2s ease"
            }}
            onFocus={(e) => e.target.style.border = "1px solid #4f46e5"}
            onBlur={(e) => e.target.style.border = "1px solid #d1d5db"}
          />

          <label className="upload-label" htmlFor="image-upload">
            📷 {image ? image.name : "Upload Image (Optional)"}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="preview-image"
            />
          )}

          <button type="submit">Submit Issue</button>
        </form>
      </div>
    </div>
  );
}

export default Report;