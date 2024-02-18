import { Suspense, useContext, useEffect } from "react";
import Loading from "../components/Loading";
import DetailAbsent from "../lib/components/DetailAbsent";
import { ResourceContext } from "../hooks/resourceContext";
import { DataContext } from "../hooks/dataContext";
import { useNavigate } from "react-router-dom";

export default function AbsentDetail() {
  const navigate = useNavigate();
  const { resource } = useContext(ResourceContext);
  const { token } = useContext(DataContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <Suspense
      fallback={
        <div className="-mt-16">
          <Loading />
        </div>
      }
    >
      <DetailAbsent resource={resource} />
    </Suspense>
  );
}
