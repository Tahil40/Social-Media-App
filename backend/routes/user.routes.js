import { Router } from "express";
import { registerUser, loginUser, uploadProfilePicture, updateUserProfile, getUserAndProfile, updateProfileData, getAllUserProfiles, downloadUserProfile, sendConnectionRequest, getMyConnectionsRequests, fetchMyConnections, connectionRequestStatus, getUserProfileAndUserBasedOnUsername } from "../controllers/user.controller.js";
import multer from "multer";

const router = Router();

const user_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage: user_storage});

router.route("/auth/register-user").post(registerUser);
router.route("/auth/login-user").post(loginUser);
router.route("/user/update-profile-picture").post(upload.single("profile-picture"), uploadProfilePicture);
router.route("/user/get-userProfile").get(getUserAndProfile);
router.route("/user/update-profile").put(updateProfileData);
router.route("/user/get-user-profiles").get(getAllUserProfiles);
router.route("/user/download-resume").get(downloadUserProfile);
router.route("/user/send-connection-request").post(sendConnectionRequest);
router.route("/user/get-my-connections-requests").get(getMyConnectionsRequests);
router.route("/user/fetch-my-connections").get(fetchMyConnections);
router.route("/user/connection-request-status").post(connectionRequestStatus);
router.route("/user/get-profile-based-on-username").get(getUserProfileAndUserBasedOnUsername);

export default router;