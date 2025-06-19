import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import axios from "axios";
import { useBackend } from "../../../hooks/useBackend";
import Post from "./Post";

const Posts = () => {

  const { BackendUrl } = useBackend();
  const [otherPost, setOtherPost] = useState([]);

  const getOtherPost = async () => {
    try {
      const res = await axios.get(`${BackendUrl}/api/post/getotherpost`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        setOtherPost(res?.data?.post);
        console.log(res?.data?.post);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getOtherPost();
  }, []);

  
  return (
    <div className="md:ml-16">
      <div>
        {/* add map */}
        {otherPost.map((post, index) => (
          <Post post={post} key={index}/>
        ))}
      </div>
    </div>
  );
};

export default Posts;
