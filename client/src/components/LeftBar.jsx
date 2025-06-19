import { GoHomeFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import { PiFilmReelBold } from "react-icons/pi";
import { LuSend } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";
import { BsFileBarGraph } from "react-icons/bs";
import { FaRegCircle } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { GrInstagram } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useSelector } from "react-redux";

const LeftBar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store?.user?.user);
  const userPhoto = useSelector((store) => store?.user?.userPhoto);
  // console.log(user.user._id)

  const leftMenu = [
    { logo: <GoHomeFill className="w-7 h-7" />, heading: "Home", path: "/" },
    { logo: <IoSearchOutline className="w-7 h-7" />, heading: "Search" },
    {
      logo: <MdOutlineExplore className="w-7 h-7" />,
      heading: "Explore",
      path: "/explore",
    },
    {
      logo: <PiFilmReelBold className="w-7 h-7" />,
      heading: "Reels",
      path: "/reels",
    },
    { logo: <LuSend className="w-6 h-6" />, heading: "Messages" },
    { logo: <FaRegHeart className="w-6 h-6" />, heading: "Notifications" },
    {
      logo: <FiPlusSquare className="w-7 h-7" />,
      heading: "Create",
      path: "/createpost",
    },
    { logo: <BsFileBarGraph className="w-6 h-6" />, heading: "Dashboard" },
    {
      logo: (
        <Avatar className="w-7 h-7">
          <AvatarImage
            src={userPhoto || user?.user?.photo}
            className="object-cover"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ),
      heading: "Profile",
      path: `/profile/${user?.user?._id}`,
    },
    { logo: <FaRegCircle className="w-6 h-6" />, heading: "Meta AI" },
    { logo: <FaThreads className="w-7 h-7" />, heading: "Threads" },
  ];

  return (
    <div className="border-r px-3  py-3 max-h-screen">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-[26px] px-4 my-4 font-serif hidden md:block">
          Instagram
        </h1>
        <span className="md:hidden block">
          <GrInstagram className="w-8 h-8 my-4" />
        </span>
        <div className="flex flex-col gap-4">
          {leftMenu.map((item, index) => (
            <div
              className="flex gap-3 hover:bg-gray-100 px-2 py-2 cursor-pointer transition-all duration-200 rounded-lg"
              onClick={() => navigate(item.path)}
            >
              <span>{item.logo}</span>
              <p className="hidden md:block">{item.heading}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
