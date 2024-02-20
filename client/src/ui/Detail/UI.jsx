import { useContext, useEffect, useState } from "react";
import {
  ArrowForward,
  ContentCopy,
  DriveFileRenameOutline,
  Logout,
} from "@mui/icons-material";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Select,
} from "@chakra-ui/react";
import shape from "../../img/Scribble-28.svg.svg";
import background from "../../img/Mask group.png";
import SearchInput from "../../components/SearchInput";
import { CheckInDialog, PermissionDialog } from "../../components/Dialog";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../hooks/dataContext";
import { leaveAbsentee } from "../../lib/actions";
import { LoadingContext } from "../../hooks/loadingContext";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";
import { LayoutContext } from "../../hooks/dialogContext";
import { editAsOwner, editAsParticipant } from "../../lib/absentee";
import {
  DailyAttendance,
  MonthlyAttendance,
} from "../../components/AbsenteeDetail";

export function ListHomeAsUser({ absent }) {
  const [waktu, setWaktu] = useState(new Date());
  const [CheckInActive, setCheckInActive] = useState(false);
  const [PermissionActive, setPermissionActive] = useState(false);
  const [shift, setShift] = useState(null);
  const [shiftIndex, setShiftIndex] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setWaktu(new Date());
    }, 1000);
  });

  useEffect(() => {
    if (absent.absenteeHours.length > 0) {
      setShift(absent.absenteeHours);
    } else {
      setShift(null);
    }
  }, [absent]);

  useEffect(() => {
    if (CheckInActive || PermissionActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [CheckInActive, PermissionActive]);

  function padZero(num) {
    return String(num).padStart(2, "0");
  }

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="p-5 max-w-screen-lg mx-auto listDetail text-white rounded-md">
      <h1 className="text-3xl font-bold">{absent.name}</h1>

      <div className="pt-10 pb-5 text-center">
        <h1 className="mb-2 text-5xl font-bold">
          {padZero(waktu.getHours())}:{padZero(waktu.getMinutes())}
        </h1>
        <p>{waktu.toLocaleString("en-IN", options)}</p>
      </div>

      <ul className="text-black ">
        {shift &&
          shift.map((data, i) => (
            <li className="bg-white rounded-md mt-5" key={i}>
              <div className="text-center border-b-2 py-5">
                <h4 className="font-bold">{data.name}</h4>
                <h1 className="text-3xl font-bold my-4">
                  {data.entry} - {data.leave}
                </h1>
                <p>Late tolerance: {data.tolerance}</p>
              </div>
              <div className="flex px-5 sm:px-10 justify-center gap-5 py-5">
                <button
                  className="button bg-[#0E2A47] max-w-72 text-white"
                  onClick={() => {
                    setShiftIndex(i);
                    setCheckInActive(true);
                  }}
                >
                  Check-In
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
            </li>
          ))}
        <CheckInDialog
          active={CheckInActive}
          absentId={absent._id}
          absentHour={shiftIndex}
          setActive={setCheckInActive}
        />

        <PermissionDialog
          active={PermissionActive}
          absentId={absent._id}
          absentHour={shiftIndex}
          setActive={setPermissionActive}
        />
        {!shift && (
          <div className="min-h-52 bg-white flex items-center justify-center">
            <h1 className="font-bold text-[#7A7A7A] text-2xl">
              No Shifts available 👋
            </h1>
          </div>
        )}
      </ul>
    </div>
  );
}

