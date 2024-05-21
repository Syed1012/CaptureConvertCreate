// ./components/OcrComponent.jsx

import { Container, Typography } from '@mui/material';
import React, { useState } from 'react'
import Tesseract from 'tesseract.js';

const OcrComponent = () => {
    const [ocrText, setOcrText] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewPdf, setPreviewPdf] = useState("");

    const handleOcr = async (file) => {
        const {data : {text}} = await Tesseract.recognize(file, 'eng', {logger: m => console.log(m) });
        setOcrText(text);
    }

  return (
    <>
    <Container maxWidth="sm">
    <Typography 
      variant='h3'
      align='center'
      style={{
        marginTop: "140px",
        fontFamily: "Times New Roman",
        fontWeight: "bold",
      }}
      gutterBottom
      >
        Upload a PNG 🔁PDF
      </Typography>
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
        {!loading && previewPdf && (
          <img
            src={previewPdf}
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
    </Container>
    <div>
        <input type="file" onChange={(e) => handleOcr(e.target.files[0])} />
        {ocrText && <p>{ocrText}</p>}
    </div>
    </>
  )
}

export default OcrComponent