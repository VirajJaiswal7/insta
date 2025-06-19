import Posts from "./Posts";
import Storys from "./Storys";
import Suggestions from "./Suggestions";

const Left = () => {
  return (
    <div className="w-full lg:w-[60%]  my-5 space-y-8 ">
      <Storys />
      <Suggestions />
      <Posts />
    </div>
  );
};

export default Left;
