import { useContext, useEffect, useState } from "react";
import { PeopleSearchInput } from "../../components/SearchInput";
import { leaveAbsentee } from "../../lib/actions";
import { LoadingContext } from "../../hooks/loadingContext";

export function ListPeople({ absent, admin }) {
  const { setLoading } = useContext(LoadingContext);
  const [participantsTemp, setParticipantsTemp] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    setParticipants(absent.usersJoin);
    setParticipantsTemp(absent.usersJoin);
  }, [absent]);

  const kick = async (userId) => {
    setLoading(true);

    await leaveAbsentee(absent._id, userId).then(() => {
      setLoading(false);
    });
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mt-3 mb-10">List of people</h1>
      <PeopleSearchInput
        participantsTemp={participantsTemp}
        setParticipants={setParticipants}
      />
      <div className="bg-white mt-5 rounded-md border p-5">
        <div className="mb-5" id="admin-list">
          <h1 className="mb-5 border-b border-b-gray-300 py-2 text-xl font-bold">
            Admin
          </h1>
          <div className="flex gap-5 items-center">
            <div className="circle flex justify-center items-center">
              <h1 className="font-bold">{absent.ownerName[0]}</h1>
            </div>
            <h1 className="text-lg">{absent.ownerName}</h1>
          </div>
        </div>

        <div id="participants-list">
          <div className="flex justify-between border-b border-b-gray-300 py-2">
            <h1 className="text-xl font-bold">Peserta</h1>
            <h1 className="font-bold">{participants.length} People</h1>
          </div>
          <ul>
            {participants &&
              participants.map((participant) => (
                <li className="people" key={participant.userId}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                      <div className="circle flex items-center justify-center">
                        <h1>{participant.username[0]}</h1>
                      </div>
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
