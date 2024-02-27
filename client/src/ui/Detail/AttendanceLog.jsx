import { useContext, useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
} from "@chakra-ui/react";
import { LayoutContext } from "../../hooks/dialogContext";
import MakeAbsenteeDialog from "../../components/dialog/MakeAbsent";
import MonthlyAttendance from "../../components/absentDetail/MonthlyAttendance";
import DailyAttendance from "../../components/absentDetail/DailyAttendance";
import { WaktuContext } from "../../hooks/waktuContext";

export function AttendanceLog({ absent }) {
  const { setAbsentHour } = useContext(LayoutContext);
  const { waktu } = useContext(WaktuContext);
  const [absentHours, setAbsentHours] = useState([]);
  const [tempAttendanceLog, setTempAttendanceLog] = useState([]);
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [currentHours, setCurrentHours] = useState([]);
  const [currentDay, setCurrentDay] = useState(new Date());

  const isCurrentDay = (selectedDay) => {
    const today = currentDay.toLocaleString("en-US", { weekday: "long" });
    const isCurrent = selectedDay.includes(today);
    return isCurrent;
  };

  const getCurrentDayAbsent = () => {
    const absentHour = absent.absenteeHours.filter((absentHour) =>
      isCurrentDay(absentHour.selectedDay)
    );
    return absentHour;
  };

  const isTodayAttendance = (date) => {
    const attendanceDate = new Date(date);
    return (
      attendanceDate.toLocaleDateString() === currentDay.toLocaleDateString()
    );
  };

  const getCurrentDayAttendance = () => {
    let attendance;
    if (currentDay.toLocaleDateString() === waktu.toLocaleDateString()) {
      attendance = absent.attendanceLog.filter((attendance) =>
        isTodayAttendance(attendance.date)
      );
    } else {
      attendance = absent.attendanceHistory.filter((attendance) => {
        return isTodayAttendance(attendance.date);
      });
    }
    return attendance;
  };

  useEffect(() => {
    setAbsentHours(getCurrentDayAbsent());
    setCurrentHours(getCurrentDayAbsent());
    setAttendanceLog(getCurrentDayAttendance());
    setTempAttendanceLog(getCurrentDayAttendance());
  }, [absent, currentDay]);

  const filter = (currentOption) => {
    if (currentOption === "make") {
      setAbsentHour(true);
    } else if (currentOption === "") {
      setAbsentHours(getCurrentDayAbsent());
      setCurrentHours(getCurrentDayAbsent());
      setAttendanceLog(getCurrentDayAttendance());
    } else {
      const newCurrentHours = absentHours.filter(
        (hours) => hours._id == currentOption
      );
      const newAttedanceLog = tempAttendanceLog.filter(
        (log) => log.shiftId == currentOption
      );
      setCurrentHours(newCurrentHours);
      setAttendanceLog(newAttedanceLog);
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <MakeAbsenteeDialog absentId={absent._id} />

      <h1 className="text-2xl font-bold mt-3 mb-5">Attendance Log</h1>

      {absent && (
        <Tabs colorScheme="black">
          <TabList>
            <div className="relative flex w-full">
              <Tab>
                <div className="p-2">Daily</div>
              </Tab>
              <Tab>
                <div className="p-2">Monthly</div>
              </Tab>

              <div className="absolute right-0 bottom-4">
                <Select
                  variant="unstyled"
                  placeholder="Select"
                  className="cursor-pointer"
                  onChange={(e) => filter(e.target.value)}
                >
                  {absentHours.map((absentHour) => (
                    <option
                      value={absentHour._id}
                      key={absentHour._id}
                      className="p-2"
                    >
                      {absentHour.name}
                    </option>
                  ))}
                  <option className="p-2" value="make">
                    Create
                  </option>
                </Select>
              </div>
            </div>
          </TabList>

          <TabPanels>
            <TabPanel paddingX={0}>
              <DailyAttendance
                absentHour={currentHours}
                attendanceLog={attendanceLog}
                tempAttendanceLog={tempAttendanceLog}
                setAttendanceLog={setAttendanceLog}
                setCurrentDay={setCurrentDay}
                currentDay={currentDay}
              />
            </TabPanel>
            <TabPanel paddingX={0}>
              {absentHours.length > 0 && (
                <MonthlyAttendance
                  absentHour={currentHours}
                  attendanceLog={attendanceLog}
                  tempAttendanceLog={tempAttendanceLog}
                  setAttendanceLog={setAttendanceLog}
                />
              )}
              {absentHours.length === 0 && (
                <h1>There are no absentee hours yet.</h1>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </div>
  );
}
