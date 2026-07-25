import { Router } from "express";
import { activeCheck, createPost } from "../controllers/posts.controller";
import multer from "multer";

const router = Router();

const post_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },  
});

const upload = multer({storage: post_storage});

router.route("/").get(activeCheck);
router.route("/post/create-post").post(upload.single("media"), createPost);

export default router; 