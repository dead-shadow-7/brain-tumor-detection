import React, { useState } from "react";
import axios from "axios";
import "../styles/imageupload.css";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ImageUpload = ({ setPrediction }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Create image preview URL
      setError(""); // Reset error message
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      setError("");
      setPrediction(null); // Reset previous result

      const response = await axios.post(`${backendUrl}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPrediction(response.data.data.prediction);
    } catch (err) {
      setError("Error processing image.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleImageChange}
        id="upload-button"
      />
      <label htmlFor="upload-button">Choose a MRI</label>

      {preview && (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
        </div>
      )}
      <br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Processing..." : "Upload & Predict"}
      </button>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ImageUpload;
