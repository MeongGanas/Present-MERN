import { useNavigate } from "react-router-dom";
import LayoutLogin from "../Layout/layoutLogin";
import { useContext, useState } from "react";
import swal from "sweetalert2";
import { DataContext } from "../hooks/dataContext";
import { loginUser } from "../lib/actions";
import Loading from "../components/Loading";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const { setUserData } = useContext(DataContext);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser(email, password);
      const userData = await data.user;
      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify(userData));
      setUserData(data.user);
      navigate("/home");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      swal.fire({
        title: "Login Fail!",
        text: err.response?.data?.mssg || "An error occurred during login",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
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
            <p className="font-bold text-lg">Login</p>
          </div>
          <form className="min-w-sm" onSubmit={login}>
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
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="input"
                autoComplete="off"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-5 flex justify-end mt-2">
              <h4 className="text-sm">
                Forgot your password?
                <span className="text-primary font-bold"> click here</span>
              </h4>
            </div>
            <button type="submit" className="button coloredButton mb-5">
              Login
            </button>
          </form>
          <div className="absolute bottom-3 w-full text-center left-0">
            <h4 className="text-sm">
              Don't have an account?
              <a className="text-primary font-bold" href="/register">
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
