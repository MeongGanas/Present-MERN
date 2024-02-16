import { useContext, useEffect } from "react";
import { TabContext } from "../hooks/tabContext";
import setting from "../img/4860084 1.svg";
import { MoreHoriz } from "@mui/icons-material";
import {
  AttendanceLog,
  ListHomeAsAdmin,
  ListHomeAsUser,
  ListPeople,
  SettingsAbsentAdmin,
  SettingsAbsentPeserta,
} from "../ui/Detail/UI";
import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  ChakraProvider,
} from "@chakra-ui/react";

export default function AbsenteeDetail({ absent, admin }) {
  const { activeIndex, setActiveIndex } = useContext(TabContext);

  useEffect(() => {
    console.log(absent);
  }, [absent]);

  return (
    <ChakraProvider>
      <Tabs index={activeIndex} onChange={setActiveIndex} colorScheme="blue">
        <TabList bg={"white"}>
          <div className="sm:px-5 flex">
            <Tab>
              <div className="p-2">Home</div>
            </Tab>
            {admin && (
              <Tab>
                <div className="p-2">Attendance</div>
              </Tab>
            )}
            <Tab>
              <div className="p-2">People</div>
            </Tab>
          </div>
          {admin && (
            <div className="absolute right-0 sm:right-5 top-2.5">
              <button className="iconbutton" onClick={() => setActiveIndex(3)}>
                <img src={setting} alt="" width="24" />
              </button>
            </div>
          )}
          {!admin && (
            <div className="absolute right-0 sm:right-5 top-2.5">
              <button className="iconbutton" onClick={() => setActiveIndex(2)}>
                <MoreHoriz />
              </button>
            </div>
          )}
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="max-w-screen-lg mx-auto">
              {admin && (
                <ListHomeAsAdmin
                  absent={absent}
                  setActiveIndex={setActiveIndex}
                />
              )}
              {!admin && <ListHomeAsUser />}
            </div>
          </TabPanel>

          {admin && (
            <TabPanel>
              <AttendanceLog />
            </TabPanel>
          )}

          <TabPanel>
            <ListPeople absent={absent} admin={admin} />
          </TabPanel>

          {admin && (
            <TabPanel>
              <SettingsAbsentAdmin absent={absent} />
            </TabPanel>
          )}
          {!admin && (
            <TabPanel>
              <SettingsAbsentPeserta absent={absent} />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
}
