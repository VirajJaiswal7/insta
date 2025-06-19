import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Suggestions = () => {
  const otherUsers = useSelector((store) => store?.user?.otherUsers);
  const navigate = useNavigate();

  return (
    <div className="md:ml-16">
      <div className="flex justify-between">
        <p className="font-semibold text-[18px]">Suggestions for you</p>
        <p className="font-medium text-blue-700 cursor-pointer">See all</p>
      </div>
      <div className="flex mt-3 overflow-hidden overflow-x-auto gap-8 scrollbar">
        {/* add maping */}
        {otherUsers?.map((user, index) => (
          <div
            key={index}
            className="border flex flex-col cursor-pointer"
            onClick={() => navigate(`/profile/${user?._id}`)}
          >
            <span className="flex justify-end w-full pt-1 pr-2">
              <RxCross2 className="w-5 h-5 cursor-pointer" />
            </span>
            <div className="flex flex-col items-center px-12 pb-14">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={user?.photo || "https://github.com/shadcn.png"}
                  className="object-cover"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium">{user?.username}</h1>
              <p className="text-gray-700 text-[16px]">Suggested for you</p>
            </div>
            <div className="text-blue-700 border-t w-full py-2 text-center cursor-pointer">
              Following
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Suggestions;
