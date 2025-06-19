import React, { useEffect, useState } from "react";
import { LuSend } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import { RiBookmarkLine } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
import { IoBookmarkSharp } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useBackend } from "../../../hooks/useBackend";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Post = ({ post }) => {
  const [like, setLike] = useState(false);
  const [savedByUser, setSavedByUser] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const { BackendUrl } = useBackend();
  const user = useSelector((store) => store?.user?.user);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${BackendUrl}/api/post/likepost/${post?._id}`,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        setLike(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handledisLike = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${BackendUrl}/api/post/dislikepost/${post?._id}`,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        setLike(false);
        setLikeCount((prev) => prev - 1);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${BackendUrl}/api/post/savepost/${post?._id}`,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setSavedByUser(true);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUnsave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${BackendUrl}/api/post/unsavepost/${post?._id}`,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setSavedByUser(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const alreadyLiked = post?.likes?.some(
      (id) => id.toString() === user?.user?._id
    );
    const alreadySaved = post?.saved?.some(
      (id) => id.toString() === user?.user?._id
    );
    setLike(alreadyLiked);
    setSavedByUser(alreadySaved);
  }, [post, user]);

  return (
    <div>
      <div className=" border-t border-b py-4 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="ring-2 ring-red-300 rounded-full">
              <Avatar className="w-9 h-9 border-2 border-black">
                <AvatarImage
                  src={post?.creator?.photo || "https://github.com/shadcn.png"}
                  className="object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <p className="font-semibold">{post?.creator?.username}</p>
            <p>{post.createdAt.split("T")[0]}</p>
          </div>
          <span>
            <BsThreeDots className="w-6 h-6" />
          </span>
        </div>
        <div>
          <img
            src={post?.file}
            alt=""
            className="rounded w-full h-150 object-cover"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {like ? (
              <FcLike
                className="w-6 h-6  cursor-pointer"
                onClick={handledisLike}
              />
            ) : (
              <FaRegHeart
                className="w-6 h-6 hover:text-gray-600  cursor-pointer"
                onClick={handleLike}
              />
            )}
            <FaRegComment className="w-6 h-6 hover:text-gray-600 cursor-pointer" />
            <LuSend className="w-6 h-6 hover:text-gray-600 cursor-pointer" />
          </div>
          <div>
            {savedByUser ? (
              <IoBookmarkSharp
                className="w-8 h-8 hover:text-gray-600 cursor-pointer"
                onClick={handleUnsave}
              />
            ) : (
              <RiBookmarkLine
                className="w-8 h-8 hover:text-gray-600 cursor-pointer"
                onClick={handleSave}
              />
            )}
          </div>
        </div>
        <div>
          <p className="font-semibold">{likeCount} likes</p>
          <p className="text-gray-900">{post?.description}</p>
          <p className="font-semibold">{post?.creator?.username}</p>

          <p className="text-gray-900 text-[15px]">View all 118,469 comments</p>
          <input
            type="text"
            className="outline-none placeholder:text-gray-900 placeholder:text-[15px]"
            placeholder="Add a comment..."
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
