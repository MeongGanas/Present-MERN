import { useContext } from "react";
import { leaveAbsentee } from "../actions";
import { LoadingContext } from "../../hooks/loadingContext";

export default function ParticipantsList({
  absent,
  participantResource,
  ownerResource,
  admin,
}) {
  const { setLoading } = useContext(LoadingContext);
  const usersDetail = participantResource.data.read().data;
  const ownerDetail = ownerResource.data.read().data[0];

  const kick = async (userId) => {
    setLoading(true);

    await leaveAbsentee(absent._id, userId).then(() => {
      setLoading(false);
    });
  };

  return (
    <div className="bg-white mt-5 rounded-md border p-5">
      <div className="mb-5" id="admin-list">
        <h1 className="mb-5 border-b border-b-gray-300 py-2 text-xl font-bold">
          Admin
        </h1>
        <div className="flex gap-5 items-center">
          <div className="circle p-1 flex justify-center items-center">
            {ownerDetail.profile && <img src={ownerDetail.profile} alt="" />}
            {!ownerDetail.profile && (
              <h1 className="font-bold">{absent.ownerName[0]}</h1>
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
          {usersDetail &&
            usersDetail.map((participant) => (
              <li className="people" key={participant._id}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-5 items-center">
                    <div className="circle p-1 flex items-center justify-center">
                      {participant.profile && (
                        <img src={participant.profile} alt="" />
                      )}
                      {!participant.profile && (
                        <h1>{participant.username[0]}</h1>
                      )}
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
  );
}
