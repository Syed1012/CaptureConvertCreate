// ./Layout/MediaCard.jsx

import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Modal, Fade, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

export default function MediaCard({ imageUrl }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.setAttribute("download", "screenshot.png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Typography
        variant="body1"
        align="center"
        style={{
          marginTop: "200px",
          fontFamily: "Times New Roman",
          fontWeight: "bold",
          fontSize: "35px",
          width: "100%",
        }}
        onClick={handleOpen}
      >
        Here is your Screenshot. Tap to view full screen.
      </Typography>
      <Card
        sx={{
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
          border: "2px solid #F8F6F4",
          boxShadow: "0 2px 5px rgba(0.1, 5, 0.1)",
          borderRadius: "10px",
          marginTop: "20px",
          maxWidth: 600,
          maxHeight: 720,
        }}
        onClick={handleOpen}
      >
        <CardMedia
          component="img"
          alt="Upload an Image"
          height="400"
          image={imageUrl}
        />
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        style={{
          marginTop: "20px",
        }}
      >
        <Fade in={open}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              outline: "none",
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "10px",
                right: "120px",
                color: "#fff",
                zIndex: 9999,
              }}
            >
              <CloseIcon />
            </IconButton>
            <IconButton
              aria-label="download"
              onClick={handleDownload}
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                color: "#fff",
                zIndex: 9999,
              }}
            >
              <CloudDownloadIcon />
            </IconButton>
            <img
              src={imageUrl}
              alt="Uploaded Image"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
}
