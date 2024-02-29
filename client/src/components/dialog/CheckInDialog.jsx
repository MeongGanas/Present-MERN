import { Close } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../hooks/loadingContext";
import { DataContext } from "../../hooks/dataContext";
import { checkInUser, checkOutUser } from "../../lib/absentee";
import { WaktuContext } from "../../hooks/waktuContext";

export default function CheckInDialog({
  active,
  setActive,
  absentId,
  shiftId,
  absentHour,
  isCheckIn,
}) {
  const { userData } = useContext(DataContext);
  const { setLoading } = useContext(LoadingContext);
  const { waktu } = useContext(WaktuContext);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((positions) => {
      const { latitude, longitude } = positions.coords;
      setLatitude(latitude);
      setLongitude(longitude);
    });
  });

  const isLate = () => {
    const absentHourEntry = absentHour.entry.split(":");
    const absentHourTolerance = absentHour.tolerance.split(":");
    const splitCurrentTime = getWaktu().split(":");

    const checkHour =
      parseInt(splitCurrentTime[0]) >= parseInt(absentHourEntry[0]) &&
      parseInt(splitCurrentTime[0]) <= parseInt(absentHourTolerance[0]);

    const checkMinute =
      parseInt(splitCurrentTime[1]) >= parseInt(absentHourEntry[1]) &&
      parseInt(splitCurrentTime[1]) <= parseInt(absentHourTolerance[1]);

    return checkMinute && checkHour ? "On-Time" : "Late";
  };

  const getWaktu = () => {
    return waktu.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const checkIn = async () => {
    setLoading(true);
    const data = {
      userId: userData._id,
      username: userData.username,
      shift: absentHour.name,
      shiftId,
      status: "Present",
      detail: isLate(getWaktu()),
      checkInTime: getWaktu(),
      maps: `https://www.google.com/maps/place/${latitude},${longitude}`,
    };
    await checkInUser(absentId, data)
      .then(() => {
        setLoading(false);
        setActive(false);
      })
      .catch((err) => console.log(err));
  };

  const checkOutShift = async () => {
    setLoading(true);
    await checkOutUser(absentId, userData._id, shiftId, getWaktu())
      .then(() => {
        setLoading(false);
        setActive(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={`dialog ${
        active ? "scale-100" : "scale-0"
      } transition-all duration-200 overflow-hidden`}
    >
      <div className="w-full max-w-96 bg-white h-fit rounded-md overflow-hidden">
        <div className="flex p-3 items-center border-b-2 border-[#d9d9d9]">
          <button className="iconbutton" onClick={() => setActive(false)}>
            <Close />
          </button>
          <h1 className="font-bold ml-3">Check-In</h1>
        </div>
        <div className="border-t-2 border-[#d9d9d9] h-full bg-[#F8F8F9]">
          <div className="px-4 py-3">
            <button
              className="text-center w-full py-3 bg-[#0E2A47] rounded-md text-white font-bold"
              onClick={isCheckIn ? checkOutShift : checkIn}
            >
              {isCheckIn ? "Check-Out" : "Check-in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
