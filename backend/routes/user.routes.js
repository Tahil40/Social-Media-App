import { Router } from "express";
import { registerUser, loginUser, uploadProfilePicture } from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage: storage});

router.route("/auth/register-user").post(registerUser);
router.route("/auth/login-user").post(loginUser);
router.route("/update-profile-picture").post(upload.single("profile-picture"), uploadProfilePicture);

export default router;