import User from "../models/userModel.js";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createHttpError(400, "This email is already registered."));
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashPassword });

    const token = await generateToken(user.email);

    return res.status(201).json({
      message: "User registered successfully.",
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while registering new user."));
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(createHttpError(400, "Invalid Email or Password."));
    }

    const token = await generateToken(user.email);

    return res.status(200).json({
      message: "Login successful.",
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    return next(createHttpError(500, "Error during login."));
  }
};

const logout = (req, res, next) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout Successful.",
      success: true,
    });
  } catch (error) {
    return next(createHttpError(500, "Error during logout."));
  }
};

const profile = (req, res, next) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    return next(createHttpError(500, "Error fetching profile."));
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ users });
  } catch (error) {
    return next(createHttpError(500, "Error fetching users."));
  }
};

export { register, login, logout, profile, getAllUsers };
