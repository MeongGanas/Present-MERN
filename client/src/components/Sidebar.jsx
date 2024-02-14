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

export default function Sidebar({ absentee }) {
  return (
    <>
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
                {absentee &&
                  absentee.map((absent) => (
                    <li key={absent._id}>
                      <Link
                        to={`/${absent.name}/${absent._id}`}
                        className="sidemenu"
                      >
                        <span className="border h-6 w-6 rounded-full border-black"></span>
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
        <Link to="/settings" className="sidemenu">
          <img src={setting} alt="" width="24" />
          <span>Settings</span>
        </Link>
      </div>
    </>
  );
}
