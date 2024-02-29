import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function TableAttendance({ absentHour, attendanceLog }) {
  return (
    <div className="mt-5 border border-[#C4C4C4] bg-white rounded-md overflow-hidden">
      {absentHour.length === 0 && (
        <h1 className="p-5">There are no absentee hours yet.</h1>
      )}

      {attendanceLog && absentHour.length > 0 && (
        <TableContainer>
          <Table variant="striped" bg={"white"}>
            <Thead>
              <Tr>
                <Th paddingY="5">#</Th>
                <Th paddingY="5" textAlign="center">
                  Name
                </Th>
                <Th paddingY="5" textAlign="center">
                  Shift
                </Th>
                <Th paddingY="5" textAlign="center">
                  Check-in
                </Th>
                <Th paddingY="5" textAlign="center">
                  Check-out
                </Th>
                <Th paddingY="5" textAlign="center">
                  Status
                </Th>
                <Th paddingY="5" textAlign="center">
                  Detail
                </Th>
                <Th paddingY="5" textAlign="center">
                  Date
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {attendanceLog.length > 0 &&
                attendanceLog.map((log, i) => (
                  <Tr key={i}>
                    <Td>{i + 1}</Td>
                    <Td textAlign="center">
                      {log.maps !== "-" && (
                        <Link
                          to={log.maps}
                          target="_blank"
                          className="underline"
                        >
                          {log.username}
                        </Link>
                      )}
                      {log.maps === "-" && <h1>{log.username}</h1>}
                    </Td>
                    <Td textAlign="center">{log.shift}</Td>
                    <Td textAlign="center">{log.checkInTime}</Td>
                    <Td textAlign="center">{log.checkOutTime}</Td>
                    <Td textAlign="center">{log.status}</Td>
                    <Td textAlign="center">{log.detail}</Td>
                    <Td textAlign="center">
                      {new Date(log.date).toLocaleDateString("id-ID")}
                    </Td>
                  </Tr>
                ))}
              {attendanceLog.length === 0 && (
                <Tr>
                  <Td colSpan={8}>Belum ada peserta yang mengisi absensi.</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
