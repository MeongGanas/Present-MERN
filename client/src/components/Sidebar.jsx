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
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DataContext } from "../hooks/dataContext";

export default function Sidebar({ resource, setActive }) {
  const absenteeData = resource.data.read().absentee;
  const { absentee, setAbsentee } = useContext(DataContext);

  useEffect(() => {
    if (!absentee) {
      setAbsentee(absenteeData);
    }
  });

  return (
    <>
      <div className="border-b-2 pt-4 pb-3">
        <Link
          to="/home"
          className="sidemenu"
          onClick={() => {
            if (setActive) {
              setActive(false);
            }
          }}
        >
          <img src={home} alt="" width="24" />
          <span>Home</span>
        </Link>
      </div>
      <div className="py-3">
        <Accordion allowMultiple defaultIndex={[0]}>
          <AccordionItem>
            <h2 className="px-10">
              <AccordionButton>
                <div className="flex items-center gap-6 py-3 font-bold w-full">
                  <img src={list} alt="" width="24" />
                  Lists
                </div>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <ul className="mt-2">
                {absenteeData &&
                  absenteeData.map((absent) => (
                    <li key={absent._id}>
                      <Link
                        to={`/detailAbsent/${absent._id}/${absent.name}`}
                        className="flex items-center gap-6 py-3 pl-9 pr-10 hover:bg-slate-100 duration-200 transition w-full font-bold"
                        onClick={() => {
                          if (setActive) {
                            setActive(false);
                          }
                        }}
                      >
                        <span
                          className="border h-8 min-w-8 rounded-full uppercase flex items-center justify-center text-slate-100"
                          style={{
                            backgroundColor: absent.color,
                          }}
                        >
                          {absent.name[0]}
                        </span>
                        {absent.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="border-t-2 py-3">
        <Link
          to="/settings"
          className="sidemenu"
          onClick={() => {
            if (setActive) {
              setActive(false);
            }
          }}
        >
          <img src={setting} alt="" width="24" />
          <span>Settings</span>
        </Link>
      </div>
    </>
  );
}
