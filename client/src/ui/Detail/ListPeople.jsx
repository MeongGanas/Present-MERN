import { Suspense, useEffect, useMemo } from "react";
import ParticipantsList from "../../lib/components/ParticipantsList";
import { getUsersData } from "../../lib/wrapperPromise";
import ListPeopleSkeleton from "../../components/skeletons/listPeople";

export function ListPeople({ absent, admin }) {
  const participantResource = useMemo(
    () => getUsersData(absent.usersJoin.map((user) => user.userId)),
    [absent]
  );
  const ownerResource = useMemo(() => getUsersData([absent.userId]), [absent]);

  return (
    <div className="max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mt-3 mb-10">List of people</h1>
      <Suspense
        fallback={
          <ListPeopleSkeleton
            users={absent.usersJoin}
            admin={admin}
            owner={absent.ownerName}
          />
        }
      >
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
