import {
  Checkbox,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Close } from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import location from "../img/image 2.svg";
import { createAbsentee, joinAbsentee } from "../lib/actions";
import { LoadingContext } from "../hooks/loadingContext";
import swal from "sweetalert2";
import { DataContext } from "../hooks/dataContext";
import { checkInUser, createAbsentHour } from "../lib/absentee";
import { LayoutContext } from "../hooks/dialogContext";

function DialogFormat({
  handleClose,
  title,
  label1,
  label2,
  labelButton,
  handleAction,
}) {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  return (
    <div className={`dialog-content`}>
      <h1 className="text-lg font-bold mb-5">{title}</h1>
      <form>
        <div>
          <label htmlFor={label1} className="text-[#404040] font-semibold">
            {label1}
          </label>
          <input
            type="text"
            name={label1}
            id={label1}
            className="mb-5 mt-1 input"
            onChange={(e) => setData1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={label2} className="text-[#404040] font-semibold">
            {label2}
          </label>
          <input
            type="text"
            name={label2}
            id={label2}
            className="mb-5 mt-1 input"
            onChange={(e) => setData2(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-5">
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleAction(data1, data2);
            }}
          >
            {labelButton}
          </button>
        </div>
      </form>
    </div>
  );
}

export function Dialog({
  joinActive,
  createActive,
  setJoinActive,
  setCreateActive,
}) {
  const { setLoading } = useContext(LoadingContext);
  const { userData } = useContext(DataContext);

  const create = async (absentName, ownerName) => {
    setLoading(true);
    try {
      await createAbsentee(
        absentName,
        ownerName,
        userData._id,
        userData.username
      ).then((response) => {
        setLoading(false);
        setCreateActive(false);
      });
    } catch (err) {
      setLoading(false);
      swal.fire({
        title: "Create Absentee Fail!",
        text: err.response?.data?.mssg || "An error occurred during login",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const join = async (absentCode, displayName) => {
    setLoading(true);
    try {
      await joinAbsentee(
        absentCode,
        displayName,
        userData._id,
        userData.username
      ).then((response) => {
        if (!response.absentee) {
          swal.fire({
            title: "Failed Join!",
            text: "There are no such absentee!",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
        setLoading(false);
        setJoinActive(false);
      });
    } catch (err) {
      setLoading(false);
      swal.fire({
        title: "Join Absentee Fail!",
        text: err.response?.data?.mssg || "An error occurred during login",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <>
      <div
        className={`dialog ${
          joinActive ? "scale-100" : "scale-0"
        } transition-all duration-200`}
      >
        <DialogFormat
          title={"Join an absentee"}
          handleClose={() => setJoinActive(false)}
          label1={"List Code"}
          label2={"Display Name (optional)"}
          labelButton={"Join"}
          handleAction={join}
        />
      </div>

      <div
        className={`dialog ${
          createActive ? "scale-100" : "scale-0"
        } transition-all duration-200`}
      >
        <DialogFormat
          title={"Create an absentee"}
          handleClose={() => setCreateActive(false)}
          label1={"Absent name"}
          label2={"Owner Name (optional)"}
          labelButton={"Create"}
          handleAction={create}
        />
      </div>
    </>
  );
}

export function MakeAbsenteeDialog({ absentId }) {
  const { setLoading } = useContext(LoadingContext);
  const { absentHour, setAbsentHour } = useContext(LayoutContext);

  const [checkedItems, setCheckedItems] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const [name, setName] = useState("");
  const [tolerance, setTolerance] = useState("");
  const [entry, setEntry] = useState("");
  const [leave, setLeave] = useState("");

  const handleAbsenteeHour = async () => {
    setLoading(true);
    const selectedDay = checkedItems
      .filter((item) => {
        return item;
      })
      .map((_, i) => days[i]);
    const absentHourData = { name, selectedDay, tolerance, entry, leave };
    await createAbsentHour(absentId, absentHourData)
      .then(() => setLoading(false))
      .catch((err) => {
        setLoading(false);
        swal.fire({
          title: "Create Absent Hour Fail!",
          text:
            err.response?.data?.mssg ||
            err.response?.data?.mssg?.message ||
            "An error occurred during create absent",
          icon: "error",
          confirmButtonText: "Close",
        });
      });
  };

  const handleTimeChange = (value) => {
    let hours = parseInt(value.split(":")[0], 10);
    let minutes = value.split(":")[1];

    let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes}`;
    return formattedTime;
  };

  return (
    <div
      className={`dialog ${
        absentHour ? "scale-100" : "scale-0"
      } transition-all duration-200 overflow-hidden`}
    >
      <div className="bg-white p-8 rounded-md w-full max-w-screen-md h-screen overflow-y-auto relative">
        <h1 className="font-bold text-xl my-5">Add absentee hour</h1>
        <div className="w-full block md:flex gap-5 mb-5">
          <div className="w-full mb-2 md:mb-0">
            <label htmlFor="name" className="block">
              Absentee Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border-2 w-full border-[#D9D9D9] focus:outline-none block p-2 rounded-md"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label htmlFor="late" className="block">
              Late tolerance
            </label>
            <div className="flex">
              <input
                type="time"
                name="late"
                id="late"
                className="border-2 w-full border-[#D9D9D9] focus:outline-none block p-2 rounded-s-md"
                required
                onChange={(e) => {
                  const newTime = handleTimeChange(e.target.value);
                  setTolerance(newTime);
                }}
              />
              <div className="bg-[#D9D9D9] p-2 min-h-fit flex items-center rounded-e-md">
                <h1>Minutes</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="block lg:flex gap-5">
          <div className="border-2 border-[#d9d9d9] rounded-md mb-5 lg:mb-0 md:min-w-96">
            <div className="flex justify-between border-b-2 p-3 border-[#d9d9d9]">
              <h1>Day</h1>
              <Checkbox
                isChecked={allChecked}
                isIndeterminate={isIndeterminate}
                onChange={(e) => {
                  const newCheckedItems = new Array(checkedItems.length).fill(
                    e.target.checked
                  );
                  setCheckedItems(newCheckedItems);
                }}
              >
                Select all
              </Checkbox>
            </div>
            <div className="p-3 gap-5">
              {days.map((day, i) => (
                <div className="mb-2" key={i}>
                  <Checkbox
                    isChecked={checkedItems[i]}
                    onChange={(e) => {
                      const checkItem = [...checkedItems];
                      checkItem[i] = e.target.checked;
                      setCheckedItems(checkItem);
                    }}
                  >
                    {day}
                  </Checkbox>
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 w-full border-[#d9d9d9] rounded-md">
            <div className="flex justify-around border-b-2 border-[#d9d9d9] p-3">
              <h1>Entry time</h1>
              <h1>Leaving time</h1>
            </div>
            <div className="flex p-3 gap-5 justify-evenly">
              <input
                type="time"
                className="border-2 text-center w-1/2 border-[#D9D9D9] block p-2 rounded-md"
                required
                onChange={(e) => {
                  const newTime = handleTimeChange(e.target.value);
                  setEntry(newTime);
                }}
              />
              <input
                type="time"
                className="border-2 text-center w-1/2 border-[#D9D9D9] block p-2 rounded-md"
                required
                onChange={(e) => {
                  const newTime = handleTimeChange(e.target.value);
                  setLeave(newTime);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <div className="flex gap-5">
            <button
              className="p-2 border-2 border-[#d9d9d9] rounded-md"
              onClick={() => setAbsentHour(false)}
            >
              Cancel
            </button>
            <button
              className="py-2 px-5 min-h-fit coloredButton rounded-md"
              onClick={handleAbsenteeHour}
            >
              Add absentee hour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckInDialog({
  active,
  setActive,
  absentId,
  shiftIndex,
  currentTime,
  absentHour,
}) {
  const { userData } = useContext(DataContext);
  const { setLoading } = useContext(LoadingContext);

  const isLate = () => {
    const absentHourEntry = absentHour.entry.split(":");
    const absentHourTolerance = absentHour.tolerance.split(":");
    const splitCurrentTime = currentTime.split(":");

    const checkHour =
      parseInt(splitCurrentTime[0]) >= parseInt(absentHourEntry[0]) &&
      parseInt(splitCurrentTime[0]) <= parseInt(absentHourTolerance[0]);

    const checkMinute =
      parseInt(splitCurrentTime[1]) >= parseInt(absentHourEntry[1]) &&
      parseInt(splitCurrentTime[1]) <= parseInt(absentHourTolerance[1]);

    return checkMinute && checkHour ? "On-Time" : "Late";
  };

  const checkIn = async () => {
    const data = {
      userId: userData._id,
      username: userData.username,
      shiftIndex,
      status: "Present",
      detail: isLate(),
    };
    console.log(data);
    // const response = await checkInUser(absentId, shiftIndex);
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
        <div className="min-h-40">
          <h1>maps</h1>
        </div>
        <div className="border-t-2 border-[#d9d9d9] h-full bg-[#F8F8F9]">
          <div className="py-2 px-4">
            <div className="p-2 border-[1.5px] bg-white rounded-md border-black flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={location} alt="" />
                <div>
                  <h1 className="font-bold">Main</h1>
                  <h3 className="font-bold text-sm">Btp Blok A 235</h3>
                </div>
              </div>
              <input type="radio" className="w-6 h-6" />
            </div>
          </div>
          <div className="px-4 py-3">
            <button
              className="text-center w-full py-3 bg-[#0E2A47] rounded-md text-white font-bold"
              onClick={checkIn}
            >
              Check-In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PermissionDialog({ active, setActive, absentId, shiftIndex }) {
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
          <h1 className="font-bold ml-3">Permission</h1>
        </div>
        <div className="p-3 bg-[#f8f8f8] h-full">
          <div className="mb-5">
            <label htmlFor="title" className="block font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border-[1.5px] border-black p-3 w-full rounded-md"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="desc" className="block font-bold mb-2">
              Description
            </label>
            <textarea
              name="desc"
              id="desc"
              rows={10}
              className="w-full border-[1.5px] p-2 border-black rounded-md"
            ></textarea>
          </div>

          <button className="text-center w-full py-3 bg-[#0E2A47] rounded-md text-white font-bold">
            Check-In
          </button>
        </div>
      </div>
    </div>
  );
}