export function ListHomeAsAdmin({ setActiveIndex, absent }) {
  const [absentHours, setAbsentHours] = useState([]);
  const { absentHour, setAbsentHour } = useContext(LayoutContext);
  const [waktu, setWaktu] = useState(new Date());

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

  useEffect(() => {
    if (absent.absenteeHours.length > 0) {
      setAbsentHours(absent.absenteeHours);
    } else {
      setAbsentHours([]);
    }
  }, [absent]);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div>
      <div className="w-full p-5 mb-5 listDetail rounded-md min-h-64 flex flex-col justify-between">
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

        <div className="w-full border bg-white border-[#c4c4c4] rounded-md">
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

          <ul className="overflow-y-auto max-h-96">
            {absentHours.length > 0 &&
              absentHours.map((log, i) => (
                <li className="even:bg-[#F1F1F1] odd:bg-white" key={i}>
                  {log.attendanceLog.length > 0 && (
                    <div className="flex justify-between p-5 items-center">
                      <div className="flex gap-5 items-center">
                        <div className="circle min-w-6"></div>
                        <h1 className="font-bold text-sm md:text-base">
                          Farouk
                        </h1>
                      </div>
                      <h3 className="font-bold text-sm md:text-base">
                        {log.name}
                      </h3>
                      <h3 className="font-bold text-sm md:text-base">
                        Present{" "}
                        <span className="text-green-500">(On-Time)</span>
                      </h3>
                    </div>
                  )}
                  {log.attendanceLog.length === 0 && (
                    <div className="py-5">
                      <h1 className="font-bold text-center">
                        No one is present yet
                      </h1>
                    </div>
                  )}
                </li>
              ))}
          </ul>

          {absentHours.length === 0 && (
            <div className="pt-3 pb-5">
              <img src={shape} alt="" className="mx-auto mb-5" />
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
    </div>
  );
}

export function ListPeople({ absent, admin }) {
  const { setLoading } = useContext(LoadingContext);
  const kick = async (userId) => {
    setLoading(true);

    await leaveAbsentee(absent._id, userId).then(() => {
      setLoading(false);
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mt-3 mb-10">List of people</h1>
      <SearchInput />
      <div className="bg-white mt-5 rounded-md border p-5">
        <div className="mb-5" id="admin-list">
          <h1 className="mb-5 border-b border-b-gray-300 py-2 text-xl font-bold">
            Admin
          </h1>
          <div className="flex gap-5 items-center">
            <div className="w-6 h-6 rounded-full border border-black"></div>
            <h1 className="text-lg">{absent.ownerName}</h1>
          </div>
        </div>

        <div id="participants-list">
          <div className="flex justify-between border-b border-b-gray-300 py-2">
            <h1 className="text-xl font-bold">Peserta</h1>
            <h1 className="font-bold">{absent.usersJoin.length} People</h1>
          </div>
          <ul>
            {absent.usersJoin &&
              absent.usersJoin.map((participant) => (
                <li className="people" key={participant.userId}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                      <div className="circle"></div>
                      <h1 className="text-lg">{participant.username}</h1>
                    </div>
                    {admin && (
                      <button
                        className="text-red-700"
                        value={participant.userId}
                        onClick={(e) => kick(e.target.value)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AttendanceLog({ absent }) {
  const { setAbsentHour } = useContext(LayoutContext);
  const [currentOption, setCurrentOption] = useState("");
  const [absentHours, setAbsentHours] = useState([]);

  useEffect(() => {
    if (currentOption === "make") {
      setAbsentHour(true);
    } else if (currentOption === "") {
      setAbsentHours(absent.absenteeHours);
    } else {
      const newAbsentHour = absentHours.filter((_, i) => i == currentOption);
      setAbsentHours(newAbsentHour);
    }
  }, [currentOption]);

  useEffect(() => {
    setAbsentHours(absent.absenteeHours);
  }, [absent]);

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mt-3 mb-5">Attendance Log</h1>

      {absent && (
        <Tabs colorScheme="black">
          <TabList>
            <div className="relative flex w-full">
              <Tab>
                <div className="p-2">Daily</div>
              </Tab>
              <Tab>
                <div className="p-2">Monthly</div>
              </Tab>

              <div className="absolute right-0 bottom-4">
                <Select
                  variant="unstyled"
                  placeholder="Select"
                  onChange={(e) => setCurrentOption(e.target.value)}
                >
                  {absent.absenteeHours.map((absentHour, i) => (
                    <option value={i} key={i} className="p-2">
                      {absentHour.name}
                    </option>
                  ))}
                  <option className="p-2" value="make">
                    Create
                  </option>
                </Select>
              </div>
            </div>
          </TabList>

          <TabPanels>
            <TabPanel paddingX={0}>
              {absentHours.length > 0 && (
                <DailyAttendance absentHour={absentHours} />
              )}
              {absentHours.length === 0 && (
                <h1>There are no absentee hours yet.</h1>
              )}
            </TabPanel>
            <TabPanel paddingX={0}>
              {absentHours.length > 0 && (
                <MonthlyAttendance absentHour={absentHours} />
              )}
              {absentHours.length === 0 && (
                <h1>There are no absentee hours yet.</h1>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      )}
    </div>
  );
}

export function SettingsAbsentAdmin({ absent }) {
  const [editAbsentName, setEditAbsentName] = useState(false);
  const [editOwnerName, seteditOwnerName] = useState(false);
  const { setLoading } = useContext(LoadingContext);

  const [newAbsentName, setNewAbsentName] = useState("");
  const [newOwnerName, setNewOwnerName] = useState("");

  useEffect(() => {
    setNewAbsentName(absent.name);
    setNewOwnerName(absent.ownerName);
  }, [absent]);

  const editOwner = async () => {
    setLoading(true);
    await editAsOwner(absent._id, { newAbsentName, newOwnerName }).then(() =>
      setLoading(false)
    );
  };

  return (
    <div className="px-2">
      <div className="border-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Class Detail</h1>
        <div className="mb-5">
          <div className="flex justify-between items-center">
            <h1 className="font-bold">Name</h1>
            <button
              className="flex gap-2"
              onClick={() => setEditAbsentName(true)}
            >
              <span className="font-bold">Change</span>
              <DriveFileRenameOutline />
            </button>
          </div>
          <h1
            className={`text-sm sm:text-base mt-1 ${
              editAbsentName ? "hidden" : "block"
            }`}
          >
            {absent.name}
          </h1>
          <input
            type="text"
            value={newAbsentName}
            onChange={(e) => setNewAbsentName(e.target.value)}
            className={`input ${
              editAbsentName ? "block" : "hidden"
            } max-w-sm mt-2`}
          />
        </div>
        <div className="mb-5">
          <div className="flex justify-between items-center">
            <h1 className="font-bold">Owner Name</h1>
            <button
              className="flex gap-2"
              onClick={() => seteditOwnerName(true)}
            >
              <span className="font-bold">Change</span>
              <DriveFileRenameOutline />
            </button>
          </div>
          <h1
            className={`text-sm sm:text-base mt-1 ${
              editOwnerName ? "hidden" : "block"
            }`}
          >
            {absent.ownerName}
          </h1>
          <input
            type="text"
            value={newOwnerName}
            onChange={(e) => setNewOwnerName(e.target.value)}
            className={`input ${
              editOwnerName ? "block" : "hidden"
            } max-w-sm mt-2`}
          />
        </div>

        <div className="flex justify-end gap-5">
          <button
            className="p-2 border-2 border-[#d9d9d9] rounded-md"
            onClick={() => {
              setEditAbsentName(false);
              seteditOwnerName(false);
            }}
          >
            Cancel
          </button>
          <button
            className="coloredButton py-2 px-7 rounded-md max-w-32"
            onClick={editOwner}
          >
            Save
          </button>
        </div>
      </div>

      <div className="border-2 mt-5 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">
          Customize Apperance
        </h1>
        <div className="mb-5">
          <img src={background} alt="" className="max-h-64 w-full rounded-md" />
        </div>
        <div className="mb-5">
          <h1 className="text-lg font-bold mb-5">Select Theme</h1>
          <div className="flex gap-5 flex-wrap">
            <button>
              <div className="w-20 h-20 rounded-full bg-[#0E2A47]"></div>
            </button>
            <button>
              <div className="w-20 h-20 rounded-full bg-[#C62E2E]"></div>
            </button>
            <button>
              <div className="w-20 h-20 rounded-full bg-[#3EBA4E]"></div>
            </button>
            <button>
              <div className="w-20 h-20 rounded-full bg-[#404040]"></div>
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-5">
          <button className="coloredButton py-2 px-7 rounded-md max-w-32">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export function SettingsAbsentPeserta({ absent }) {
  const navigate = useNavigate();
  const { userData } = useContext(DataContext);
  const { setLoading } = useContext(LoadingContext);
  const [data, setData] = useState(null);

  const [editName, setEditName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");

  useEffect(() => {
    const user = absent.usersJoin.filter(
      (user) => user.userId === userData._id
    )[0];
    setData(user);
  });

  useEffect(() => {
    if (data) {
      setNewDisplayName(data.username);
    }
  }, [data]);

  const leave = async () => {
    setLoading(true);

    await leaveAbsentee(absent._id, data.userId).then(() => {
      navigate("/home");
      setLoading(false);
      window.location.reload();
    });
  };

  const editParticipant = async () => {
    setLoading(true);
    await editAsParticipant(absent._id, data.userId, newDisplayName).then(() =>
      setLoading(false)
    );
  };

  return (
    <>
      {data && (
        <div>
          <div className="px-2 sm:p-5">
            <div className="border-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm">
              <h1 className="text-xl sm:text-2xl font-bold mb-5">
                Class Detail
              </h1>
              <div className="mb-5">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold">Display Name</h1>
                  <button
                    className="flex gap-2"
                    onClick={() => setEditName(true)}
                  >
                    <span className="font-bold">Change</span>
                    <DriveFileRenameOutline />
                  </button>
                </div>
                <h1
                  className={`text-sm sm:text-base mt-1 ${
                    editName ? "hidden" : "block"
                  }`}
                >
                  {data.username}
                </h1>
                <input
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  className={`input ${
                    editName ? "block" : "hidden"
                  } max-w-sm mt-2`}
                />
              </div>

              <div className="flex justify-end gap-5">
                <button
                  className="p-2 border-2 border-[#d9d9d9] rounded-md"
                  onClick={() => {
                    setEditName(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="coloredButton py-2 px-7 rounded-md max-w-32"
                  onClick={editParticipant}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="pt-5 px-2 sm:p-5">
            <div className="border-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm flex justify-end">
              <button
                className="bg-red-600 text-white py-2 px-7 rounded-md"
                onClick={leave}
              >
                <Logout className="mr-2" />
                <span>Leave</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
