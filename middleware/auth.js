import jwt from "jsonwebtoken";
import { TryCatch } from "../utils/TryCatchHandler.js";
import { ErrorHandler } from "../utils/utility.js";

const isAuth = TryCatch(async (req, res, next) => {
  const token = req.cookies["sm-token"];
  if (!token) {
    return next(new ErrorHandler("please login to access this route", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  console.log("decoded data: ", decodedData);
  req.user = decodedData._id;
  next();
});

export {
    isAuth
}
