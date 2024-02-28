import { useContext, useEffect, useState } from "react";
import { Select } from "@chakra-ui/react";
import { AttendanceSearchInput } from "../SearchInput";
import TableAttendance from "./tableAttendance";
import { WaktuContext } from "../../hooks/waktuContext";
import { LayoutContext } from "../../hooks/dialogContext";

export default function MonthlyAttendance({ absent }) {
  const { waktu } = useContext(WaktuContext);
  const { setAbsentHour } = useContext(LayoutContext);
  const [currentMonth, setCurrentMonth] = useState(waktu);
  const [monthlyAttendanceLog, setMonthlyAttendanceLog] = useState([]);
  const [monthAttendanceLog, setMonthAttendanceLog] = useState([]);

  const isMonthlyAttendance = (date) => {
    const attendanceDate = new Date(date);
    return (
      attendanceDate.toLocaleString("us-EN", { month: "long" }) ===
      currentMonth.toLocaleString("us-EN", { month: "long" })
    );
  };

  const getMontlyAttendance = () => {
    const attendanceToday = absent.attendanceLog.filter((attendance) =>
      isMonthlyAttendance(attendance.date)
    );
    const attendanceHistory = absent.attendanceHistory.filter((attendance) => {
      return isMonthlyAttendance(attendance.date);
    });
    return [...attendanceHistory, ...attendanceToday];
  };

  useEffect(() => {
    setMonthAttendanceLog(getMontlyAttendance());
    setMonthlyAttendanceLog(getMontlyAttendance());
    console.log(currentMonth);
  }, [currentMonth]);

  const getMonth = () => {
    const options = { month: "long", timeZone: "UTC" };
    const monthNameInEnglish = waktu.toLocaleString("en-US", options);

    return monthNameInEnglish;
  };

  const filter = (currentOption) => {
    if (currentOption === "make") {
      setAbsentHour(true);
    } else if (currentOption === "") {
      setMonthAttendanceLog(getMontlyAttendance());
      setMonthlyAttendanceLog(getMontlyAttendance());
    } else {
      const newAttedanceLog = monthlyAttendanceLog.filter(
        (log) =>
          new Date(log.date).getMonth() == currentMonth.getMonth() &&
          currentOption === log.shiftId
      );
      setMonthAttendanceLog(newAttedanceLog);
    }
  };

  return (
    <>
      <div className="absolute right-0 top-4">
        <Select
          variant="unstyled"
          placeholder="Select"
          className="cursor-pointer"
          onChange={(e) => filter(e.target.value)}
        >
          {absent.absenteeHours.map((absentHour) => (
            <option value={absentHour._id} key={absentHour._id} className="p-2">
              {absentHour.name}
            </option>
          ))}
          <option className="p-2" value="make">
            Create
          </option>
        </Select>
      </div>
      <div className="block sm:flex justify-between items-center">
        <div className="flex flex-wrap gap-5 mb-5 sm:mb-0">
          <AttendanceSearchInput
            tempAttendanceLog={monthlyAttendanceLog}
            setAttendanceLog={setMonthAttendanceLog}
          />
          <input
            type="month"
            defaultValue={currentMonth.toISOString().slice(0, 7)}
            onChange={(e) => setCurrentMonth(new Date(e.target.value))}
            className="border-2 border-black rounded-md px-5"
          />
        </div>
        <button className="coloredButton py-2 px-4 font-bold rounded-[9px] border-2 border-black">
          Export to Excel
        </button>
      </div>

      <TableAttendance
        absentHour={absent.absenteeHours}
        attendanceLog={monthAttendanceLog}
      />
    </>
  );
}
