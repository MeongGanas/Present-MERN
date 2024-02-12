import { useContext, useEffect, useState } from "react";
import LayoutLogin from "../Layout/layoutLogin";
import swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../hooks/loadingContext";
import { TokenContext } from "../hooks/tokenContext";
import { registerUser } from "../lib/UserActions";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { setLoading } = useContext(LoadingContext);

  const { token } = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await registerUser(username, email, password);
      swal
        .fire({
          title: "Register Success!",
          icon: "success",
          confirmButtonText: "Close",
          timer: 1000,
        })
        .then(() => {
          navigate("/login");
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
      swal.fire({
        title: "Register Fail!",
        text: err.response?.data?.mssg || "An error occurred during register",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <LayoutLogin>
      <div className="min-w-80">
        <div className="text-center mb-7">
          <h1 className="text-primary mb-3 font-bold text-3xl">Present</h1>
          <p className="font-bold text-lg">Register</p>
        </div>
        <form className="min-w-sm">
          <div className="mb-5">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="example"
              className="input"
              autoComplete="username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@gmail.com"
              className="input"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-10">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="input"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
              required
            />
          </div>
          <button
            type="submit"
            className="button coloredButton"
            onClick={register}
          >
            Register
          </button>
        </form>
        <div className="absolute bottom-3 w-full text-center left-0">
          <h4 className="text-sm">
            Already have an account?
            <a className="text-primary font-bold" href="/login">
              {" "}
              click here
            </a>
          </h4>
        </div>
      </div>
    </LayoutLogin>
  );
}
