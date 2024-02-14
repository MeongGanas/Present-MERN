import { Suspense, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TokenContext } from "../hooks/tokenContext";
import Loading from "../components/Loading";
import WholeAbsentee from "../lib/components/WholeAbsentee";
import { getUserAbsentee } from "../lib/wrapperPromise";

export default function Home() {
  const navigate = useNavigate();
  const { token, userData } = useContext(TokenContext);
  const resource = getUserAbsentee(userData._id);

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
      <WholeAbsentee resource={resource} />
    </Suspense>
  );
}
