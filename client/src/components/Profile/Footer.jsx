import axios from "axios";
import { useBackend } from "../../../hooks/useBackend";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Footer = ({ users }) => {
  console.log(users)
  const { BackendUrl } = useBackend();
  const [post, setPost] = useState([]);
  const handleMyPost = async () => {
    try {
      const res = await axios.get(
        `${BackendUrl}/api/post/getmypost/${users?._id}`,
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        setPost(res?.data?.post);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

useEffect(() => {
  if (users?._id) {
    handleMyPost();
  }
}, [users]);

  return (
    <div className="border-t border-gray-200 p-4">
      <h1
        className="font-semibold hover:underline cursor-pointer tracking-wider text-[18px] text-center my-4"
        onClick={handleMyPost}
      >
        Post
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {post.map((post, index) => (
          <div>
            <img src={post.file} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
