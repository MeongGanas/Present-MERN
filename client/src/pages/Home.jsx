import { useState } from "react";
import Layout from "../Layout/layout";
import NotJoin from "../ui/home/NotJoin";
import WholeCard from "../components/Card";

export default function Home() {
  const [absentee, setAbsentee] = useState(1);
  return (
    <Layout>
      {!absentee && <NotJoin />}
      {absentee && <WholeCard />}
    </Layout>
  );
}
