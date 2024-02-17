import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import ThumbnailComponent from "./ThumbnailComponent";
import { useNavigate } from "react-router-dom"; 

const UrlComponent = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageSize, setImageSize] = useState("");
  const [imageDate, setImageDate] = useState("");
  const [screenshotBlob, setScreenshotBlob] = useState(null); // State to store the screenshot blob
  const [cloudinaryUrl, setCloudinaryUrl] = useState(""); // State to store the Cloudinary URL

  const navigate = useNavigate();

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setError(""); // Reset error message
    setPreviewUrl(""); //Reset Preview URL
    setImageSize("");
    setImageDate("");
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Request sent ....");

    setLoading(true);
    try {
      if (!url.trim()) {
        setError("Please enter a valid URL");
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:3007/capture`, {
        params: {
          url: url,
        },
        responseType: "blob", // Specify the response type as 'blob'
      });

      const blob = new Blob([response.data], { type: "image/png" }); // Assuming the response is a PNG image
      const screenshotUrl = URL.createObjectURL(blob); // Create a Blob URL
      setScreenshotBlob(blob); // Save the blob in state

      setPreviewUrl(screenshotUrl);
      setImageSize(formatBytes(blob.size));
      setImageDate(new Date().toLocaleString());
      console.log("Request Received");
      console.log("Screenshot URL:", screenshotUrl); // Log the Blob URL

    } catch (error) {
      setError("Failed to Capture ScreenShotss");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", screenshotBlob, "screenshot.png"); // Use the blob data from captured screenshot
  
      const response = await axios.post(
        "http://localhost:3007/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Use multipart/form-data for file uploads
          },
        }
      );
  
      // console.log("Uploaded to Cloudinary:", response.data.url);
      setCloudinaryUrl(response.data.url); // Set the Cloudinary URL
      navigate("/thumbnail", { state: { cloudinaryUrl: response.data.url } });
  
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
    }
  };
  


  return (
    <Container maxWidth="sm">
      <Typography
        variant="h3"
        align="center"
        style={{
          marginTop: "140px",
          fontFamily: "Times New Roman",
          fontWeight: "bold",
        }}
        gutterBottom
      >
        Enter URL
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter Website URL"
          fullWidth
          value={url}
          onChange={handleUrlChange}
          error={!!error}
          helperText={error}
          style={{
            marginTop: "15px",
            boxShadow: "0 2px 5px rgba(0.1, 5, 0.1)",
            borderRadius: "5px",
          }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            marginTop: "40px",
            marginLeft: "100px",
            marginBottom: "10px",
            fontFamily: "system-ui",
            fontSize: "15px",
            fontWeight: "bold",
            backgroundColor: "#5C8374",
            color: "black",
          }}
          disabled={loading}
        >
          {loading ? "Capturing..." : "Capture Screenshot"}
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          style={{
            marginTop: "40px",
            marginLeft: "40px",
            marginBottom: "10px",
            fontFamily: "system-ui",
            fontSize: "15px",
            fontWeight: "bold",
            backgroundColor: "#5C8374",
            color: "black",
          }}
          disabled={!previewUrl}
        >
          Upload
        </Button>
      </form>
      <div
        style={{
          border: "2px solid #F8F6F4",
          borderRadius: "10px",
          marginTop: "30px",
          width: "100%",
          height: "300px",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 2px 5px rgba(0.1, 5, 0.1)",
        }}
      >
        {loading && (
          <Skeleton
            variant="square"
            width="100%"
            height="100%"
            animation="pulse"
          />
        )}
        {!loading && previewUrl && (
          <img
            src={previewUrl}
            alt="Website Screenshot"
            style={{
              maxWidth: "100%",
              height: "100%",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        )}
      </div>
      {previewUrl && (
        <>
          <Typography
            variant="body1"
            style={{
              marginTop: "10px",
              fontFamily: "Times New Roman",
              fontWeight: "bold",
              fontSize: "20px",
              width: "100%",
            }}
          >
            Screenshot link:{" "}
            <a href={previewUrl} target="_blank" rel="noopener noreferrer">
              {previewUrl}
            </a>
          </Typography>
          <Typography
            variant="body1"
            style={{
              marginTop: "10px",
              fontFamily: "Times New Roman",
              fontWeight: "bold",
              fontSize: "20px",
              width: "100%",
            }}
          >
            Size: {imageSize}
          </Typography>
          <Typography
            variant="body1"
            style={{
              marginTop: "10px",
              fontFamily: "Times New Roman",
              fontWeight: "bold",
              fontSize: "20px",
              width: "100%",
            }}
          >
            Date and Time: {imageDate}
          </Typography>
        </>
      )}
      {cloudinaryUrl && <ThumbnailComponent imageUrl={cloudinaryUrl} />}
    </Container>
  );
};

export default UrlComponent;
