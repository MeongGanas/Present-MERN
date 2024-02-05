import { Add, ChevronRight, Menu } from "@mui/icons-material";
import orang from "../img/4836491 1.svg";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import home from "../img/4836512 1.svg";
import setting from "../img/4860084 1.svg";
import list from "../img/5504165 1.svg";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Dialog from "../components/Dialog";

export default function Layout({ children }) {
  const location = useLocation();
  const [active, setActive] = useState(false);
  const [dialogActive, setDialogActive] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const path = location.pathname;

    setUrl(path);
  }, [location]);

  return (
    <>
      {dialogActive && (
        <div className="fixed top-0 left-0 bottom-0 right-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center ">
          <Dialog />
        </div>
      )}
      <nav className="fixed z-50 bg-white flex justify-between items-center shadow-md border-b px-5 md:px-10 py-3 top-0 left-0 w-full">
        <div className="flex items-center gap-5 md:gap-10">
          <button onClick={() => setActive(!active)}>
            <Menu />
          </button>
          <div className="flex items-center">
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
              location.pathname === "/home" || location.pathname == "/settings"
                ? "block"
                : "hidden"
            }`}
            onClick={() => setDialogActive(true)}
          >
            <Add />
          </button>
          <button className="iconbutton">
            <img src={orang} alt="" width={26} />
          </button>
        </div>
      </nav>

      <div
        className={`bg-white z-10 fixed left-0 top-0 ${
          active
            ? "block w-56 translate-x-0"
            : "w-56 -translate-x-full lg:block"
        } h-screen pt-16 border-r-2 border-[#D9D9D9] transition-all duration-300`}
      >
        <div className="border-b-2 pt-4 pb-3">
          <Link to="/home" className="sidemenu">
            <img src={home} alt="" width="24" />
            <span>Home</span>
          </Link>
        </div>
        <div className="py-3">
          <Accordion allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <div className="flex items-center gap-8 py-3 px-10 font-bold">
                    <img src={list} alt="" width="24" />
                    Lists
                  </div>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <ul className="mt-2">
                  <li>
                    <Link to="/list1" className="sidemenu">
                      <span className="border h-6 w-6 rounded-full border-black"></span>
                      List 1
                    </Link>
                  </li>
                </ul>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="border-t-2 py-3">
          <Link to="/settings" className="sidemenu">
            <img src={setting} alt="" width="24" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      <main
        className={`${
          active ? "lg:pl-56" : "lg:pl-0"
        } transition-all duration-300 pt-16 w-full h-screen`}
      >
        {children}
      </main>
    </>
  );
}
