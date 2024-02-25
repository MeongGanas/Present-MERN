import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export default function TableAttendance({ attendanceLog }) {
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
                  <Th paddingY="5" textAlign="center">
                    Status
                  </Th>
                  <Th paddingY="5" textAlign="center">
                    Date
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
                      <Td textAlign="center">{log.status}</Td>
                      <Td textAlign="center">
                        {new Date(log.date).toLocaleDateString("id-ID")}
                      </Td>
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
