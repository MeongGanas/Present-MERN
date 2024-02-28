import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import MakeAbsenteeDialog from "../../components/dialog/MakeAbsent";
import MonthlyAttendance from "../../components/absentDetail/MonthlyAttendance";
import DailyAttendance from "../../components/absentDetail/DailyAttendance";

export function AttendanceLog({ absent }) {
  return (
    <div className="max-w-screen-lg mx-auto">
      <MakeAbsenteeDialog absentId={absent._id} />

      <h1 className="text-2xl font-bold mt-3 mb-5">Attendance Log</h1>

      {absent && (
        <Tabs colorScheme="black">
          <TabList>
            <Tab>
              <div className="p-2">Daily</div>
            </Tab>
            <Tab>
              <div className="p-2">Monthly</div>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel paddingX={0}>
              <DailyAttendance absent={absent} />
            </TabPanel>
            <TabPanel paddingX={0}>
              <MonthlyAttendance absent={absent} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </div>
  );
}
