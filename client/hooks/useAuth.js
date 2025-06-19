import { useState } from "react";
import { useBackend } from "./useBackend";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthenticate, setUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const { BackendUrl } = useBackend();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [login, setLogin] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (login) {
      try {
        const res = await axios.post(
          `${BackendUrl}/api/user/login`,
          { email, password },
          { withCredentials: true }
        );

        if (res?.data?.success) {
          toast.success(res?.data?.message);
          dispatch(setAuthenticate(true));
          dispatch(setUser(res?.data));
          navigate("/")
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    } else {
      try {
        const res = await axios.post(
          `${BackendUrl}/api/user/register`,
          { name, username, email, password },
          { withCredentials: true }
        );

        if (res?.data?.success) {
          toast.success(res?.data?.message);
          dispatch(setAuthenticate(true));
          dispatch(setUser(res?.data));
          navigate("/")
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return {
    name,
    email,
    password,
    username,
    setName,
    setEmail,
    setPassword,
    setUsername,
    handleSubmit,
    login,
    setLogin,
  };
};
