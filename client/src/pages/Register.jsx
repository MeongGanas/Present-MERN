import { useState } from "react";
import LayoutLogin from "../Layout/layoutLogin";
import swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const register = (e) => {
    e.preventDefault();

    const data = { username, email, password };

    axios
      .post("https://present-server-nine.vercel.app/api/user/register", data)
      .then((response) => {
        swal
          .fire({
            title: "Register Success!",
            icon: "success",
            confirmButtonText: "Close",
            timer: 1000,
          })
          .then(() => {
            navigate("/");
          });
      })
      .catch((err) => {
        // swal.fire({
        //   title: "Register Fail!",
        //   text: err,
        //   icon: "error",
        //   confirmButtonText: "Close",
        // });
        console.log(err);
      });
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
