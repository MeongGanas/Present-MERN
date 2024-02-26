import { Add, ChevronRight, Menu } from "@mui/icons-material";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Suspense, useContext, useEffect, useState } from "react";
import orang from "../img/4836491 1.svg";
import Sidebar from "../components/Sidebar";
import ClickAwayListener from "react-click-away-listener";
import { LayoutContext } from "../hooks/dialogContext";
import { ResourceContext } from "../hooks/resourceContext";
import Skeleton from "../components/skeletons/skeletons";
import Dialog from "../components/dialog/HomeDialog";

export default function Layout({ children }) {
  const location = useParams();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [lgActive, setLgActive] = useState(true);
  const [selectionActive, setSelectionActive] = useState(false);
  const { joinActive, createActive, setCreateActive, setJoinActive } =
    useContext(LayoutContext);
  const { resource } = useContext(ResourceContext);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const newLocation = location["*"].split("/");
    const loc = newLocation[newLocation.length - 1];
    setUrl(loc);
    setLoading(false);
  }, [location]);

  useEffect(() => {
    if (!resource) {
      navigate("/login");
    }
  }, [resource]);

  return (
    <Suspense
      fallback={
        <div className="cursor-wait">
          <Skeleton />
        </div>
      }
    >
      <Dialog
        joinActive={joinActive}
        createActive={createActive}
        setCreateActive={setCreateActive}
        setJoinActive={setJoinActive}
      />

      <ClickAwayListener onClickAway={() => setSelectionActive(false)}>
        <div>
          <button
            className={`iconbutton ${
              url === "home" || url === "settings" ? "block" : "hidden"
            } fixed top-3 right-16 md:right-24 z-[100]`}
            onClick={() => setSelectionActive(!selectionActive)}
          >
            <Add />
          </button>
          <div
            className={`fixed right-0 ${
              selectionActive ? "scale-100" : "scale-0"
            } sm:right-20 z-[100] top-16 bg-white shadow-md transition-all duration-200 rounded-md overflow-hidden`}
          >
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
        </div>
      </ClickAwayListener>

      <nav className="fixed z-50 bg-white flex justify-between items-center shadow-md border-b px-5 md:px-10 py-3 top-0 left-0 w-full">
        <div className="flex items-center gap-5 md:gap-10">
          <div className="flex items-center">
            <button
              className="mr-5 hidden lg:block"
              onClick={() => setLgActive(!lgActive)}
            >
              <Menu />
            </button>
            <Link
              to="/home"
              className="ml-8 lg:ml-0 font-bold text-xl sm:text-2xl text-primary"
            >
              Present
            </Link>
            {url && (
              <div>
                <ChevronRight className="mx-1" />
                <span className="text-sm sm:text-lg font-bold">
                  {decodeURIComponent(url)}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/settings" className="iconbutton">
            <img src={orang} alt="" width={26} />
          </Link>
        </div>
      </nav>

      <div
        className={`bg-white z-10 fixed left-0 top-0 ${
          lgActive
            ? "block w-[265px] translate-x-0"
            : "w-[265px] -translate-x-full"
        } h-screen pt-16 border-r-2 border-[#D9D9D9] hidden lg:block transition-all duration-300 overflow-y-auto `}
      >
        <Sidebar resource={resource} />
      </div>

      <ClickAwayListener
        onClickAway={() => setActive(false)}
        className="lg:hidden"
      >
        <div className="lg:hidden">
          <button
            className="fixed top-5 left-4 z-[200]"
            onClick={() => setActive(!active)}
          >
            <Menu />
          </button>
          <div
            className={`bg-white z-10 fixed left-0 top-0 ${
              active
                ? "block w-[265px] translate-x-0"
                : "w-[265px] -translate-x-full"
            } h-screen pt-16 border-r-2 border-[#D9D9D9] block lg:hidden transition-all duration-300`}
          >
            <Sidebar resource={resource} setActive={setActive} />
          </div>
        </div>
      </ClickAwayListener>

      <main
        className={`${
          lgActive ? "lg:pl-[265px]" : "lg:pl-0"
        } transition-all duration-300 pt-16 w-full min-h-screen bg-[#f8f8f9]`}
      >
        {!loading && <div>{children}</div>}
      </main>
    </Suspense>
  );
}
