import { compare } from "bcrypt";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { cookieOptions, sendToken } from "../utils/featuers.js";
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
  sendToken(res, user, 201, "user created successfully");
  /*return res
    .status(201)
    .json(new ApiResponse(201, name, "user created successfully"));*/
});

const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return next(new ErrorHandler("Email not found", 404));

  const isMatch = await compare(password, user.password);

  if (!isMatch) return next(new ErrorHandler("Incorrect password", 404));

  sendToken(res, user, 200, "Logged in successfully");
});

const logout = TryCatch(async (req, res, next) => {
  const { email } = req.body;
  res
    .status(200)
    .cookie("sm-token", "", { ...cookieOptions, maxAge: 0 })
    .json(new ApiResponse(200, email, "Logged out successfully"));
});

const getProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user);
  res.status(200).json(new ApiResponse(200, user, "User profile"));
});
export { createUser, login, logout, getProfile };
