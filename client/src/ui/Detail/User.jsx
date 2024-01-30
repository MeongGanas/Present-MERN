import { useEffect, useState } from "react";
import { MoreHoriz, Search } from "@mui/icons-material";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

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
    <div className="p-5 listDetail text-white rounded-md">
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
        <div className="flex px-5 sm:px-10 justify-center gap-5 pt-5">
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
    <div>
      <h1 className="text-2xl font-bold mt-3 mb-10">List of people</h1>
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="absolute left-3 top-3.5" />
          <input type="text" className="pl-10" placeholder="Search Name" />
        </div>
        <h1 className="font-bold">1 People</h1>
      </div>
      <div className="mt-5 border rounded-md">
        <TableContainer>
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th paddingY="5" align="center" justifyContent="center">
                  #
                </Th>
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
                  1
                </Td>
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
                  2
                </Td>
                <Td align="center" justifyContent="center">
                  <div className="w-6 h-6 rounded-full border border-black"></div>
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
    </div>
  );
}
