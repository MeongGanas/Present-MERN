import { useState } from "react";
import NotJoin from "../ui/home/NotJoin";
import WholeCard from "../components/Card";

export default function Home({ setCreateActive, setJoinActive }) {
  const [absentee, setAbsentee] = useState(null);
  return (
    <>
      {!absentee && <NotJoin />}
      {absentee && <WholeCard />}
    </>
  );
}
