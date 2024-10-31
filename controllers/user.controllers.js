import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { TryCatch } from "../utils/TryCatchHandler.js";
import { ErrorHandler } from "../utils/utility.js";

const createUser = TryCatch(async (req, res, next) => {
  const { name, email, bio, password } = req.body;
  const file = req.file;
  if (!file) return next(new ErrorHandler("Please Upload Avatar"));

  const filePath = `data:${file.mimetype};base64,${file.buffer.toString(
    "base64"
  )}`;
  // console.log("filePath: ", filePath);
  const avatar = await uploadOnCloudinary(filePath);
  //   console.log("avatar: ", avatar);

  const user = await User.create({
    name,
    email,
    bio,
    password,
    avatar: avatar.secure_url,
  });
  return res
    .status(201)
    .json(new ApiResponse(201, name, "user created successfully"));
});

const login = () => {};
export { createUser, login };
