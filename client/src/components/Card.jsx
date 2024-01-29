import { MoreHoriz } from "@mui/icons-material";
import background from "../img/Mask group.png";
import setting from "../img/4860084 1.svg";

function Card() {
  return (
    <div className="w-full min-w-80 max-w-sm shadow-md rounded-md overflow-hidden">
      <img src={background} alt="" className="w-full max-h-40" />
      <div className="px-5 py-3">
        <div className="flex justify-between items-center ">
          <h1 className="text-xl font-bold">List 1</h1>
          <button className="iconbutton">
            <MoreHoriz />
          </button>
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">Nama yang punya</h1>
          <button className="iconbutton">
            <img src={setting} alt="" width="24" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WholeCard() {
  return (
    <div className="flex p-5 justify-center">
      <div className="grid grid-cols-1 max-w-screen-lg md:grid-cols-2 xl:grid-cols-3 gap-5">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
