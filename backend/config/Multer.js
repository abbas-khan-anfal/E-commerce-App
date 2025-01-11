import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// create a cloudinary stoarge
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});


// Use Cloudinary Storage for Multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads", // Folder in Cloudinary
      allowed_formats: ["jpg", "png", "jpeg"], // Allowed formats
    },
  });
  
  // Create Multer upload
  const productUpload = multer({ storage: storage });
  
  export default productUpload;
