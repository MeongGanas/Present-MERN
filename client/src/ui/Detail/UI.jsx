import { useEffect, useState } from "react";
import {
  ArrowBack,
  ArrowForward,
  DriveFileRenameOutline,
  Logout,
  MoreHoriz,
  Share,
} from "@mui/icons-material";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
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
import { MakeAbsenteeDialog } from "../../components/Dialog";

export function ListHomeAsUser() {
  const [waktu, setWaktu] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setWaktu(new Date());
    }, 1000);
  });

  function padZero(num) {
    return String(num).padStart(2, "0");
  }

  return (
    <div className="p-5 max-w-screen-lg mx-auto listDetail text-white rounded-md">
      <h1 className="text-3xl">List 1</h1>

      <div className="py-10 text-center">
        <h1 className="mb-2 text-5xl font-bold">
          {padZero(waktu.getHours())}:{padZero(waktu.getMinutes())}
        </h1>
        <p>Fri, 18 sep 2023</p>
      </div>

      <div className="text-black bg-white rounded-md">
        <div className="text-center border-b-2 py-5">
          <h4 className="font-bold">Shift 1</h4>
          <h1 className="text-3xl font-bold my-4">08:30 - 10:00</h1>
          <p>Toleransi</p>
        </div>
        <div className="flex px-5 sm:px-10 justify-center gap-5 py-5">
          <button className="button bg-[#0E2A47] max-w-72 text-white">
            Check-In
          </button>
          <button className="button max-w-72">Permission</button>
        </div>
      </div>
    </div>
  );
}

