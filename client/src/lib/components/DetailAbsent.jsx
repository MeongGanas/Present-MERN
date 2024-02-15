import { useContext, useEffect, useState } from "react";
import AbsenteeDetail from "../../components/AbsenteeDetail";
import { DataContext } from "../../hooks/dataContext";

export default function DetailAbsent({ resource }) {
  const absentData = resource.data.read().absentee;
  const [admin, setAdmin] = useState(false);
  const { userData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (absentData.userId === userData._id) {
      setAdmin(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [absentData]);

  return (
    <>{!loading && <AbsenteeDetail absent={absentData} admin={admin} />}</>
  );
}
