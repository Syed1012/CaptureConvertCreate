// ./components/OcrComponent.jsx

import { Container, Typography, IconButton, Skeleton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Button from "@mui/material/Button";
import ReplayIcon from "@mui/icons-material/Replay";
import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OcrComponent = () => {
  // State hooks to manage OCR text, loading state, preview image, error messages, and conversion state
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImg, setPreviewImg] = useState("");
  const [error, setError] = useState("");
  const [converting, setConverting] = useState(false);

  // Function to handle OCR processing using Tesseract.js
  const handleOcr = async (file) => {
    setLoading(true);
    const {
      data: { text },
    } = await Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    });
    setLoading(false);
    setOcrText(text);
    setConverting(false);
  };

  // Function to handle file input changes and preview the selected image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (
        fileType === "image/png" ||
        fileType === "image/jpg" ||
        fileType === "image/webp" ||
        fileType === "image/jpeg"
      ) {
        setError("");
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImg(reader.result);
          setOcrText(""); // Clear previous OCR text when a new image is uploaded
        };
        reader.readAsDataURL(file);
      } else {
        setError("Please select a valid image file (PNG, JPEG, WEBP).");
      }
    }
  };

  // Function to handle the click event of the Convert button and start the OCR process
  const handleConvertClick = () => {
    if (previewImg) {
      setConverting(true);
      const file = dataURLtoFile(previewImg, "uploadedImage.png");
      handleOcr(file);
    }
  };

  // Function to handle retry action, resetting the preview image and OCR text
  const handleRetry = () => {
    setPreviewImg("");
    setOcrText("");
  };

  // Utility function to convert data URL to File object
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <>
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
          Convert IMG 🔁 Text
        </Typography>
        <div
          style={{
            border: "2px solid #F8F6F4",
            borderRadius: "10px",
            marginTop: "30px",
            marginBottom: "60px",
            width: "100%",
            height: "300px",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 2px 5px rgba(0.1, 5, 0.1)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            background: loading ? "#f0f0f0" : "transparent",
          }}
        >
          {loading ? (
            <Skeleton
              variant="square"
              width="100%"
              height="100%"
              animation="pulse"
            />
          ) : (
            <>
              {previewImg ? (
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={previewImg}
                    alt="Uploaded Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      borderRadius: "10px",
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "rgba(0, 0, 0, 0.5)",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
                    onClick={handleRetry}
                  >
                    <IconButton
                      style={{
                        color: "white",
                        fontSize: 60,
                      }}
                    >
                      <ReplayIcon style={{ fontSize: 60 }} />
                    </IconButton>
                  </div>
                </div>
              ) : (
                <>
                  <input
                    accept="image/png, image/jpeg, image/webp"
                    style={{ display: "none" }}
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload">
                    <IconButton component="span">
                      <AddPhotoAlternateIcon style={{ fontSize: 60 }} />
                    </IconButton>
                  </label>
                  <Typography variant="body1" color="textSecondary">
                    Upload .png, .jpg, .webp
                  </Typography>
                  {error && (
                    <Typography variant="body2" color="error">
                      {error}
                    </Typography>
                  )}
                </>
              )}
            </>
          )}
        </div>
        {previewImg && !converting && (
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              onClick={handleConvertClick}
              style={{
                marginTop: "3px",
                marginBottom: "30px",
                fontFamily: "system-ui",
                fontSize: "18px",
                fontWeight: "bold",
                backgroundColor: "#5C8374",
                color: "black",
              }}
            >
              {converting ? "Converting..." : "Convert"}
            </Button>
          </div>
        )}
      </Container>
      {ocrText && (
        <Container maxWidth="sm">
          <div
            style={{
              border: "2px solid #F8F6F4",
              borderRadius: "10px",
              marginTop: "30px",
              marginBottom: "60px",
              width: "100%",
              height: "300px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 2px 5px rgba(0.1, 5, 0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              background: "#f0f0f0",
            }}
          >
            <Typography variant="body1" style={{ padding: "20px" }}>
              {ocrText}
            </Typography>
          </div>
        </Container>
      )}
    </>
  );
};

export default OcrComponent;
