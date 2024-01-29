import { useNavigate } from "react-router-dom";
import LayoutLogin from "../Layout/layoutLogin";
import { ReactComponent as Google } from "../img/7123025_logo_google_g_icon 1.svg";

export default function Selection() {
  const navigate = useNavigate();
  return (
    <LayoutLogin>
      <div className="min-w-80">
        <div className="text-center mb-10">
          <h1 className="text-primary mb-3 font-bold text-3xl">Present</h1>
          <p className="font-bold text-lg">Let’s get you started</p>
        </div>
        <div className="min-w-sm">
          <button
            className="button coloredButton"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button className="button" onClick={() => navigate("/register")}>
            Register
          </button>
          <div className="flex items-center gap-3 mb-5">
            <span className="line"></span>
            <span>or login with</span>
            <span className="line"></span>
          </div>
          <button className="flex border-2 border-black py-2 w-full rounded-xl justify-center items-center">
            <Google />
            <span className="mr-3">Google</span>
          </button>
        </div>
      </div>
    </LayoutLogin>
  );
}
