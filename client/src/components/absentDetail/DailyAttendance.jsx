import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { AttendanceSearchInput } from "../SearchInput";
import TableAttendance from "./tableAttendance";
import { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../hooks/dialogContext";
import { WaktuContext } from "../../hooks/waktuContext";
import { Select } from "@chakra-ui/react";

export default function DailyAttendance({ absent }) {
  const { setAbsentHour } = useContext(LayoutContext);
  const { waktu } = useContext(WaktuContext);
  const [absentHours, setAbsentHours] = useState([]);
  const [tempAttendanceLog, setTempAttendanceLog] = useState([]);
  const [attendanceLog, setAttendanceLog] = useState([]);
  const [currentHours, setCurrentHours] = useState([]);
  const [currentDay, setCurrentDay] = useState(new Date());

  const [optionTemp, setOptionTemp] = useState([]);
  const [currentOption, setCurrentOption] = useState("");

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
      const newAttendanceLog = tempAttendanceLog.filter(
        (log) => log.shiftId == currentOption
      );
      setCurrentHours(newCurrentHours);
      setOptionTemp(newAttendanceLog);
      setAttendanceLog(newAttendanceLog);
    }
  };

  const handleBackClick = () => {
    const newDate = new Date(currentDay);
    newDate.setDate(currentDay.getDate() - 1);
    setCurrentDay(newDate);
  };

  const handleForwardClick = () => {
    const newDate = new Date(currentDay);
    newDate.setDate(currentDay.getDate() + 1);
    setCurrentDay(newDate);
  };

  const filterAttendance = (data) => {
    let newLog;
    if (currentOption !== "") {
      newLog = optionTemp.filter((log) => {
        return log.status === data;
      });
    } else {
      newLog = tempAttendanceLog.filter((log) => {
        return log.status === data;
      });
    }
    return newLog;
  };

  function formatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const notPresent = () => {
    let missingUser = [];

    absentHours.forEach((absentee) => {
      const currentLog = [];
      attendanceLog.forEach((log) => {
        if (log.shiftId === absentee._id) {
          currentLog.push(log);
        }
      });

      const notPresentUser = absent.usersJoin.filter(
        (user) => !currentLog.some((log) => log.userId === user.userId)
      );

      notPresentUser.forEach((user) => {
        const log = currentLog.find((log) => log.shiftId === absentee._id);
        if (log) {
          missingUser.push({
            shiftId: log.shiftId,
            userId: user.userId,
            username: user.username,
            shift: log.shift,
            status: "Absent",
            detail: "Absent",
            checkInTime: "-",
            checkOutTime: "-",
            maps: "-",
            date: currentDay,
          });
        } else {
          missingUser.push({
            shiftId: absentee._id,
            userId: user.userId,
            username: user.username,
            shift: absentee.name,
            status: "Absent",
            detail: "Absent",
            checkInTime: "-",
            checkOutTime: "-",
            date: currentDay,
            maps: "-",
          });
        }
      });
    });
    setAttendanceLog(missingUser);
  };

  const late = () => {
    let newLog;
    if (currentOption !== "") {
      newLog = optionTemp.filter((log) => {
        return log.detail === "Late";
      });
    } else {
      newLog = tempAttendanceLog.filter((log) => {
        return log.detail === "Late";
      });
    }
    setAttendanceLog(newLog);
  };

  return (
    <>
      <div className="absolute right-0 top-4">
        <Select
          variant="unstyled"
          placeholder="Select"
          className="cursor-pointer"
          onChange={(e) => {
            filter(e.target.value);
            setCurrentOption(e.target.value);
          }}
        >
          {absentHours.map((absentHour) => (
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
        <div className="flex gap-5 mb-5 sm:mb-0 flex-wrap">
          <div className="flex w-fit items-center bg-white border-2 border-black rounded-[9px] overflow-hidden">
            <button
              className="p-2 hover:bg-slate-100 duration-200 transition"
              onClick={handleBackClick}
            >
              <ArrowBack />
            </button>
            <input
              type="date"
              value={formatDate(currentDay)}
              onChange={(e) => setCurrentDay(new Date(e.target.value))}
              className="border-x-2 p-2 border-black h-full text-center focus:outline-none"
            />
            <button
              className="p-2 hover:bg-slate-100 duration-200 transition"
              onClick={handleForwardClick}
            >
              <ArrowForward />
            </button>
          </div>

          <AttendanceSearchInput
            tempAttendanceLog={tempAttendanceLog}
            setAttendanceLog={setAttendanceLog}
          />

          <div className="border-2 w-fit border-black bg-white overflow-hidden rounded-[9px] flex">
            <button
              className="button-kehadiran"
              onClick={() => {
                if (currentOption === "") {
                  setAttendanceLog(tempAttendanceLog);
                } else {
                  setAttendanceLog(optionTemp);
                }
              }}
            >
              All
            </button>
            <button
              className="button-kehadiran"
              onClick={() => {
                const newLog = filterAttendance("Present");
                setAttendanceLog(newLog);
              }}
            >
              Present
            </button>
            <button className="button-kehadiran" onClick={notPresent}>
              Not Present
            </button>
            <button className="button-kehadiran" onClick={late}>
              Late
            </button>
            <button
              className="button-kehadiran"
              onClick={() => {
                const newLog = filterAttendance("Permission");
                setAttendanceLog(newLog);
              }}
            >
              Permission
            </button>
          </div>
        </div>
        <button className="coloredButton py-2 px-4 font-bold rounded-[9px] border-2 border-black text-nowrap">
          Export to Excel
        </button>
      </div>

      <TableAttendance
        absentHour={currentHours}
        attendanceLog={attendanceLog}
      />
    </>
  );
}
