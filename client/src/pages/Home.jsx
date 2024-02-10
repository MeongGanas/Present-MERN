import { useContext, useState } from "react";
import NotJoin from "../ui/home/NotJoin";
import WholeCard from "../components/Card";
import { LayoutContext } from "../hooks/dialogContext";
import { TabContext } from "../hooks/tabContext";

export default function Home() {
  const [absentee, setAbsentee] = useState(1);
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
