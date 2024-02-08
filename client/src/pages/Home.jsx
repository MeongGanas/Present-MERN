import { useContext, useState } from "react";
import NotJoin from "../ui/home/NotJoin";
import WholeCard from "../components/Card";
import { LayoutContext } from "../hooks/dialogContext";

export default function Home() {
  const [absentee, setAbsentee] = useState(null);
  const { setCreateActive, setJoinActive } = useContext(LayoutContext);

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
