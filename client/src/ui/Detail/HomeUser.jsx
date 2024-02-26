import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../hooks/dataContext";
import { WaktuContext } from "../../hooks/waktuContext";
import CheckInDialog from "../../components/dialog/CheckInDialog";
import PermissionDialog from "../../components/dialog/PermissionDialog";

export function ListHomeAsUser({ absent }) {
  const { waktu } = useContext(WaktuContext);
  const { userData } = useContext(DataContext);
  const [CheckInActive, setCheckInActive] = useState(false);
  const [PermissionActive, setPermissionActive] = useState(false);
  const [shift, setShift] = useState([]);
  const [shiftIndex, setShiftIndex] = useState(null);

  const isCurrentTimeWithinShift = (currentTime, entryTime, leaveTime) => {
    const [currentHours, currentMinutes] = currentTime.split(":").map(Number);
    const [entryHours, entryMinutes] = entryTime.split(":").map(Number);
    const [leaveHours, leaveMinutes] = leaveTime.split(":").map(Number);

    if (
      entryHours > leaveHours ||
      (entryHours === leaveHours && entryMinutes > leaveMinutes)
    ) {
      return (
        (currentHours > entryHours ||
          (currentHours === entryHours && currentMinutes >= entryMinutes)) &&
        (currentHours < 24 ||
          (currentHours === 0 && currentMinutes <= leaveMinutes))
      );
    } else {
      return (
        (currentHours > entryHours ||
          (currentHours === entryHours && currentMinutes >= entryMinutes)) &&
        (currentHours < leaveHours ||
          (currentHours === leaveHours && currentMinutes <= leaveMinutes))
      );
    }
  };

  const isCurrentDay = (selectedDay) => {
    const currentDay = waktu.toLocaleString("en-US", { weekday: "long" });
    const isCurrent = selectedDay.includes(currentDay);
    return isCurrent;
  };

  useEffect(() => {
    if (absent.absenteeHours.length > 0) {
      const shifts = absent.absenteeHours;
      const currentTime = waktu.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });
      const currentShifts = shifts.filter(
        (shift) =>
          isCurrentTimeWithinShift(currentTime, shift.entry, shift.leave) &&
          isCurrentDay(shift.selectedDay)
      );
      setShift(currentShifts);
    } else {
      setShift([]);
    }
  }, [absent]);

  useEffect(() => {
    if (CheckInActive || PermissionActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [CheckInActive, PermissionActive]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const checkCheckIn = (shiftId) => {
    return absent.attendanceLog.some(
      (log) => log.userId === userData._id && log.shiftId === shiftId
    );
  };

  const checkCheckOut = (shiftId) => {
    return absent.attendanceLog.some(
      (log) =>
        log.userId === userData._id &&
        log.shiftId === shiftId &&
        log.checkOutTime !== "-"
    );
  };

  return (
    <div className="p-5 max-w-screen-lg mx-auto listDetail text-white rounded-md">
      <h1 className="text-3xl font-bold">{absent.name}</h1>

      <div className="pt-10 pb-5 text-center">
        <h1 className="mb-2 text-5xl font-bold">
          {waktu.toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </h1>
        <p>{waktu.toLocaleString("en-IN", options)}</p>
      </div>

      <ul className="text-black ">
        {shift.length > 0 &&
          shift.map((data, i) => (
            <>
              <li className="bg-white rounded-md mt-5" key={data._id}>
                <div className="text-center border-b-2 py-5">
                  <h4 className="font-bold">{data.name}</h4>
                  <h1 className="text-3xl font-bold my-4">
                    {data.entry} - {data.leave}
                  </h1>
                  <p>Late tolerance: {data.tolerance}</p>
                </div>

                {checkCheckOut(data._id) && (
                  <h1 className="text-center py-5">
                    You already check-out from this shift
                  </h1>
                )}
                {!checkCheckOut(data._id) && (
                  <div className="flex px-5 sm:px-10 justify-center gap-5 py-5">
                    <button
                      className="button bg-[#0E2A47] max-w-72 text-white"
                      onClick={() => {
                        setShiftIndex(i);
                        setCheckInActive(true);
                      }}
                    >
                      {checkCheckIn(data._id) ? "Check-Out" : "Check-In"}
                    </button>
                    <button
                      className="button max-w-72"
                      onClick={() => {
                        setShiftIndex(i);
                        setPermissionActive(true);
                      }}
                    >
                      Permission
                    </button>
                  </div>
                )}
                {shiftIndex === i && (
                  <>
                    <CheckInDialog
                      active={CheckInActive}
                      absentId={absent._id}
                      shiftId={data._id}
                      setActive={setCheckInActive}
                      absentHour={data}
                      isCheckIn={checkCheckIn(data._id)}
                      attendanceLog={absent.attendanceLog}
                    />
                    <PermissionDialog
                      active={PermissionActive}
                      absentId={absent._id}
                      shiftId={data._id}
                      setActive={setPermissionActive}
                      absentHour={data}
                    />
                  </>
                )}
              </li>
            </>
          ))}

        {shift.length === 0 && (
          <div className="min-h-52 bg-white flex items-center justify-center">
            <h1 className="font-bold text-[#7A7A7A] text-2xl">
              No Shifts available today 👋
            </h1>
          </div>
        )}
      </ul>
    </div>
  );
}
