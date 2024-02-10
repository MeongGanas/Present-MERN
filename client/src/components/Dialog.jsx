import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";

function DialogFormat({ handleClose, title, label1, label2, labelButton }) {
  return (
    <div className={`dialog-content`}>
      <h1 className="text-lg font-bold mb-5">{title}</h1>
      <div>
        <label htmlFor={label1} className="text-[#404040] font-semibold">
          {label1}
        </label>
        <input
          type="text"
          name={label1}
          id={label1}
          className="mb-5 mt-1 input"
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
        />
      </div>
      <div className="flex justify-end gap-5">
        <button onClick={handleClose}>Cancel</button>
        <button>{labelButton}</button>
      </div>
    </div>
  );
}

export function Dialog({
  joinActive,
  createActive,
  setJoinActive,
  setCreateActive,
}) {
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
      <div className="bg-white p-8 rounded-md w-full max-w-screen-md h-screen overflow-y-auto">
        <h1 className="font-bold text-xl mb-5">Add absentee hour</h1>
        <div className="w-full block md:flex gap-5 mb-5">
          <div className="mb-2 md:mb-0">
            <label htmlFor="name" className="block">
              Absentee Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border-2 border-[#D9D9D9] block p-2 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="late" className="block">
              Late tolerance
            </label>
            <div className="flex">
              <input
                type="text"
                name="late"
                id="late"
                className="border-2 border-[#D9D9D9] block p-2 rounded-s-md"
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
            <div className="p-3">
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
                type="text"
                className="border-2 w-1/2 border-[#D9D9D9] block p-2 rounded-md"
              />
              <input
                type="text"
                className="border-2 w-1/2 border-[#D9D9D9] block p-2 rounded-md"
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
