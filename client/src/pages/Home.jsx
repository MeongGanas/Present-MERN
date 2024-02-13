import { Suspense, useContext, useEffect } from "react";
import WholeCard from "../components/Card";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../hooks/tokenContext";
import Loading from "../components/Loading";

export default function Home() {
  const navigate = useNavigate();
  const { token, userData } = useContext(TokenContext);

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
      <WholeCard userId={userData._id} />
    </Suspense>
  );
}
