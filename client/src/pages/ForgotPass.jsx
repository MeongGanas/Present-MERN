import { useNavigate } from "react-router-dom";
import LayoutLogin from "../Layout/layoutLogin";
import { useState } from "react";
import Loading from "../components/Loading";
import axios from "axios";
import swal from "sweetalert2";

export default function ForgotPass() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    axios
      .post("https://present-server-nine.vercel.app/forgotpass", { email })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/login");
        }
      })
      .catch((err) => {
        setLoading(false);
        swal.fire({
          title: "Forgot Password Fail!",
          text: err.response?.data?.mssg || "An error occurred",
          icon: "error",
          confirmButtonText: "Close",
        });
      });
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
            <p className="font-bold text-lg">Forgot Password</p>
          </div>
          <form className="min-w-sm" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="mb-5 input"
                placeholder="example@gmail.com"
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button type="submit" className="button coloredButton mb-5">
              Send Email
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
