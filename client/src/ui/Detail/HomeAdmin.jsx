import { useContext, useEffect, useState } from "react";
import {
  ArrowForward,
  ContentCopy,
  DriveFileRenameOutline,
} from "@mui/icons-material";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { LayoutContext } from "../../hooks/dialogContext";
import { WaktuContext } from "../../hooks/waktuContext";

export function ListHomeAsAdmin({ setActiveIndex, absent }) {
  const [absentHours, setAbsentHours] = useState([]);
  const [attendanceLog, setAttendanceLog] = useState([]);
  const { absentHour, setAbsentHour } = useContext(LayoutContext);
  const { waktu } = useContext(WaktuContext);

  const handleButtonClick = () => {
    setActiveIndex(1);
  };

  const copyToClipboard = () => {
    let copyText = absent.code;
    let isCopy = copy(copyText);
    if (isCopy) {
      toast.success("Copied to Clipboard");
    }
  };

  useEffect(() => {
    if (absentHour) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [absentHour]);

  const isCurrentDay = (selectedDay) => {
    const today = waktu.toLocaleString("en-US", { weekday: "long" });
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
    return attendanceDate.toLocaleDateString() === waktu.toLocaleDateString();
  };

  useEffect(() => {
    const attendanceLog = absent.attendanceLog.filter((log) => {
      return isTodayAttendance(log.date);
    });
    setAbsentHours(getCurrentDayAbsent());
    setAttendanceLog(
      attendanceLog.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
    );
  }, [absent]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      <div
        className={`w-full mb-5 rounded-md listDetail listDetail-${absent.theme} p-5 min-h-64 flex flex-col justify-between overflow-hidden`}
      >
        <div className="w-full flex justify-end">
          <button
            className="bg-white py-2 px-3 rounded-md shadow-sm flex gap-2"
            onClick={() => setActiveIndex(3)}
          >
            <DriveFileRenameOutline />
            <span className="font-bold">Customize</span>
          </button>
        </div>
        <h1 className="text-white text-3xl font-bold">{absent.name}</h1>
      </div>
      <div className="block md:flex w-full gap-5">
        <div className="w-full mb-5 md:mb-0 bg-white md:max-w-64 border border-[#c4c4c4] rounded-md pt-2 p-5 h-fit">
          <div className="flex items-center justify-between mb-3">
            <h1 className=" font-bold">List Code</h1>
            <button className="iconbutton" onClick={copyToClipboard}>
              <ContentCopy className="w-4 h-4" />
            </button>
          </div>
          <h1 className="font-bold text-2xl">{absent.code}</h1>
        </div>

        <div className="w-full border bg-white border-[#c4c4c4] rounded-md overflow-hidden">
          <div className="flex items-center border-b border-[#c4c4c4] p-5 justify-between">
            <div>
              <h1 className="font-bold text-lg">Attendance Log</h1>
              <p className="font-bold text-sm md:text-base mt-1">
                {waktu.toLocaleString("en-IN", options)}
              </p>
            </div>
            <button onClick={handleButtonClick}>
              <ArrowForward />
            </button>
          </div>

          {absentHours.length > 0 && (
            <table className="overflow-y-auto max-h-96 w-full">
              <tbody>
                {attendanceLog.length > 0 &&
                  attendanceLog.map((log) => (
                    <tr
                      className="even:bg-[#F1F1F1] odd:bg-white w-full"
                      key={log._id}
                    >
                      <td className="p-5 w-1/3" align="left">
                        <div className="flex gap-5 items-center">
                          <div className="circle min-w-8"></div>
                          <h1 className="font-bold text-sm md:text-base">
                            {log.username}
                          </h1>
                        </div>
                        <h3 className="font-bold text-sm md:text-base">
                          {log.name}
                        </h3>
                      </td>

                      <td className="p-5 w-1/3" align="center">
                        <h3 className="font-bold text-sm md:text-base">
                          {log.shift}
                        </h3>
                      </td>

                      <td className="p-5 w-1/3" align="end">
                        <h3 className="font-bold text-sm md:text-base">
                          {log.status === "Present" && (
                            <span>
                              {log.status}{" "}
                              {log.detail === "Late" && (
                                <span className="text-red-700">
                                  {" "}
                                  ({log.detail})
                                </span>
                              )}
                              {log.detail === "On-Time" && (
                                <span className="text-green-500">
                                  {" "}
                                  ({log.detail})
                                </span>
                              )}
                            </span>
                          )}
                          {log.status === "Permission" && (
                            <span className="text-primary">
                              {log.status}{" "}
                              <span className="text-black">({log.detail})</span>
                            </span>
                          )}
                        </h3>
                      </td>
                    </tr>
                  ))}
                {attendanceLog.length === 0 && (
                  <tr>
                    <td className="font-bold text-center py-5">
                      No one is present yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}

          {absentHours.length === 0 && (
            <div className="pt-3 pb-5">
              <img
                src={"/img/Scribble-28.svg.svg"}
                alt=""
                className="mx-auto mb-5"
              />
              <h1 className="font-bold text-center">
                No absentee hour listed,{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => {
                    setAbsentHour(true);
                  }}
                >
                  make one
                </span>
              </h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
