import { useContext, useEffect, useState } from "react";
import { TabContext } from "../hooks/tabContext";
import setting from "../img/4860084 1.svg";
import { ArrowBack, ArrowForward, MoreHoriz } from "@mui/icons-material";
import {
  AttendanceLog,
  ListHomeAsAdmin,
  ListHomeAsUser,
  ListPeople,
  SettingsAbsentAdmin,
  SettingsAbsentPeserta,
} from "../ui/Detail/UI";
import {
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tab,
  ChakraProvider,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  Select,
} from "@chakra-ui/react";
import SearchInput from "./SearchInput";

function TableAttendance({ absentHour, attendanceLog }) {
  return (
    <>
      <div className="mt-5 border border-[#C4C4C4] rounded-md overflow-hidden">
        {attendanceLog && (
          <TableContainer>
            <Table variant="striped" bg={"white"}>
              <Thead>
                <Tr>
                  <Th paddingY="5">#</Th>
                  <Th paddingY="5" textAlign="center">
                    Name
                  </Th>
                  <Th paddingY="5" textAlign="center">
                    Check-in
                  </Th>
                  <Th paddingY="5" textAlign="center">
                    Check-out
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {attendanceLog.length > 0 &&
                  attendanceLog.map((log, i) => (
                    <Tr key={log._id}>
                      <Td>{i + 1}</Td>
                      <Td textAlign="center">{log.username}</Td>
                      <Td textAlign="center">{log.checkInTime}</Td>
                      <Td textAlign="center">{log.checkOutTime}</Td>
                    </Tr>
                  ))}
                {attendanceLog.length === 0 && (
                  <Tr>
                    <Td colSpan={6}>There are no present yet.</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </div>
    </>
  );
}

export function DailyAttendance({ absentHour, attendanceLog }) {
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

      <TableAttendance absentHour={absentHour} attendanceLog={attendanceLog} />
    </>
  );
}

export function MonthlyAttendance({ absentHour, attendanceLog }) {
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
      <TableAttendance absentHour={absentHour} attendanceLog={attendanceLog} />
    </>
  );
}

export default function AbsenteeDetail({ absent, admin }) {
  const { activeIndex, setActiveIndex } = useContext(TabContext);

  useEffect(() => {
    if (!admin) {
      setActiveIndex(0);
    }
  }, [admin]);

  return (
    <ChakraProvider>
      <Tabs index={activeIndex} onChange={setActiveIndex} colorScheme="blue">
        <TabList bg={"white"}>
          <div className="sm:px-5 flex">
            <Tab>
              <div className="p-2 font-bold">Home</div>
            </Tab>
            {admin && (
              <Tab>
                <div className="p-2 font-bold">Attendance</div>
              </Tab>
            )}
            <Tab>
              <div className="p-2 font-bold">People</div>
            </Tab>
          </div>
          {admin && (
            <div className="absolute right-0 sm:right-5 top-2.5">
              <button className="iconbutton" onClick={() => setActiveIndex(3)}>
                <img src={setting} alt="" width="24" />
              </button>
            </div>
          )}
          {!admin && (
            <div className="absolute right-0 sm:right-5 top-2.5">
              <button className="iconbutton" onClick={() => setActiveIndex(2)}>
                <MoreHoriz />
              </button>
            </div>
          )}
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="max-w-screen-lg mx-auto">
              {admin && (
                <ListHomeAsAdmin
                  absent={absent}
                  setActiveIndex={setActiveIndex}
                />
              )}
              {!admin && <ListHomeAsUser absent={absent} />}
            </div>
          </TabPanel>

          {admin && (
            <TabPanel>
              <AttendanceLog absent={absent} />
            </TabPanel>
          )}

          <TabPanel>
            <ListPeople absent={absent} admin={admin} />
          </TabPanel>

          {admin && (
            <TabPanel>
              <SettingsAbsentAdmin absent={absent} />
            </TabPanel>
          )}
          {!admin && (
            <TabPanel>
              <SettingsAbsentPeserta absent={absent} />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </ChakraProvider>
  );
}
