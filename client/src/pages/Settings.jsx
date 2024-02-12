import { useContext, useEffect } from "react";
import orang from "../img/4836491 1.svg";
import { DriveFileRenameOutline, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../hooks/tokenContext";
import { logoutUser } from "../lib/UserActions";

export default function Settings() {
  const navigate = useNavigate();
  const { token, userData, setToken, setUserData } = useContext(TokenContext);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="p-5">
      <div className="border-2 mx-auto border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 p-5 rounded-md max-w-screen-sm">
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
              {userData && (
                <h1 className="text-sm sm:text-base mt-1">
                  {userData.username}
                </h1>
              )}
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
              {userData && (
                <h1 className="mt-1 text-sm sm:text-base">{userData.email}</h1>
              )}
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
      <div className="border-2 mx-auto mt-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 p-5 rounded-md max-w-screen-sm flex justify-end">
        <button
          className="bg-red-600 text-white py-2 px-7 rounded-md"
          onClick={() => logoutUser(setToken, setUserData)}
        >
          <Logout className="mr-2" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
