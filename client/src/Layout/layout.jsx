import { Add, ChevronRight, Menu } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import orang from "../img/4836491 1.svg";
import Dialog from "../components/Dialog";
import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const [selectionActive, setSelectionActive] = useState(false);
  const [joinActive, setJoinActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname;

    setUrl(path);
  }, [location]);

  return (
    <>
      {joinActive && (
        <Dialog
          title={"Join an absentee"}
          handleClose={() => setJoinActive(false)}
          label1={"List Code"}
          label2={"Display Name (optional)"}
          labelButton={"Join"}
        />
      )}

      {createActive && (
        <Dialog
          title={"Create an absentee"}
          handleClose={() => setCreateActive(false)}
          label1={"Absent name"}
          label2={"Owner Name (optional)"}
          labelButton={"Create"}
        />
      )}

      {selectionActive && (
        <div className="fixed right-20 z-[9999] top-16 bg-white shadow-md">
          <button
            className="selectButton"
            onClick={() => {
              setJoinActive(true);
              setSelectionActive(false);
            }}
          >
            Join Absentee
          </button>
          <button
            className="selectButton"
            onClick={() => {
              setCreateActive(true);
              setSelectionActive(false);
            }}
          >
            Create Absentee
          </button>
        </div>
      )}

      <nav className="fixed z-50 bg-white flex justify-between items-center shadow-md border-b px-5 md:px-10 py-3 top-0 left-0 w-full">
        <div className="flex items-center gap-5 md:gap-10">
          <div className="flex items-center">
            <button className="mr-5" onClick={() => setActive(!active)}>
              <Menu />
            </button>
            <Link
              to="/home"
              className="font-bold text-xl sm:text-2xl text-primary"
            >
              Present
            </Link>
            {url && (
              <div>
                <ChevronRight className="mx-1" />
                <span className="text-sm sm:text-lg font-bold">
                  {url.slice(1, url.length)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className={`iconbutton ${
              location.pathname === "/home" || location.pathname === "/settings"
                ? "block"
                : "hidden"
            }`}
            onClick={() => setSelectionActive(!selectionActive)}
          >
            <Add />
          </button>
          <button className="iconbutton" onClick={() => navigate("/settings")}>
            <img src={orang} alt="" width={26} />
          </button>
        </div>
      </nav>

      <div
        className={`bg-white z-10 fixed left-0 top-0 ${
          active
            ? "block w-56 translate-x-0 lg:-translate-x-full"
            : "w-56 -translate-x-full lg:translate-x-0"
        } h-screen pt-16 border-r-2 border-[#D9D9D9] transition-all duration-300`}
      >
        <Sidebar />
      </div>

      <main
        className={`${
          active ? "lg:pl-0" : "lg:pl-56"
        } transition-all duration-300 pt-16 w-full h-screen`}
      >
        {children}
      </main>
    </>
  );
}
