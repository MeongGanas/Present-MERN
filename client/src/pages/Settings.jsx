import { Link } from "react-router-dom";
import orang from "../img/4836491 1.svg";
import { DriveFileRenameOutline } from "@mui/icons-material";

export default function Settings() {
  return (
    <div className=" pt-5 px-2 sm:p-5">
      <div className="border-2 border-[#c4c4c4] min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm">
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
          <div className="flex justify-between">
            <h1 className="font-bold">Name</h1>
            <button className="flex gap-2">
              <span className="font-bold">Change</span>
              <DriveFileRenameOutline />
            </button>
          </div>
          <h1 className="text-sm sm:text-base mt-1">Farrel Giovanni Jaohari</h1>
        </div>
        <div className="mb-5">
          <div className="flex justify-between">
            <h1 className="font-bold">Email</h1>
            <button className="flex gap-2">
              <span className="font-bold">Change</span>
              <DriveFileRenameOutline />
            </button>
          </div>
          <h1 className="mt-1 text-sm sm:text-base">akuntumbal@gmail.com</h1>
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
    </div>
  );
}
