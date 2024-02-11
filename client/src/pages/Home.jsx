import { useContext, useEffect, useState } from "react";
import NotJoin from "../ui/home/NotJoin";
import WholeCard from "../components/Card";
import { LayoutContext } from "../hooks/dialogContext";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../hooks/tokenContext";

export default function Home() {
  const navigate = useNavigate();
  const [absentee, setAbsentee] = useState(1);
  const { setCreateActive, setJoinActive } = useContext(LayoutContext);
  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
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
      {absentee && <WholeCard />}
    </>
  );
}
