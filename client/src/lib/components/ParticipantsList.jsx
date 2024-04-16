import { useContext, useState } from "react";
import { leaveAbsentee } from "../actions";
import { LoadingContext } from "../../hooks/loadingContext";
import { PeopleSearchInput } from "../../components/SearchInput";

export default function ParticipantsList({
  absent,
  participantResource,
  ownerResource,
  admin,
}) {
  const { setLoading } = useContext(LoadingContext);
  const usersDetail = participantResource.data.read().data;
  const ownerDetail = ownerResource.data.read().data[0];

  const [participants, setParticipants] = useState(usersDetail);

  const kick = async (userId) => {
    setLoading(true);

    await leaveAbsentee(absent._id, userId).then(() => {
      setLoading(false);
    });
  };

  return (
    <>
      <PeopleSearchInput
        participantsTemp={usersDetail}
        setParticipants={setParticipants}
      />
      <div className="bg-white mt-5 rounded-md border p-5">
        <div className="mb-5" id="admin-list">
          <h1 className="mb-5 border-b border-b-gray-300 py-2 text-xl font-bold">
            Admin
          </h1>
          <div className="flex gap-5 items-center">
            <div className="border-2 w-11 h-11 border-black rounded-full flex items-center justify-center">
              {ownerDetail.profile && (
                <img
                  src={ownerDetail.profile}
                  className="w-11 h-10 rounded-full"
                />
              )}
              {!ownerDetail.profile && (
                <h1 className="uppercase font-bold">{absent.ownerName[0]}</h1>
              )}
            </div>
            <h1 className="text-lg">{absent.ownerName}</h1>
          </div>
        </div>

        <div id="participants-list">
          <div className="flex justify-between border-b border-b-gray-300 py-2">
            <h1 className="text-xl font-bold">Peserta</h1>
            <h1 className="font-bold">{usersDetail.length} People</h1>
          </div>
          <ul>
            {participants &&
              participants.map((participant, i) => (
                <li className="people" key={participant._id}>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                      <div className="border-2 w-11 h-11 border-black rounded-full flex items-center justify-center">
                        {participant.profile && (
                          <img
                            src={participant.profile}
                            className="w-11 h-10 rounded-full"
                          />
                        )}
                        {!participant.profile && (
                          <h1 className="uppercase font-bold">
                            {absent.usersJoin[i].username[0]}
                          </h1>
                        )}
                      </div>
                      <h1 className="text-lg">
                        {absent.usersJoin[i].username}
                      </h1>
                    </div>
                    {admin && (
                      <button
                        className="text-red-700"
                        value={participant._id}
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
    </>
  );
}
