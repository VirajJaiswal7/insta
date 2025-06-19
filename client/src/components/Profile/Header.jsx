import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IoIosSettings } from "react-icons/io";

import { RxCross2 } from "react-icons/rx";
import { useFollowAndUnfollow } from "../../../hooks/useFollowAndUnfollow";

const Header = ({ users }) => {
  const {
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
  } = useFollowAndUnfollow({ users });

  return (
    <>
      <div className="mx-12">
        <div className="flex gap-24">
          <div>
            <Avatar className="w-40 h-40">
              <AvatarImage
                src={users?.photo || "https://github.com/shadcn.png"}
                className="object-cover"
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-1.5">
              <p className="text-xl font-semibold">{profileUser?.username}</p>
              {user?.user?._id === profileUser?._id ? (
                <>
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="bg-gray-200 hover:bg-gray-300 rounded-md py-1 px-3 ml-4 cursor-pointer"
                  >
                    Edit profile
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 rounded-md py-1 px-3 cursor-pointer">
                    View archive
                  </button>
                  <span onClick={() => setOpenLogout(true)}>
                    <IoIosSettings className="w-8 h-8" />
                  </span>
                </>
              ) : (
                <>
                  {follow ? (
                    <button
                      onClick={() => setOpen(true)}
                      className="bg-gray-300 hover:bg-gray-400 transition-all duration-200 rounded-md py-1 px-6 ml-4 cursor-pointer text-black"
                    >
                      Following..
                    </button>
                  ) : (
                    <button
                      onClick={handleFollow}
                      className="bg-blue-500 hover:bg-blue-600 transition-all duration-200 rounded-md py-1 px-6 ml-4 cursor-pointer text-white"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
            </div>
            <div className="flex gap-10">
              <p className="font-semibold">1 post</p>
              <p className="font-semibold">
                {profileUser?.followers?.length} followers
              </p>
              <p className="font-semibold">
                {profileUser?.following?.length} following
              </p>
            </div>
            <div>
              <h1 className="font-semibold">{profileUser?.name}</h1>
              <p className="text-sm text-gray-800">{profileUser?.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        {open && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md w-[300px] p-4 bg-white border border-gray-200 rounded-md">
            <span className="flex justify-end mb-3">
              <RxCross2 className="w-6 h-6" onClick={() => setOpen(false)} />
            </span>
            <button
              onClick={handleUnfollow}
              className="w-full p-2 bg-red-100 text-red-700"
            >
              Unfolow
            </button>
          </div>
        )}
      </div>
      <div>
        {openLogout && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-md w-[300px] p-4 bg-white border border-gray-200 rounded-md">
            <span className="flex justify-end mb-3">
              <RxCross2 className="w-6 h-6" onClick={() => setOpen(false)} />
            </span>
            <button
              onClick={handleLogout}
              className="w-full p-2 bg-red-100 text-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
