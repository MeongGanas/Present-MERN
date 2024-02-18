import { Info, Logout, MoreHoriz } from "@mui/icons-material";
import background from "../img/Mask group.png";
import setting from "../img/4860084 1.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { TabContext } from "../hooks/tabContext";
import { DataContext } from "../hooks/dataContext";
import { LoadingContext } from "../hooks/loadingContext";
import { leaveAbsentee } from "../lib/actions";

export default function Card({ absent }) {
  const [admin, setAdmin] = useState(false);
  const [more, setMore] = useState(false);
  const { setActiveIndex } = useContext(TabContext);
  const { userData } = useContext(DataContext);
  const { setLoading } = useContext(LoadingContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (absent.userId === userData._id) {
      setAdmin(true);
    }
  }, [absent]);

  const leave = async (userId) => {
    setLoading(true);
    await leaveAbsentee(absent._id, userId).then(() => setLoading(false));
  };

  return (
    <div className="w-full bg-white min-w-80 max-w-sm shadow-md rounded-md overflow-hidden">
      <Link to={`/${absent.name}/${absent._id}`}>
        <img
          src={background}
          alt=""
          className="w-full max-h-40 cursor-pointer"
        />
      </Link>
      <div className="px-5 py-3">
        <div className="flex justify-between items-center">
          <Link to={`/${absent.name}/${absent._id}`}>
            <h1 className="text-xl font-bold underline cursor-pointer">
              {absent.name}
            </h1>
          </Link>
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
                  <button
                    className="selectButton"
                    onClick={() => {
                      navigate(`/${absent.name}/${absent._id}`);
                      setActiveIndex(2);
                    }}
                  >
                    <Info className="mr-2" />
                    <span>Info</span>
                  </button>
                  <button
                    className="selectButton text-red-700"
                    onClick={() => leave(userData._id)}
                  >
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
          <div className="w-full flex justify-end mt-3">
            <button
              className="iconbutton"
              onClick={() => {
                setActiveIndex(3);
                navigate(`/${absent.name}/${absent._id}`);
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
