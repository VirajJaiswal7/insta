import toast from "react-hot-toast";
import Left from "../components/Left/Left";
import Right from "../components/Right/Right";
import { useEffect } from "react";
import axios from "axios";
import { useBackend } from "../../hooks/useBackend";
import { useDispatch } from "react-redux";
import { setAllUsers, setOtherUsers } from "../../redux/userSlice";

const Home = () => {
  const { BackendUrl } = useBackend();
  const dispatch = useDispatch();
  const getOtherUser = async () => {
    try {
      const res = await axios.get(`${BackendUrl}/api/user/otheruser`, {
        withCredentials: true,
      });

      if (res?.data?.success) {
        dispatch(setOtherUsers(res?.data?.users));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const getAllUser = async () => {
    try {
      const res = await axios.get(`${BackendUrl}/api/user/getalluser`, {
        withCredentials: true,
      });
      if (res?.data?.success) {
        dispatch(setAllUsers(res?.data?.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    getOtherUser();
    getAllUser();
  }, []);
  return (
    <div className="flex justify-between px-6 lg:px-30">
      <Left />
      <Right />
    </div>
  );
};

export default Home;
