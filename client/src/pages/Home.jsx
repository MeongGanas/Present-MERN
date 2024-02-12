import { useContext, useEffect, useState } from "react";
import NotJoin from "../ui/home/NotJoin";
import WholeCard from "../components/Card";
import { LayoutContext } from "../hooks/dialogContext";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../hooks/tokenContext";
import { getAbsentee } from "../lib/absentee";

export default function Home() {
  const navigate = useNavigate();
  const [absentee, setAbsentee] = useState(null);
  const { setCreateActive, setJoinActive } = useContext(LayoutContext);
  const { token, userData } = useContext(TokenContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    const getAll = async () => {
      const response = await getAbsentee(userData._id);
      console.log(response);
    };
    getAll();
  }, [token]);

  return (
    <>
      {!absentee && (
        <NotJoin
          setCreateActive={setCreateActive}
          setJoinActive={setJoinActive}
        />
      )}
      {absentee && <WholeCard />}
    </>
  );
}
