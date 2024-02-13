import { useContext, useEffect, useState } from "react";
import NotJoin from "../ui/home/NotJoin";
import WholeCard from "../components/Card";
import { LayoutContext } from "../hooks/dialogContext";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../hooks/tokenContext";
import { getAbsentee } from "../lib/absentee";
import { LoadingContext } from "../hooks/loadingContext";
import { FormatColorResetSharp } from "@mui/icons-material";

export default function Home() {
  const navigate = useNavigate();
  const [absentee, setAbsentee] = useState(null);
  const { setCreateActive, setJoinActive } = useContext(LayoutContext);
  const { token, userData } = useContext(TokenContext);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      const getAll = async () => {
        const absenteeData = await getAbsentee(userData._id);
        setAbsentee(absenteeData);
      };
      getAll();
    }
  }, [token]);

  return (
    <>
      {!absentee && (
        <NotJoin
          setCreateActive={setCreateActive}
          setJoinActive={setJoinActive}
        />
      )}
      {absentee && <WholeCard absentee={absentee} />}
    </>
  );
}
