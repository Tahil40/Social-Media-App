import userModel from "../models/user.model";
import postsModel from "../models/posts.model";
import commentsModel from "../models/comments.model";

export const activeCheck = (req, res) => {
  return res.status(200).json({ message: "Running" });
};

export const createPost = async (req, res) => {
  const { token } = req.body;

  try {
    const user = await userModel.findOne({ token });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const posts_object = new postsModel({
      userId: user._id,
      body: req.body.body,
      media: req.file != "undefined" ? req.file.filename : "",
      fileType: req.file != "undefined" ? req.file.mimetype.split("/")[1] : "",
    });

    await posts_object.save();

    return res.status(200).json({ message: "post created" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts_data = await postsModel
      .find()
      .populate("userId", "name username email profilePicture");

    return res.status(200).json({ posts_data });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { token, post_id } = req.body;

    const user = await userModel.findOne({ token: token }).select("_id");

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const post = await postsModel.findOne({ _id: post_id });

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    if (user._id.toString() !== post.userId.toString()) {
      return res.status(401).json({ message: "unauthorized" });
    }

    await postsModel.deleteOne({ _id: post_id });

    return res.status(200).json({ message: "post deleted" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export const commentPost = async (req, res) => {
  try {
    const { token, postId, commentBody } = req.body;

    const user_id = await userModel.findOne({ token: token }).select("_id");

    if (!user_id) {
      return res.status(404).json({ message: "user not found" });
    }

    const post = await postsModel.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    const comment = new commentsModel({
      userId: user_id,
      postId: postId,
      body: commentBody,
    });

    await comment.save();

    return res.status(200).json({ message: "comment created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPostComments = async (req, res) => {
  try {
    const { postId } = req.body;

    const post = await postsModel.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({ message: "post not found" });
    }

    return res.status(200).json({ comments: post.comment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};