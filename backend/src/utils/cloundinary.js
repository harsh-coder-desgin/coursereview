import {v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET
});


const uploadOnCloundinary = async (file,name) => {
  let foldername;
  if(name==="creatorproflie"){
    foldername="creatorproflie"
  }else{
    foldername="courses"
  }
  try {

    if (!file || !file.buffer) return null;

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: foldername, 
          public_id: file.originalname?.split(".")[0], 
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(file.buffer); 
    });

    return result;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

export { uploadOnCloundinary }