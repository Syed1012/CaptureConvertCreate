// ./components/OcrComponent.jsx

import { Container, Typography, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import React, { useState } from "react";
import Tesseract from "tesseract.js";

const OcrComponent = () => {
  const [ocrText, setOcrText] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewImg, setpreviewImg] = useState("");
  const [error, setError] = useState("");

  const handleOcr = async (file) => {
    setLoading(true);
    const {
      data: { text },
    } = await Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    });
    setOcrText(text);
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileType = file.type;
      if (
        fileType === "image/png" ||
        fileType === "image/jpg" ||
        fileType === "image/webp"
      ) {
        setError("");
        const reader = new FileReader();
        reader.onloadend = () => {
          setpreviewImg(reader.result);
          handleOcr(file);
        };
        reader.readAsDataURL(file);
      } else {
        setError("Please Select a valid image file (PNG, JPEG, WEBP).");
      }
    }
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
                <img
                  src={previewImg}
                  alt="Uploaded Preview"
                  style={{
                    maxWidth: "100%",
                    height: "100%",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
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
      </Container>
      {ocrText && (
        <Container maxWidth="sm">
          <Typography variant="body1">{ocrText}</Typography>
        </Container>
      )}
    </>
  );
};

export default OcrComponent;
