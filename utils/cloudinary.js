import { v2 as cloudinary } from "cloudinary";
import { ErrorHandler } from "./utility.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary=async(filepath)=>{
    try {
        if(!filepath) return null;

        const response=await cloudinary.uploader.upload(filepath,{
            resource_type: "auto"
        });
        console.log("cloudinary response:",response);
        return response;

    } catch (error) {
        console.log("error uploading cloudinary",error);
        
        new ErrorHandler(error)
    }
}
export{
    uploadOnCloudinary
}