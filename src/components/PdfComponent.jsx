import React, { useState } from "react";
import { Button, Container, Typography, IconButton, Box } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { jsPDF } from "jspdf";

const PdfComponent = () => {
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilesChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviewUrls(filePreviews);
  };

  const handleConvert = async () => {
    setLoading(true);
    try {
      const doc = new jsPDF();

      for (let i = 0; i < files.length; i++) {
        const img = new Image();
        img.src = previewUrls[i];
        img.onload = () => {
          const imgWidth = 180;
          const imgHeight = (img.height * imgWidth) / img.width;

          if (i > 0) {
            doc.addPage();
          }

          doc.addImage(img, "JPEG", 10, 10, imgWidth, imgHeight);

          if (i === files.length - 1) {
            doc.save("images.pdf");

            // Clear state after saving the PDF
            setFiles([]);
            setPreviewUrls([]);
            document.getElementById("file-input").value = null;
          }
        };
      }
    } catch (error) {
      console.error("Error converting images to PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h3"
        align="center"
        style={{
          marginTop: "180px",
          fontFamily: "Times New Roman",
          fontWeight: "bold",
        }}
        gutterBottom
      >
        Convert Images to PDF
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "70px",
          marginBottom: "20px",
          border: "2px dashed #ccc",
          borderRadius: "10px",
          padding: "20px",
          cursor: "pointer",
          position: "relative",
          height:"300px"
        }}
        onClick={() => document.getElementById("file-input").click()}
        >
          <input
            type="file"
            id="file-input"
            multiple
            accept="image/*"
            onChange={handleFilesChange}
            style={{ display: "none" }}
          />
          <IconButton>
            <PictureAsPdfIcon style={{ fontSize: "48px", color: "#5C8374" }} />
          </IconButton>
          <Typography variant="body1" style={{ fontFamily: "system-ui" }}>
            Add Photos
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {previewUrls.map((url, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "5px",
                  boxShadow: "0 2px 5px rgba(0.1, 5, 0.1)",
                }}
              />
            </div>
          ))}
        </div>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginTop="40px"
          marginBottom="20px"
          cursor= "pointer"
        >
          <Button
            variant="contained"
            onClick={handleConvert}
            style={{
              fontFamily: "system-ui",
              fontSize: "15px",
              fontWeight: "bold",
              backgroundColor: "#5C8374",
              color: "black",
            }}
            disabled={loading || files.length === 0}
          >
            {loading ? "Converting..." : "Convert to PDF"}
          </Button>
        </Box>
      </Container>
    );
};

export default PdfComponent;
