import { MoreHoriz } from "@mui/icons-material";
import background from "../img/Mask group.png";
import setting from "../img/4860084 1.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Card() {
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full min-w-80 max-w-sm shadow-md rounded-md overflow-hidden">
      <img
        src={background}
        alt=""
        onClick={() => navigate("/list/1")}
        className="w-full max-h-40 cursor-pointer"
      />
      <div className="px-5 py-3">
        <div className="flex justify-between items-center">
          <h1
            className="text-xl font-bold underline cursor-pointer"
            onClick={() => navigate("/list/1")}
          >
            List 1
          </h1>
          {!admin && (
            <button className="iconbutton">
              <MoreHoriz />
            </button>
          )}
        </div>

        {!admin && <h1 className="my-2">Nama yang punya</h1>}

        {admin && (
          <div className="w-full flex justify-end">
            <button className="iconbutton">
              <img src={setting} alt="" width="24" />
            </button>
          </div>
        )}
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
