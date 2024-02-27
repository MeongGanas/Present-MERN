import { useContext, useState } from "react";
import { Select } from "@chakra-ui/react";
import { AttendanceSearchInput } from "../SearchInput";
import TableAttendance from "./tableAttendance";
import { WaktuContext } from "../../hooks/waktuContext";

export default function MonthlyAttendance({
  absentHour,
  tempAttendanceLog,
  attendanceLog,
  setAttendanceLog,
}) {
  const { waktu } = useContext(WaktuContext);
  const [month, setMonth] = useState(waktu.getMonth());
  const [year, setYear] = useState(waktu.getYear());

  const getMonth = () => {
    const options = { month: "long", timeZone: "UTC" };
    const monthNameInEnglish = waktu.toLocaleString("en-US", options);

    return monthNameInEnglish;
  };

  const handleMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };

  return (
    <>
      <div className="block sm:flex justify-between items-center">
        <div className="flex flex-wrap gap-5 mb-5 sm:mb-0">
          <AttendanceSearchInput
            tempAttendanceLog={tempAttendanceLog}
            setAttendanceLog={setAttendanceLog}
          />
          <div className="flex gap-5 w-full">
            <Select
              defaultValue={waktu.getMonth()}
              onChange={handleMonth}
              border="2px"
              borderColor="black"
              bgColor="white"
              height="43.33px"
            >
              <option value="1">January</option>
              <option value="2">February</option>
              <option value="3">Maret</option>
            </Select>
            <Select
              defaultValue={waktu.getYear()}
              onChange={handleYear}
              border="2px"
              borderColor="black"
              bgColor="white"
              height="43.33px"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </Select>
          </div>
        </div>
        <button className="coloredButton py-2 px-4 font-bold rounded-[9px] border-2 border-black">
          Export to Excel
        </button>
      </div>
      <TableAttendance absentHour={absentHour} attendanceLog={attendanceLog} />
    </>
  );
}
