import { Suspense, useContext } from "react";
import Loading from "../components/Loading";
import DetailAbsent from "../lib/components/DetailAbsent";
import { ResourceContext } from "../hooks/resourceContext";
import { useParams } from "react-router-dom";
import MakeAbsenteeDialog from "../components/dialog/MakeAbsent";

export default function AbsentDetail() {
  const { resource } = useContext(ResourceContext);
  const { absentId } = useParams();

  return (
    <Suspense
      fallback={
        <div className="-mt-16">
          <Loading />
        </div>
      }
    >
      <MakeAbsenteeDialog absentId={absentId} />

      <DetailAbsent resource={resource} />
    </Suspense>
  );
}
