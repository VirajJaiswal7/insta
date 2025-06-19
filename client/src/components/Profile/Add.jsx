import React from "react";
import { IoAddOutline } from "react-icons/io5";

const Add = () => {
  return (
    <div className="mx-10 my-14">
      <div className="border border-black inline-block rounded-full p-2">
        <IoAddOutline className="w-16 h-16" />
      </div>
      <p className="mx-6">New</p>
    </div>
  );
};

export default Add;
