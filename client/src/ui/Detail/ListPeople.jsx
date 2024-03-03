import { Suspense, useEffect, useMemo, useState } from "react";
import { PeopleSearchInput } from "../../components/SearchInput";
import ParticipantsList from "../../lib/components/ParticipantsList";
import { getUsersData } from "../../lib/wrapperPromise";
import Loading from "../../components/Loading";

export function ListPeople({ absent, admin }) {
  const [participantsTemp, setParticipantsTemp] = useState([]);
  const [participants, setParticipants] = useState([]);
  const participantResource = useMemo(
    () => getUsersData(absent.usersJoin.map((user) => user.userId)),
    [absent]
  );
  const ownerResource = useMemo(() => getUsersData([absent.userId]), [absent]);

  useEffect(() => {
    setParticipants(absent.usersJoin);
    setParticipantsTemp(absent.usersJoin);
  }, [absent]);

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mt-3 mb-10">List of people</h1>
      <PeopleSearchInput
        participantsTemp={participantsTemp}
        setParticipants={setParticipants}
      />
      <Suspense fallback={<Loading />}>
        <ParticipantsList
          absent={absent}
          ownerResource={ownerResource}
          participantResource={participantResource}
          admin={admin}
        />
      </Suspense>
    </div>
  );
}
