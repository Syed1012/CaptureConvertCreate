// ./server/server.js

import express, { json } from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import puppeteer from "puppeteer";
import cloudinary from "cloudinary";
import multer from "multer";

//Configure env
dotenv.config();

//connect DB
connectDB();

// Rest Object
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());


// Configure Cloudinary
cloudinary.config({
  cloud_name: "da5gwhx7p",
  api_key: "571137729922285",
  api_secret: "UhAbsEc88ck3BRGOm23-6IcmRpw",
});


// Configure Multer for file uploads
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route for file upload
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, { upload_preset: "ScreenShotApp" });
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).send("Failed to upload file");
  }
});

app.get("/capture", async (req, res) => {
  try {
    const url = req.query.url;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 720,
    });
    await page.goto(url);
    const buffer = await page.screenshot();
    res.header("Content-Type", "image/png");
    res.header("Content-Disposition", "inline; filename=screenshot.png");
    return res.send(buffer);
  } catch (error) {
    console.error("Error capturing screenshot:", error);
    res.status(500).send("Failed to capture screenshot");
  }
});

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
