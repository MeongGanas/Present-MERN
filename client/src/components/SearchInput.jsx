import { Search } from "@mui/icons-material";

export function AttendanceSearchInput({ tempAttendanceLog, setAttendanceLog }) {
  const filter = (name) => {
    const newAttendance = tempAttendanceLog.filter((log) => {
      return log.username.toLowerCase().includes(name);
    });
    setAttendanceLog(newAttendance);
  };

  return (
    <form className="relative max-w-60 min-w-52">
      <Search className="absolute left-3 top-2.5" />
      <input
        type="text"
        className="h-full w-full border-2 border-black px-5 pl-10 py-2 rounded-[9px]"
        placeholder="Search Name"
        onChange={(e) =>
          setTimeout(() => {
            filter(e.target.value);
          }, 300)
        }
      />
    </form>
  );
}

export function PeopleSearchInput({ participantsTemp, setParticipants }) {
  const filter = (name) => {
    const newPaticipants = participantsTemp.filter((participant) => {
      return participant.username.toLowerCase().includes(name);
    });
    setParticipants(newPaticipants);
  };

  return (
    <form className="relative w-full max-w-64">
      <Search className="absolute left-3 top-2.5" />
      <input
        type="text"
        className="h-full w-full border-2 border-black px-5 pl-10 py-2 rounded-[9px]"
        placeholder="Search Name"
        onChange={(e) =>
          setTimeout(() => {
            filter(e.target.value);
          }, 300)
        }
      />
    </form>
  );
}
