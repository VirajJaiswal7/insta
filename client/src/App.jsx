import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LeftBar from "./components/LeftBar";
import Explore from "./pages/Explore";
import Reels from "./pages/Reels";
import Profile from "./pages/Profile";
import Account from "./pages/Account";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import EditProfile from "./components/EditProfile";
import CreatePost from "./pages/CreatePost";

const App = () => {
  const authenticate = useSelector((store) => store.user.authenticate);
  return (
    <div>
      <Toaster />
      {authenticate ? (
        <div className="flex">
          <div className="min-w-20 md:min-w-30 lg:w-[16%] fixed left-0 top-0">
            <LeftBar className="" />
          </div>
          <div className="ml-[16%] w-[84%]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/createpost" element={<CreatePost />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Account />
      )}
    </div>
  );
};

export default App;
