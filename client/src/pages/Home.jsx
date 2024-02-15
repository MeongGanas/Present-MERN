import { Suspense, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../hooks/dataContext";
import Loading from "../components/Loading";
import WholeAbsentee from "../lib/components/WholeAbsentee";
import { TabContext } from "../hooks/tabContext";

export default function Home() {
  const navigate = useNavigate();
  const { token, resource } = useContext(DataContext);
  const { setActiveIndex } = useContext(TabContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    setActiveIndex(0);
  }, [token]);

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
