import React, { useState } from "react";
import axios from "axios";
import { useAuth, SignInButton, useUser } from "@clerk/clerk-react";
import "../styles/imageupload.css";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ImageUpload = ({ setPrediction, setMedicalInfo }) => {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Revoke previous URL to avoid memory leaks
      if (preview) URL.revokeObjectURL(preview);
      setPreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image.");
      return;
    }

    if (!isSignedIn) {
      setShowAuthPrompt(true);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setPrediction(null);
      setMedicalInfo(null);

      const formData = new FormData();
      formData.append("image", image);

      if (isLoaded && user) {
        formData.append("userId", user.id);
      }

      const response = await axios.post(`${backendUrl}/predict`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data?.data) {
        setPrediction(response.data.data.tumorType || "Unknown");
        setMedicalInfo(
          response.data.data.medicalInfo || "No information available"
        );
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      setError(
        `Error: ${err.response?.data?.error || err.message || "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  // Clean up the preview URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if (showAuthPrompt) {
    return (
      <div className="auth-required">
        <h2>Authentication Required</h2>
        <p>Please sign in to use our prediction model</p>
        <SignInButton mode="modal" />
        <button
          className="back-button"
          onClick={() => setShowAuthPrompt(false)}
        >
          Back to Upload
        </button>
      </div>
    );
  }

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
      <button
        onClick={handleUpload}
        disabled={loading || !image}
        className={loading ? "button-loading" : ""}
      >
        {loading ? "Processing..." : "Upload & Predict"}
      </button>
      {error && <p className="error">{error}</p>}
      {loading && (
        <p className="loading-message">Processing your image, please wait...</p>
      )}
    </div>
  );
};

export default ImageUpload;
