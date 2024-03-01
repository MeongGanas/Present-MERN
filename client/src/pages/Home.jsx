import { Suspense, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../hooks/dataContext";
import Loading from "../components/Loading";
import WholeAbsentee from "../lib/components/WholeAbsentee";
import { TabContext } from "../hooks/tabContext";
import { ResourceContext } from "../hooks/resourceContext";

export default function Home() {
  const { resource } = useContext(ResourceContext);
  const { setActiveIndex } = useContext(TabContext);

  useEffect(() => {
    setActiveIndex(0);
  });

  return (
    <Suspense
      fallback={
        <div className="-mt-16">
          <Loading />
        </div>
      }
    >
      <WholeAbsentee resource={resource} />
    </Suspense>
  );
}
