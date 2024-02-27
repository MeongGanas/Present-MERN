import { useContext, useEffect } from "react";
import { TabContext } from "../../hooks/tabContext";
import { MoreHoriz } from "@mui/icons-material";
import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  ChakraProvider,
} from "@chakra-ui/react";
import { ListHomeAsUser } from "../../ui/Detail/HomeUser";
import { ListHomeAsAdmin } from "../../ui/Detail/HomeAdmin";
import { AttendanceLog } from "../../ui/Detail/AttendanceLog";
import { ListPeople } from "../../ui/Detail/ListPeople";
import { SettingsAdmin } from "../../ui/Detail/SettingAdmin";
import { SettingsUser } from "../../ui/Detail/SettingUser";

export default function AbsenteeDetail({ absent, admin }) {
  const { activeIndex, setActiveIndex } = useContext(TabContext);

  useEffect(() => {
    if (!admin) {
      setActiveIndex(0);
    }
  }, [admin]);

  return (
    <ChakraProvider>
      <Tabs index={activeIndex} onChange={setActiveIndex} colorScheme="blue">
        <TabList bg={"white"}>
          <div className="sm:px-5 flex">
            <Tab>
              <div className="p-2 font-bold">Home</div>
            </Tab>
            {admin && (
              <Tab>
                <div className="p-2 font-bold">Attendance</div>
              </Tab>
            )}
            <Tab>
              <div className="p-2 font-bold">People</div>
            </Tab>
          </div>
          {admin && (
            <div className="absolute right-2 sm:right-5 top-2.5">
              <button className="iconbutton" onClick={() => setActiveIndex(3)}>
                <img src={"/img/4860084 1.svg"} alt="" width="24" />
              </button>
            </div>
          )}
          {!admin && (
            <div className="absolute right-2 sm:right-5 top-2.5">
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
              {!admin && <ListHomeAsUser absent={absent} />}
            </div>
          </TabPanel>

          {admin && (
            <TabPanel>
              <AttendanceLog absent={absent} />
            </TabPanel>
          )}

          <TabPanel>
            <ListPeople absent={absent} admin={admin} />
          </TabPanel>

          {admin && (
            <TabPanel>
              <SettingsAdmin absent={absent} />
            </TabPanel>
          )}
          {!admin && (
            <TabPanel>
              <SettingsUser absent={absent} />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
}