export function ListHomeAsAdmin({ setActiveIndex }) {
  const [absent, setAbsent] = useState(null);
  const [dialogActive, setDialogActive] = useState(false);

  const handleButtonClick = () => {
    setActiveIndex(1);
  };

  useEffect(() => {
    if (dialogActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [dialogActive]);

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
        <h1 className="text-white text-3xl font-bold">List 1</h1>
      </div>
      <div className="block md:flex w-full gap-5">
        <div className="w-full mb-5 md:mb-0 bg-white md:max-w-64 border border-[#c4c4c4] rounded-md pt-2 p-5 h-fit">
          <div className="flex items-center justify-between mb-3">
            <h1 className=" font-bold">List Code</h1>
            <button className="iconbutton">
              <Share className="w-4 h-4" />
            </button>
          </div>
          <h1 className="font-bold text-2xl">A9B58Z</h1>
        </div>

        <div className="w-full border bg-white border-[#c4c4c4] rounded-md">
          <div className="flex items-center border-b border-[#c4c4c4] p-5 justify-between">
            <div>
              <h1 className="font-bold text-lg">Attendance Log</h1>
              <p className="font-bold text-sm md:text-base mt-1">
                Fri, 28 aug 2023
              </p>
            </div>
            <button onClick={handleButtonClick}>
              <ArrowForward />
            </button>
          </div>

          {absent && (
            <ul>
              <li className="even:bg-[#F1F1F1] odd:bg-white">
                <div className="flex justify-between p-5">
                  <div className="flex gap-5">
                    <div className="circle"></div>
                    <h1 className="font-bold text-sm md:text-base">
                      Farouk Akhtar Ramadhan
                    </h1>
                  </div>
                  <h3 className="font-bold text-sm md:text-base">
                    Present <span className="text-green-500">(On-Time)</span>
                  </h3>
                </div>
              </li>
              <li className="even:bg-[#F1F1F1] odd:bg-white">
                <div className="flex justify-between p-5">
                  <div className="flex gap-5">
                    <div className="circle"></div>
                    <h1 className="font-bold text-sm md:text-base">
                      Farrel Giovanni Jaohari
                    </h1>
                  </div>
                  <h3 className="font-bold text-sm md:text-base">
                    Present <span className="text-red-700">(Late)</span>
                  </h3>
                </div>
              </li>
              <li className="even:bg-[#F1F1F1] odd:bg-white">
                <div className="flex justify-between p-5">
                  <div className="flex gap-5">
                    <div className="circle"></div>
                    <h1 className="font-bold text-sm md:text-base">
                      Farrel Giovanni Jaohari
                    </h1>
                  </div>
                  <h3 className="font-bold text-sm md:text-base">Absent</h3>
                </div>
              </li>
            </ul>
          )}

          {!absent && (
            <div className="pt-3 pb-5">
              <img src={shape} alt="" className="mx-auto mb-5" />
              <h1 className="font-bold text-center">
                No absentee hour listed,{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => {
                    setDialogActive(true);
                  }}
                >
                  make one
                </span>
              </h1>

              <MakeAbsenteeDialog
                active={dialogActive}
                setActive={setDialogActive}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ListPeople() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mt-3 mb-10">List of people</h1>
      <SearchInput />
      <div className="bg-white mt-5 rounded-md border">
        <div className="p-5" id="admin-list">
          <h1 className="mb-5 border-b border-b-gray-300 py-2 text-xl font-bold">
            Admin
          </h1>
          <div className="flex justify-between items-center">
            <div className="flex gap-5 items-center">
              <div className="w-6 h-6 rounded-full border border-black"></div>
              <h1 className="text-lg">Farrel Giovanni Jaohari</h1>
            </div>
            <button className="iconbutton">
              <MoreHoriz />
            </button>
          </div>
        </div>

        <div className="p-5" id="participants-list">
          <div className="flex justify-between border-b border-b-gray-300 py-2">
            <h1 className="text-xl font-bold">Peserta</h1>
            <h1 className="font-bold">2 People</h1>
          </div>
          <ul>
            <li className="people">
              <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                  <div className="circle"></div>
                  <h1 className="text-lg">Farouk Akhtar</h1>
                </div>
                <button className="iconbutton">
                  <MoreHoriz />
                </button>
              </div>
            </li>
            <li className="people">
              <div className="flex justify-between items-center">
                <div className="flex gap-5 items-center">
                  <div className="circle"></div>
                  <h1 className="text-lg">Farouk Akhtar</h1>
                </div>
                <button className="iconbutton">
                  <MoreHoriz />
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function TableAttendance() {
  return (
    <>
      <div className="mt-5 border border-[#C4C4C4] rounded-md overflow-hidden">
        <TableContainer>
          <Table variant="striped" bg={"white"}>
            <Thead>
              <Tr>
                <Th paddingY="5">#</Th>
                <Th paddingY="5">Name</Th>
                <Th paddingY="5">Check-in</Th>
                <Th paddingY="5">Check-out</Th>
                <Th paddingY="5">Actual time</Th>
                <Th paddingY="5">Total time</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>1</Td>
                <Td>Farrel Giovanni Jaohari</Td>
                <Td>08:30</Td>
                <Td>10:00</Td>
                <Td>1:30 Hr</Td>
                <Td>1:30 Hr</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

function DailyAttendance() {
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

      <TableAttendance />
    </>
  );
}

function MonthlyAttendance() {
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2024");

  const handleMonth = (event) => {
    setMonth(event.target.value);
  };

  const handleYear = (event) => {
    setYear(event.target.value);
  };

  return (
    <>
      <div className="block sm:flex justify-between items-center">
        <div className="flex flex-wrap gap-5 mb-5 sm:mb-0">
          <SearchInput />
          <div className="flex gap-5 w-full">
            <Select
              placeholder="Select Month"
              onChange={handleMonth}
              border="2px"
              borderColor="black"
              bgColor="white"
              height="43.33px"
            >
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="Maret">Maret</option>
            </Select>
            <Select
              placeholder="Select Year"
              onChange={handleYear}
              border="2px"
              borderColor="black"
              bgColor="white"
              height="43.33px"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </Select>
          </div>
        </div>
        <button className="coloredButton py-2 px-4 font-bold rounded-[9px] border-2 border-black">
          Export to Excel
        </button>
      </div>
      <TableAttendance />
    </>
  );
}

export function AttendanceLog() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mt-3 mb-5">Attendance Log</h1>

      <Tabs colorScheme="black">
        <TabList>
          <Tab>
            <div className="p-2">Daily</div>
          </Tab>
          <Tab>
            <div className="p-2">Monthly</div>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel paddingX={0}>
            <DailyAttendance />
          </TabPanel>
          <TabPanel paddingX={0}>
            <MonthlyAttendance />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export function SettingsAbsentAdmin() {
  return (
    <div className="px-2">
      <div className="border-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Class Detail</h1>
        <div className="mb-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold">Name</h1>
              <h1 className="text-sm sm:text-base mt-1">List 1</h1>
            </div>
            <button className="flex gap-2">
              <span className="font-bold">Change</span>
              <DriveFileRenameOutline />
            </button>
          </div>
        </div>
        <div className="mb-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold">Owner Name</h1>
              <h1 className="text-sm sm:text-base mt-1">
                Farrel Giovanni Jaohari
              </h1>
            </div>
            <button className="flex gap-2">
              <span className="font-bold">Change</span>
              <DriveFileRenameOutline />
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-5">
          <button className="coloredButton py-2 px-7 rounded-md max-w-32">
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

export function SettingsAbsentPeserta() {
  return (
    <>
      <div className="pt-5 px-2 sm:p-5">
        <div className="border-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm">
          <h1 className="text-xl sm:text-2xl font-bold mb-5">Class Detail</h1>
          <div className="mb-5">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="font-bold">Display Name</h1>
                <h1 className="text-sm sm:text-base mt-1">
                  Farrel Giovanni Jaohari
                </h1>
              </div>
              <button className="flex gap-2">
                <span className="font-bold">Change</span>
                <DriveFileRenameOutline />
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

      <div className="pt-5 px-2 sm:p-5">
        <div className="border-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm flex justify-center">
          <button className="bg-red-600 text-white py-2 px-7 rounded-md">
            <Logout className="mr-2" />
            <span>Leave</span>
          </button>
        </div>
      </div>
    </>
  );
}
