import { Suspense, useContext } from "react";
import Loading from "../components/Loading";
import DetailAbsent from "../lib/components/DetailAbsent";
import { ResourceContext } from "../hooks/resourceContext";

export default function AbsentDetail() {
  const { resource } = useContext(ResourceContext);

  return (
    <Suspense
      fallback={
        <div className="-mt-16">
          <Loading />
        </div>
      }
    >
      <DetailAbsent resource={resource} />
    </Suspense>
  );
}
