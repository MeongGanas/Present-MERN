import { useContext, useEffect } from "react";
import orang from "../img/4836491 1.svg";
import { DriveFileRenameOutline, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../hooks/tokenContext";
import swal from "sweetalert2";

export default function Settings() {
  const navigate = useNavigate();
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const logout = () => {
    swal
      .fire({
        title: "Logout Success!",
        icon: "success",
        confirmButtonText: "Close",
        timer: 1000,
      })
      .then(() => {
        localStorage.removeItem("token");
        setToken(null);
      });
  };

  return (
    <div className="pt-5 px-2 sm:p-5">
      <div className="border-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm">
        <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
        <div className="flex items-center gap-5 my-5">
          <div className="border-2 rounded-full p-2 border-black">
            <img src={orang} alt="" />
          </div>
          <button className="flex gap-2">
            <span className="font-bold">Change</span>
            <DriveFileRenameOutline />
          </button>
        </div>
        <div className="mb-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold">Name</h1>
              <h1 className="text-sm sm:text-base mt-1">
                Farrel Giovanni Jaohari
              </h1>
            </div>
            <button className="flex gap-2">
              <span className="font-bold">Change</span>
              <DriveFileRenameOutline />
            </button>
          </div>
        </div>
        <div className="mb-5">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold">Email</h1>
              <h1 className="mt-1 text-sm sm:text-base">
                akuntumbal@gmail.com
              </h1>
            </div>
            <button className="flex gap-2">
              <span className="font-bold">Change</span>
              <DriveFileRenameOutline />
            </button>
          </div>
        </div>
        <div className="mb-5">
          <h1 className="font-bold">Password</h1>
          <button className="flex gap-2">
            <span className="underline">Change Password</span>
          </button>
        </div>

        <div className="flex justify-end gap-5">
          <button className="coloredButton py-2 px-7 rounded-md max-w-32">
            Save
          </button>
        </div>
      </div>
      <div className="pt-5 px-2 sm:p-5">
        <div className="border-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm flex justify-center">
          <button
            className="bg-red-600 text-white py-2 px-7 rounded-md"
            onClick={logout}
          >
            <Logout className="mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
