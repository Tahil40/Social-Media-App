import { Router } from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/auth/register-user").post(registerUser);
router.route("/auth/login-user").post(loginUser);

export default router;