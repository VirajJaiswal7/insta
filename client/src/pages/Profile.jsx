import Add from "@/components/Profile/Add";
import Footer from "@/components/Profile/Footer";
import Header from "@/components/Profile/Header";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [users, setUsers] = useState();
  const { id } = useParams();
  const allUser = useSelector((store) => store?.user?.allUsers);

  const filterUser = () => {
    const user = allUser?.find((item) => item?._id === id); // use find because filter return array but I not need multiple user I want only single user than use find
    setUsers(user);
    console.log(user);
  };

  useEffect(() => {
    filterUser();
  }, [id]);

  return (
    <div className="mx-40 my-8">
      <Header users={users} />
      <Add />
      <Footer users={users} />
    </div>
  );
};

export default Profile;
