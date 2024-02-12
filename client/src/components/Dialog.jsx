import {
  Checkbox,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { Close } from "@mui/icons-material";
import { useState } from "react";
import location from "../img/image 2.svg";
import { createAbsentee } from "../lib/actions";

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
          <button onClick={handleClose}>Cancel</button>
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
  const create = async (absentName, ownerName) => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    const response = await createAbsentee(absentName, ownerName, userData._id);
    console.log(response);
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
          handleAction={createAbsentee}
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

export function MakeAbsenteeDialog({ active, setActive }) {
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

  return (
    <div
      className={`dialog ${
        active ? "scale-100" : "scale-0"
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
                <div className="mb-2">
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
              />
              <input
                type="time"
                className="border-2 text-center w-1/2 border-[#D9D9D9] block p-2 rounded-md"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-5">
          <div className="flex gap-5">
            <button
              className="p-2 border-2 border-[#d9d9d9] rounded-md"
              onClick={() => setActive(false)}
            >
              Cancel
            </button>
            <button className="py-2 px-5 min-h-fit coloredButton rounded-md">
              Add absentee hour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckInDialog({ active, setActive }) {
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
          <Tabs colorScheme="black">
            <TabList bgColor="white">
              <div className="px-3 flex">
                <Tab>
                  <div className="p-2 font-bold">Location</div>
                </Tab>
                <Tab>
                  <div className="p-2 font-bold">Shift</div>
                </Tab>
              </div>
            </TabList>

            <TabPanels>
              <TabPanel paddingX={0}>
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
              </TabPanel>
              <TabPanel paddingX={0}>
                <div className="py-2 px-4">
                  <div className="py-2 px-4 bg-white border-[1.5px] rounded-md border-black flex items-center justify-between">
                    <div>
                      <h1 className="font-bold">Shift 1</h1>
                      <h3 className="font-bold text-sm">10:00 - 11:00</h3>
                    </div>
                    <input type="radio" className="w-6 h-6" />
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
          <div className="px-4 py-3">
            <button className="text-center w-full py-3 bg-[#0E2A47] rounded-md text-white font-bold">
              Check-In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PermissionDialog({ active, setActive }) {
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
