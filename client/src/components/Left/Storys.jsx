import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Storys = () => {
  return (
    <div>
      <div className="ring-3 ring-red-300 rounded-full inline-block cursor-pointer">
        <Avatar className="w-16 h-16 border-2 border-black">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <p className="text-xs">Viraj.codes</p>
    </div>
  );
};

export default Storys;
