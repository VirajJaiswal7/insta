import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import toast from "react-hot-toast";
import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserPhoto } from "../../redux/userSlice";

const EditProfile = () => {
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const { BackendUrl } = useBackend();
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.user?.user);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", photo);
      formData.append("name", name);
      formData.append("bio", bio);

      const res = await axios.put(
        `${BackendUrl}/api/user/updateprofile`,
        formData,
        { withCredentials: true }
      );

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setUserPhoto(res?.data?.photo));
        navigate(`/profile/${user?.user?._id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen w-full p-8 flex flex-col justify-center items-center"
    >
      <div className="w-[600px] space-y-6">
        <div className="flex justify-between items-center">
          <span>
            <Avatar className="w-18 h-18">
              <AvatarImage
                src={
                  photo
                    ? URL.createObjectURL(photo)
                    : "https://github.com/shadcn.png"
                }
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </span>
          <label htmlFor="image">
            <div className="bg-blue-500 rounded-sm px-3 py-1.5 text-white inline-block">
              Upload Image
            </div>
            <input
              type="file"
              hidden
              id="image"
              // accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </label>
        </div>
        <div className="space-y-4">
          <h1 className="font-semibold text-[18px] tracking-wide">Name</h1>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Full Name"
            className="outline-none border border-gray-200 p-2 w-full ring ring-blue-400"
          />
        </div>
        <div className="space-y-4">
          <h1 className="font-semibold text-[18px] tracking-wide">Bio</h1>
          <input
            onChange={(e) => setBio(e.target.value)}
            value={bio}
            type="text"
            placeholder="Bio"
            className="outline-none border border-gray-200 p-2 w-full  ring ring-blue-400"
          />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-12 py-2 cursor-pointer rounded-md mt-6"
      >
        Update
      </button>
    </form>
  );
};

export default EditProfile;
