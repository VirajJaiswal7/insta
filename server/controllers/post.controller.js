import { Post } from "../models/post.model.js";
import { uploadMedia } from "../utils/cloudinary.js";

export const addPost = async (req, res) => {
  try {
    const userId = req.id;
    const { description } = req.body;
    const file = req?.file;

    if (!file) {
      return res.status(400).json({
        message: "photo or video must be required",
        success: false,
      });
    }
    const clodudinaryResponse = await uploadMedia(file?.path);

    const post = new Post({
      file: clodudinaryResponse.secure_url,
      description,
      creator: userId,
    });

    await post.save();

    return res.status(201).json({
      message: "post created successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
    });
  }
};

export const getMyPost = async (req, res) => {
  try {
    const userId = req?.params?.userId;
    const post = await Post.find({ creator: userId });
    if (post.length === 0) {
      return res.status(400).json({
        message: "post not found",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find({});
    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
    });
  }
};

export const getOtherPost = async (req, res) => {
  try {
    const userId = req.id;
    const post = await Post.find({ creator: { $ne: userId } }).populate(
      "creator",
      "name username photo"
    );
    return res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        message: "post not found",
        success: false,
      });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).json({
        message: "You are already like this user",
      });
    }

    post.likes.push(userId);

    await post.save();

    return res.status(200).json({
      message: "",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
    });
  }
};

export const dislikePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params?.postId;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(400).json({
        message: "post not found",
        success: false,
      });
    }

    if (!post?.likes?.includes(userId)) {
      return res.status(400).json({
        message: "You are not liked a post",
        success: false,
      });
    }

    post?.likes?.pull(userId);
    await post.save();

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
    });
  }
};

export const savePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params?.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post.saved.includes(userId)) {
      return res.status(400).json({
        message: "You already saved this post",
      });
    }

    post.saved.push(userId);
    await post.save();

    return res.status(200).json({
      message: "post saved successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
    });
  }
};

export const unSavePost = async (req, res) => {
  try {
    const userId = req.id;
    const postId = req.params?.postId;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (!post.saved.includes(userId)) {
      return res.status(400).json({
        message: "You not save this post",
      });
    }

    post.saved.pull(userId);
    await post.save();

    return res.status(200).json({
      message: "post unsaved successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internel server error",
      success: false,
    });
  }
};
