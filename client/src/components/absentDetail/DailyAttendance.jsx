import { ArrowBack, ArrowForward } from "@mui/icons-material";
import SearchInput from "../SearchInput";
import TableAttendance from "./tableAttendance";
import { useContext, useState } from "react";
import { WaktuContext } from "../../hooks/waktuContext";

export default function DailyAttendance({ absentHour, attendanceLog }) {
  const { waktu } = useContext(WaktuContext);
  const formattedDate = `${waktu.getFullYear()}-${String(
    waktu.getMonth() + 1
  ).padStart(2, "0")}-${String(waktu.getDate()).padStart(2, "0")}`;
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <div className="block sm:flex justify-between items-center">
        <div className="flex gap-5 mb-5 sm:mb-0 flex-wrap">
          <div className="flex w-fit items-center bg-white border-2 border-black rounded-[9px] overflow-hidden">
            <button className="p-2 hover:bg-slate-100 duration-200 transition">
              <ArrowBack />
            </button>
            <input
              type="date"
              defaultValue={formattedDate}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="border-x-2 p-2 border-black h-full text-center focus:outline-none"
            />
            <button className="p-2 hover:bg-slate-100 duration-200 transition">
              <ArrowForward />
            </button>
          </div>

          <SearchInput />

          <div className="border-2 w-fit border-black bg-white overflow-hidden rounded-[9px] flex">
            <button className="button-kehadiran">Present</button>
            <button className="button-kehadiran">Not Present</button>
            <button className="button-kehadiran">Late</button>
            <button className="button-kehadiran">Permission</button>
          </div>
        </div>
        <button className="coloredButton py-2 px-4 font-bold rounded-[9px] border-2 border-black text-nowrap">
          Export to Excel
        </button>
      </div>

      <TableAttendance absentHour={absentHour} attendanceLog={attendanceLog} />
    </>
  );
}
