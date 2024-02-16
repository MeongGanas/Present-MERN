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
  const absentData = getSingleAbsentee(resource.data.read().absentee, absentId);

  useEffect(() => {
    setLoading(true);
    if (absentData.userId === userData._id) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
    setLoading(false);
  }, [absentData]);

  return (
    <>{!loading && <AbsenteeDetail absent={absentData} admin={admin} />}</>
  );
}
