import { useState } from "react";
import { Select } from "@chakra-ui/react";
import SearchInput from "../SearchInput";
import TableAttendance from "./tableAttendance";

export default function MonthlyAttendance({ absentHour, attendanceLog }) {
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2024");

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
          <SearchInput />
          <div className="flex gap-5 w-full">
            <Select
              placeholder="Select Month"
              onChange={handleMonth}
              border="2px"
              borderColor="black"
              bgColor="white"
              height="43.33px"
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="Maret">Maret</option>
            </Select>
            <Select
              placeholder="Select Year"
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
