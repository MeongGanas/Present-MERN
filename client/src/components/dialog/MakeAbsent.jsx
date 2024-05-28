import { Checkbox } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { LoadingContext } from "../../hooks/loadingContext";
import swal from "sweetalert2";
import { createAbsentHour } from "../../lib/absentee";
import { LayoutContext } from "../../hooks/dialogContext";

export default function MakeAbsenteeDialog({ absentId }) {
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
      .reduce((acc, item, index) => {
        if (item) {
          acc.push(index);
        }
        return acc;
      }, [])
      .map((index) => days[index]);

    if (name && tolerance && entry && leave && selectedDay) {
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
    } else {
      swal
        .fire({
          title: "Create Absent Hour Fail!",
          text: "Isi data dengan lengkap!!",
          icon: "error",
          confirmButtonText: "Close",
        })
        .then(() => setLoading(false));
    }
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
      <div className="bg-white px-5 pb-5 rounded-md w-full max-w-screen-md overflow-y-auto relative">
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
                className="border-2 w-full border-[#D9D9D9] focus:outline-none block p-2 rounded-md"
                required
                onChange={(e) => {
                  const newTime = handleTimeChange(e.target.value);
                  setTolerance(newTime);
                }}
              />
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
