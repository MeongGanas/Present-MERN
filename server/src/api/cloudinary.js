require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryImageUploadMethod = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      { resource_type: "auto", folder: "Present" },
      function (error, result) {
        if (error) reject(error);
        resolve(result);
      }
    );
  });
};

module.exports = { cloudinaryImageUploadMethod };
