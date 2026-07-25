import { Router } from "express";
import { activeCheck, createPost, getAllPosts, deletePost, commentPost, getPostComments, deleteComment } from "../controllers/posts.controller";
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
router.route("post/get-posts").get(getAllPosts);
router.route("/post/delete-post").delete(deletePost);
router.route("/post/create-post-comment").post(commentPost);
router.route("/post/get-post-comments").get(getPostComments);
router.route("/post/delete-comment").delete(deleteComment);

export default router; 