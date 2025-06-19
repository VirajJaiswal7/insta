import { useDispatch, useSelector } from "react-redux";
import { useBackend } from "./useBackend";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import { setAuthenticate, setUserPhoto } from "../redux/userSlice";

export const useFollowAndUnfollow = ({ users }) => {
  const user = useSelector((store) => store?.user?.user);
  const { BackendUrl } = useBackend();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [follow, setFollow] = useState(false);

  // for open menu to unfollow
  const [open, setOpen] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  // 🔥 Maintain local copy of profile user (for reactivity)
  const [profileUser, setProfileUser] = useState(users);

  // When parent `users` prop changes, update local state
  useEffect(() => {
    setProfileUser(users);
  }, [users]);

  // Set initial follow status
  useEffect(() => {
    setFollow(profileUser?.followers?.includes(user?.user?._id));
  }, [profileUser, user]);

  const handleFollow = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${BackendUrl}/api/user/follow/${id}`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        // setFollow(true);

        // ✅ Update follower list in local state
        setProfileUser((prev) => ({
          ...prev,
          followers: [...prev.followers, user?.user?._id],
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUnfollow = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${BackendUrl}/api/user/unfollow/${id}`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setOpen(false);
        // setFollow(false);

        // ✅ Remove user from followers
        setProfileUser((prev) => ({
          ...prev,
          followers: prev.followers.filter((f) => f !== user?.user?._id),
        }));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    if (users?.followers?.includes(user?.user?._id)) {
      setFollow(true);
    } else {
      setFollow(false);
    }
  }, [users, user]);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${BackendUrl}/api/user/logout`);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        dispatch(setUserPhoto(null))
        dispatch(setAuthenticate(false));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return {
    user,
    profileUser,
    navigate,
    setOpen,
    handleFollow,
    handleUnfollow,
    handleLogout,
    open,
    follow,
    openLogout,
    setOpenLogout,
  };
};
