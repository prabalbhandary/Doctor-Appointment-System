import express from "express";
import { registerUser, loginUser, getUserData } from "../controllers/userControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/getUserData", authMiddleware, getUserData);
export default router;