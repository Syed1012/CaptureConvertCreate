// ./components/OcrComponent.jsx

import React, { useState } from 'react'
import Tesseract from 'tesseract.js';

const OcrComponent = () => {
    const [ocrText, setOcrText] = useState('');

    const handleOcr = async (file) => {
        const {data : {text}} = await Tesseract.recognize(file, 'eng', {logger: m => console.log(m) });
        setOcrText(text);
    }

  return (
    <div>
        <input type="file" onChange={(e) => handleOcr(e.target.files[0])} />
        {ocrText && <p>{ocrText}</p>}
    </div>
  )
}

export default OcrComponent