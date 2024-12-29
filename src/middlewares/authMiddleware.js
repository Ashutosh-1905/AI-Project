import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import config from "../config/config.js";

export const authUser = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(createHttpError(401, "Access Denied. No token provided."));
    }

    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return next(createHttpError(401, "Invalid or Expired Token."));
  }
};
