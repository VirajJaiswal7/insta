import { User } from "../models/user.model.js";
import { uploadMedia } from "../utils/cloudinary.js";

export const getOtherUsers = async (req, res) => {
  try {
    const userId = req.id;
    const otherUsers = await User.find({ _id: { $ne: userId } });

    return res.status(200).json({
      success: true,
      users: otherUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const followUser = async (req, res) => {
  try {
    const userId = req.id;
    const targetUserId = req.params.targetUserId;

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(400).json({
        message: "User not exist",
        success: false,
      });
    }
    if (userId === targetUserId) {
      return res.status(400).json({
        message: "You are follow yourself",
      });
    }

    if (
      currentUser.following.includes(targetUserId) ||
      targetUser.followers.includes(userId)
    ) {
      return res.status(400).json({
        message: "You already followed this user",
        success: false,
      });
    }

    currentUser.following.push(targetUserId);
    targetUser.followers.push(userId);

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({
      message: "Followed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const userId = req.id;
    const targetUserId = req.params.targetUserId;

    const targetUser = await User.findById(targetUserId);
    const currentUser = await User.findById(userId);

    if (!targetUser) {
      return res.status(400).json({
        message: "User not exist",
        success: false,
      });
    }

    if (targetUserId === userId) {
      return res.status(400).json({
        message: "you are not unfollow yourself",
        success: false,
      });
    }

    if (
      !currentUser.following.includes(targetUserId) ||
      !targetUser.followers.includes(userId)
    ) {
      return res.status(400).json({
        message: "You not follows this user",
        success: false,
      });
    }

    currentUser.following.pull(targetUserId);
    targetUser.followers.pull(userId);

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({
      message: "unfollowed successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { name, bio } = req.body;
    const photo = req?.file;

    const user = await User.findById(userId);

    let photoUrl;
    if (photo) {
      const clodudinaryResponse = await uploadMedia(photo?.path);
      photoUrl = clodudinaryResponse?.secure_url;
    } else {
      photoUrl = user?.photo;
    }

    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        photo: photoUrl,
        name: name || user?.name,
        bio: bio,
      },
      { new: true }
    );

    await updateUser.save();

    return res.status(200).json({
      message: "updated successfully",
      success: true,
      photo: updateUser.photo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
