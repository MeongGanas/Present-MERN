import { Info, Logout, MoreHoriz } from "@mui/icons-material";
import background from "../img/Mask group.png";
import setting from "../img/4860084 1.svg";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { TabContext } from "../hooks/tabContext";
import { LayoutContext } from "../hooks/dialogContext";
import NotJoin from "../ui/home/NotJoin";
import { getAbsentee } from "../lib/absentee";

export default function Card({ absent }) {
  const [admin, setAdmin] = useState(false);
  const [more, setMore] = useState(false);
  const { setActiveIndex } = useContext(TabContext);
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white min-w-80 max-w-sm shadow-md rounded-md overflow-hidden">
      <img
        src={background}
        alt=""
        onClick={() => navigate("/list1")}
        className="w-full max-h-40 cursor-pointer"
      />
      <div className="px-5 py-3">
        <div className="flex justify-between items-center">
          <h1
            className="text-xl font-bold underline cursor-pointer"
            onClick={() => navigate("/list1")}
          >
            {absent.name}
          </h1>
          {!admin && (
            <ClickAwayListener onClickAway={() => setMore(false)}>
              <div className="relative">
                <button className="iconbutton" onClick={() => setMore(!more)}>
                  <MoreHoriz />
                </button>
                <div
                  className={`absolute -top-2 right-10 ${
                    more ? "scale-100" : "scale-0"
                  } z-[9999] bg-white min-w-32 shadow-md transition-all duration-200 rounded-md overflow-hidden`}
                >
                  <button className="selectButton">
                    <Info className="mr-2" />
                    <span>Info</span>
                  </button>
                  <button className="selectButton text-red-700">
                    <Logout className="mr-2" />
                    <span>Keluar</span>
                  </button>
                </div>
              </div>
            </ClickAwayListener>
          )}
        </div>

        {!admin && <h1 className="my-2">{absent.ownerName}</h1>}

        {admin && (
          <div className="w-full flex justify-end">
            <button
              className="iconbutton"
              onClick={() => {
                setActiveIndex(3);
                navigate("/list1");
              }}
            >
              <img src={setting} alt="" width="24" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
