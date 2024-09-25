const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
  cloud_name: "dlyfwzhsc",
  api_key: "374864393439171",
  api_secret: "IJmEMh2W6OwCQr4rGBDyR6IjTu8",
});

const storage = new multer.memoryStorage();

async function imageUploadUtils(file) {
  const data = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return data;
}

const upload = multer({
  storage,
});

module.exports = { upload, imageUploadUtils };
