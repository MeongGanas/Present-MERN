import { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailAbsentee } from "../lib/wrapperPromise";
import Loading from "../components/Loading";
import DetailAbsent from "../lib/components/DetailAbsent";

export default function AbsentDetail() {
  const { absentId } = useParams();
  const resource = getDetailAbsentee(absentId);

  return (
    <Suspense fallback={<Loading />}>
      <DetailAbsent resource={resource} />
    </Suspense>
  );
}
