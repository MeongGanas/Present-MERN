import { useNavigate, useParams } from "react-router-dom";
import LayoutLogin from "../Layout/layoutLogin";
import { useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";

export default function ResetPass() {
  const navigate = useNavigate();
  const { userId, token } = useParams();
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`https://present-server-nine.vercel.app/reset/${userId}/${token}`, {
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <LayoutLogin>
      {loading && (
        <div className="-mt-10">
          <Loading />
        </div>
      )}
      {!loading && (
        <div className="min-w-80">
          <div className="text-center mb-7">
            <h1 className="text-primary mb-3 font-bold text-3xl">Present</h1>
            <p className="font-bold text-lg">Reset Password</p>
          </div>
          <form className="min-w-sm" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="password">New Password</label>
              <input
                type="text"
                name="password"
                id="password"
                className="mb-5 input"
                autoComplete="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="button coloredButton mb-5">
              Reset Password
            </button>
          </form>

          <div className="absolute bottom-3 w-full text-center left-0">
            <h4 className="text-sm">
              Back?
              <a className="text-primary font-bold" href="/login">
                {" "}
                click here
              </a>
            </h4>
          </div>
        </div>
      )}
    </LayoutLogin>
  );
}
