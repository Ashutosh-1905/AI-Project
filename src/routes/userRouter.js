import { Router } from "express";
import * as userController from "../controllers/userController.js";
import { body } from "express-validator";
import { authUser } from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
  "/register",
  body("email").isEmail().withMessage("Invalid email address."),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters."),
  userController.register
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Invalid email address."),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters."),
  userController.login
);

router.get("/logout", authUser, userController.logout);
router.get("/profile", authUser, userController.profile);
router.get("/all", authUser, userController.getAllUsers);

export default router;