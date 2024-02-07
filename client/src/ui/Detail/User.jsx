import { useEffect, useState } from "react";
import {
  ArrowForward,
  DriveFileRenameOutline,
  MoreHoriz,
  Search,
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import shape from "../../img/Scribble-28.svg.svg";

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

export function ListPeopleAsUser() {
  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mt-3 mb-10">List of people</h1>
      <div className="flex justify-between items-center">
        <div className="relative w-2/3 sm:w-1/2">
          <Search className="absolute left-3 top-3.5" />
          <input type="text" className="pl-10" placeholder="Search Name" />
        </div>
        <h1 className="font-bold">1 People</h1>
      </div>
      <div>
        <h1>Admin</h1>
        <div className="flex justify-between">
          <div className="flex">
            <div className="w-6 h-6 rounded-full border border-black"></div>
            <h1>Farrel Giovanni Jaohari</h1>
          </div>
          <button className="iconbutton">
            <MoreHoriz />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ListHomeAsAdmin({ setActiveIndex }) {
  const navigate = useNavigate();
  const [absent, setAbsent] = useState(null);

  const handleButtonClick = () => {
    setActiveIndex(1);
  };

  return (
    <div>
      <div className="w-full p-5 mb-5 listDetail rounded-md min-h-64 flex flex-col justify-between">
        <div className="w-full flex justify-end">
          <button className="bg-white py-2 px-3 rounded-md shadow-sm flex gap-2">
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
                <span className="text-primary">make one</span>
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TableAttendance() {
  return (
    <>
      <div className="mt-5 border border-[#C4C4C4] rounded-md">
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th paddingY="5" align="center" justifyContent="center">
                  Photo
                </Th>
                <Th paddingY="5" align="center" justifyContent="center">
                  Name
                </Th>
                <Th paddingY="5" align="center" justifyContent="center">
                  Position
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td align="center" justifyContent="center">
                  <div className="w-6 h-6 rounded-full border border-black"></div>
                </Td>
                <Td align="center" justifyContent="center">
                  Farrel Giovanni Jaohari
                </Td>
                <Td align="center" justifyContent="center">
                  Admin
                </Td>
                <Td align="center" justifyContent="center">
                  <button className="iconbutton">
                    <MoreHoriz />
                  </button>
                </Td>
              </Tr>
              <Tr>
                <Td align="center" justifyContent="center">
                  <div className="circle"></div>
                </Td>
                <Td align="center" justifyContent="center">
                  Farouk
                </Td>
                <Td align="center" justifyContent="center">
                  Peserta
                </Td>
                <Td align="center" justifyContent="center">
                  <button className="iconbutton">
                    <MoreHoriz />
                  </button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </div>
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
            <TableAttendance />
          </TabPanel>
          <TabPanel paddingX={0}>
            <div className="flex justify-between items-center">
              <div className="relative w-2/3 sm:w-1/2">
                <Search className="absolute left-3 top-3.5" />
                <input
                  type="text"
                  className="pl-10"
                  placeholder="Search Name"
                />
              </div>
              <h1 className="font-bold">1 People</h1>
            </div>
            <TableAttendance />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
