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
  ListPeopleAsUser,
} from "../ui/Detail/User";
import { useState } from "react";

export default function AbsentDetail() {
  const [admin, setAdmin] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <ChakraProvider>
      <Tabs index={activeIndex} onChange={setActiveIndex} colorScheme="blue">
        <TabList>
          <div className="px-5 flex">
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
        </TabList>

        <TabPanels>
          <TabPanel>
            {admin && <ListHomeAsAdmin setActiveIndex={setActiveIndex} />}
            {!admin && <ListHomeAsUser />}
          </TabPanel>
          {admin && (
            <TabPanel>
              <AttendanceLog />
            </TabPanel>
          )}
          <TabPanel>
            <ListPeopleAsUser />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
}
