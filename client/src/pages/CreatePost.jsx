import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const { BackendUrl } = useBackend();

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("description", description);
      const res = await axios.post(`${BackendUrl}/api/post/addpost`, formData, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <form onSubmit={handlePost} className="p-8 w-[700px]">
      <div className="flex justify-between items-center">
        {file ? (
          file.type?.startsWith("image/") ? (
            <img
              src={URL.createObjectURL(file)}
              alt=""
              className="w-[200px] h-[160px] object-contain"
            />
          ) : file.type?.startsWith("video/") ? (
            <video
              src={URL.createObjectURL(file)}
              className="w-[200px] h-[160px] object-contain"
            />
          ) : (
            <p>Unsupported file type</p>
          )
        ) : (
          <img
            src="https://github.com/shadcn.png"
            alt="default"
            className="w-[200px] h-[160px] object-contain"
          />
        )}
        <label htmlFor="image">
          <div className="text-white bg-blue-500 px-8 py-2 inline-block">
            Upload
          </div>
          <input
            onChange={(e) => setFile(e?.target?.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      </div>
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        type="text"
        className="border-b border-gray-200 w-full p-2 my-6 outline-none"
        placeholder="Enter a discription"
      />
      <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 px-6 py-2 text-white">
          Post
        </button>
      </div>
    </form>
  );
};

export default CreatePost;
