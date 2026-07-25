import { Router } from "express";
import { registerUser, loginUser, uploadProfilePicture, updateUserProfile, getUserAndProfile, updateProfileData, getAllUserProfiles, downloadUserProfile } from "../controllers/user.controller.js";
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
router.route("/user/update-profile-picture").post(upload.single("profile-picture"), uploadProfilePicture);
router.route("/user/get-userProfile").get(getUserAndProfile);
router.route("/user/update-profile").put(updateProfileData);
router.route("/user/get-user-profiles").get(getAllUserProfiles);
router.route("/user/download-resume").get(downloadUserProfile);

export default router;