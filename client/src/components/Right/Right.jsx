import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RxCross2 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Right = () => {
  const [openLogin, setOpenLogin] = useState(false);
  const navigate = useNavigate();
  const otherUsers = useSelector((store) => store?.user?.otherUsers);
  const userPhoto = useSelector((store) => store?.user?.userPhoto);
  const user = useSelector((store) => store?.user?.user);
  console.log(user);
  return (
    <>
      <div className="hidden lg:block w-[30%] my-7 space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage
                src={userPhoto || user?.user?.photo}
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="-space-y-1">
              <h1 className="font-semibold text-[14px]">
                {user?.user?.username}
              </h1>
              <p className="text-gray-700">{user?.user?.name}</p>
            </div>
          </div>
          <div
            className="text-blue-700 font-semibold text-sm cursor-pointer"
            onClick={() => setOpenLogin(!openLogin)}
          >
            Switch
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-800 text-[16px] font-semibold">
            Suggest for you
          </p>
          <p className="font-semibold text-[14px]">See All</p>
        </div>
        <div className="space-y-2">
          {/* map */}
          {otherUsers?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center cursor-pointer"
              onClick={() => navigate(`/profile/${item?._id}`)}
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage
                    src={item?.photo || "https://github.com/shadcn.png"}
                    className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="-space-y-1">
                  <h1 className="font-semibold text-[14px]">{item.username}</h1>
                  <p className="text-gray-700 text-[16px]">Suggested for you</p>
                </div>
              </div>
              <div className="text-blue-700 font-semibold text-sm">Follow</div>
            </div>
          ))}
        </div>
      </div>
      {openLogin && (
        <div className="fixed top-1/2  left-1/2  -translate-x-1/2 -translate-y-1/2 bg-gray-50 rounded-md shadow-md py-4 w-[400px] px-4">
          <span className="flex justify-end">
            <RxCross2 className="w-7 h-7" onClick={() => setOpenLogin(false)} />
          </span>
          <div className="px-12">
            <h1 className="text-4xl font-semibold pt-8 pb-10 text-center font-serif">
              Instagram
            </h1>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="username, email"
                className="outline-none border w-full p-1.5"
              />
              <input
                type="password"
                placeholder="Password"
                className="outline-none border w-full p-1.5"
              />
              <div className="flex gap-1 items-center py-1">
                <input type="checkbox" />
                <p className="text-[13px]">Save login info</p>
              </div>
              <button className="font-semibold bg-blue-500 text-white w-full py-1 rounded-md">
                Log in
              </button>
              <p className="text-center font-semibold pt-2 pb-4">
                Forgot password?
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Right;
