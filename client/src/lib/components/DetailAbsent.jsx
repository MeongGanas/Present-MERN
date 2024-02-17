import { useContext, useEffect, useState } from "react";
import AbsenteeDetail from "../../components/AbsenteeDetail";
import { DataContext } from "../../hooks/dataContext";
import { getSingleAbsentee } from "../absentee";
import { useParams } from "react-router-dom";

export default function DetailAbsent({ resource }) {
  const [admin, setAdmin] = useState(false);
  const { absentId } = useParams();
  const { userData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const absent = resource.data.read().absentee;
  const absentDetail = getSingleAbsentee(absent, absentId);

  useEffect(() => {
    setLoading(true);
    if (absentDetail.userId === userData._id) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
    setLoading(false);
  }, [absentDetail]);

  return (
    <>{!loading && <AbsenteeDetail absent={absentDetail} admin={admin} />}</>
  );
}
