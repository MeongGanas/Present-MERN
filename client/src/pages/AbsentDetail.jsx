import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  ChakraProvider,
} from "@chakra-ui/react";
import {
  AttendanceLog,
  ListHomeAsAdmin,
  ListHomeAsUser,
  ListPeople,
  SettingsAbsentAdmin,
  SettingsAbsentPeserta,
} from "../ui/Detail/UI";
import { useState } from "react";
import setting from "../img/4860084 1.svg";
import { MoreHoriz } from "@mui/icons-material";

export default function AbsentDetail() {
  const [admin, setAdmin] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);

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
              {admin && <ListHomeAsAdmin setActiveIndex={setActiveIndex} />}
              {!admin && <ListHomeAsUser />}
            </div>
          </TabPanel>

          {admin && (
            <TabPanel>
              <AttendanceLog />
            </TabPanel>
          )}

          <TabPanel>
            <ListPeople />
          </TabPanel>

          {admin && (
            <TabPanel>
              <SettingsAbsentAdmin />
            </TabPanel>
          )}
          {!admin && (
            <TabPanel>
              <SettingsAbsentPeserta />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
}
