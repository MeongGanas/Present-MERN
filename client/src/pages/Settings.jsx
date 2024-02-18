import { useContext, useEffect, useState } from "react";
import orang from "../img/4836491 1.svg";
import { DriveFileRenameOutline, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { logoutUser, updateUser } from "../lib/actions";
import { DataContext } from "../hooks/dataContext";

export default function Settings() {
  const navigate = useNavigate();
  const { token, userData, setToken, setUserData } = useContext(DataContext);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);

  const [username, setUsername] = useState(userData.username);
  const [email, setEmail] = useState(userData.email);
  const [photo, setPhoto] = useState(userData.profile);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleUpdate = async () => {
    await updateUser({ username, email, photo });
  };

  return (
    <div className="p-5">
      {userData && (
        <>
          <div className="border-2 mx-auto border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 p-5 rounded-md max-w-screen-sm">
            <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
            <div className="flex items-center gap-5 my-5">
              <div>
                <div className="border-2 w-fit rounded-full p-2 border-black">
                  <img src={orang} alt="" />
                </div>
              </div>
              <button className="flex gap-2" onClick={() => setEditPhoto(true)}>
                <span className="font-bold">Change</span>
                <DriveFileRenameOutline />
              </button>
            </div>
            <div className={`mt-3 mb-5 ${editPhoto ? "block" : "hidden"}`}>
              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-5000">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-5000">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div>
            </div>
            <div className="mb-5">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-bold">Name</h1>
                  <h1
                    className={`text-sm sm:text-base mt-1 ${
                      editName ? "hidden" : "block"
                    }`}
                  >
                    {userData.username}
                  </h1>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={`input ${editName ? "block" : "hidden"}`}
                  />
                </div>
                <button
                  className="flex gap-2"
                  onClick={() => setEditName(true)}
                >
                  <span className="font-bold">Change</span>
                  <DriveFileRenameOutline />
                </button>
              </div>
            </div>
            <div className="mb-5">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="font-bold">Email</h1>
                  <h1
                    className={`text-sm sm:text-base mt-1 ${
                      editEmail ? "hidden" : "block"
                    }`}
                  >
                    {userData.email}
                  </h1>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input ${editEmail ? "block" : "hidden"}`}
                  />
                </div>
                <button
                  className="flex gap-2"
                  onClick={() => setEditEmail(true)}
                >
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
              <button
                className="p-2 border-2 border-[#d9d9d9] rounded-md"
                onClick={() => {
                  setEditName(false);
                  setEditEmail(false);
                  setEditPhoto(false);
                }}
              >
                Cancel
              </button>
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
        </>
      )}
    </div>
  );
}
