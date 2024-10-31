import { ApiResponse } from "./ApiResponse.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 15 * 24 * 60 * 60 * 1000,
  sameSite: "none",
  httpOnly: true,
  secure: true,
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res
    .status(code)
    .cookie("sm-token", token, cookieOptions)
    .json(new ApiResponse(code, user, message));
};

export { sendToken,cookieOptions };
