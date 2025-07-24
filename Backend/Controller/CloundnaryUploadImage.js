import multer from "multer";
import cloudinary from "cloudinary";

// Cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Upload Image & Return URL
export const UploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

   
    cloudinary.v2.uploader.upload_stream({ folder: "uploads" }, (error, result) => {
      if (error) return res.status(500).json({ error: error.message });

    
      res.json({ message: "Image uploaded successfully", imageUrl: result.secure_url });
    }).end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
