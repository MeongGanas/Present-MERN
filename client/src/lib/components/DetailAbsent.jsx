import { useContext, useEffect, useState } from "react";
import AbsenteeDetail from "../../components/AbsenteeDetail";
import { DataContext } from "../../hooks/dataContext";
import { getSingleAbsentee } from "../absentee";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DetailAbsent({ resource }) {
  const [admin, setAdmin] = useState(false);
  const { absentId } = useParams();
  const { userData } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const absent = resource.data.read().absentee;
  let absentDetail = getSingleAbsentee(absent, absentId);

  useEffect(() => {
    absentDetail = getSingleAbsentee(absent, absentId);
  }, [absentId]);

  useEffect(() => {
    if (userData) {
      setLoading(true);
      if (absentDetail.userId === userData._id) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
      setLoading(false);
    }
  }, [absentDetail]);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        newestOnTop={false}
        closeOnClick
        hideProgressBar
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {!loading && <AbsenteeDetail absent={absentDetail} admin={admin} />}
    </>
  );
}
