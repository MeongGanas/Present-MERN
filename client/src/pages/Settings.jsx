import { useContext, useEffect, useState } from "react";
import { DriveFileRenameOutline, Logout } from "@mui/icons-material";
import { logoutUser, updateUser } from "../lib/actions";
import { DataContext } from "../hooks/dataContext";
import { LoadingContext } from "../hooks/loadingContext";
import swal from "sweetalert2";

export default function Settings() {
  const { userData, setUserData } = useContext(DataContext);
  const { setLoading } = useContext(LoadingContext);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhoto, setEditPhoto] = useState(false);
  const [editPassword, setEditPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  const [imgPreview, setImgPreview] = useState(null);

  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (userData) {
      setUsername(userData.username);
      setEmail(userData.email);
    }
  }, [userData]);

  const convertBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await convertBase64(file);
      setImgPreview(URL.createObjectURL(file));
      setPhoto(base64);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    await updateUser({
      userId: userData._id,
      username,
      email,
      photo,
      prevPassword,
      newPassword,
    })
      .then((response) => {
        localStorage.removeItem("userData");
        localStorage.setItem("userData", JSON.stringify(response));
        setUserData(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        swal.fire({
          title: "Update User Fail!",
          text: err.response?.data?.mssg || "File size too big!",
          icon: "error",
          confirmButtonText: "Close",
        });
      });
  };

  return (
    <>
      {userData && (
        <div className="p-5">
          <div className="border-2 mx-auto border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 p-5 rounded-md max-w-screen-sm">
            <h1 className="text-xl sm:text-2xl font-bold">Profile</h1>
            <div className="flex items-center gap-5 my-5">
              <div className="border-2 w-11 h-11 border-black rounded-full flex items-center justify-center">
                {userData.profile && (
                  <img
                    src={userData.profile}
                    className="w-11 h-10 rounded-full"
                  />
                )}
                {!userData.profile && (
                  <h1 className="uppercase font-bold">
                    {userData.username[0]}
                  </h1>
                )}
              </div>
              <button className="flex gap-2" onClick={() => setEditPhoto(true)}>
                <span className="font-bold">Change</span>
                <DriveFileRenameOutline />
              </button>
            </div>
            <div className={`mt-3 mb-5 ${editPhoto ? "block" : "hidden"}`}>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  {imgPreview && (
                    <img src={imgPreview} alt="Image Preview" width={200} />
                  )}
                  {!imgPreview && (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-5000">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-5000">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept=".png,.jpg,.jpeg"
                    onChange={(e) => handleUpload(e)}
                  />
                </label>
              </div>
            </div>
            <div className="mb-5">
              <div className="flex justify-between items-center gap-2">
                <h1 className="font-bold">Name</h1>
                <button
                  className="flex gap-2"
                  onClick={() => setEditName(true)}
                >
                  <span className="font-bold">Change</span>
                  <DriveFileRenameOutline />
                </button>
              </div>
              <div className="mt-1">
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
                  className={`input ${editName ? "block" : "hidden"} max-w-sm`}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="flex justify-between items-center gap-2">
                <h1 className="font-bold">Email</h1>
                <button
                  className="flex gap-2"
                  onClick={() => setEditEmail(true)}
                >
                  <span className="font-bold">Change</span>
                  <DriveFileRenameOutline />
                </button>
              </div>
              <div className="mt-1">
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
                  className={`input ${editEmail ? "block" : "hidden"} max-w-sm`}
                />
              </div>
            </div>
            <div className="mb-5">
              <div className="flex justify-between">
                <h1 className="font-bold">Password</h1>
                <button
                  className="flex gap-2"
                  onClick={() => setEditPassword(true)}
                >
                  <span className="underline">Change Password</span>
                </button>
              </div>

              <input
                type="password"
                placeholder="Enter your previous password"
                onChange={(e) => setPrevPassword(e.target.value)}
                className={`input ${
                  editPassword ? "block" : "hidden"
                } max-w-sm mt-2`}
              />
              <input
                type="text"
                placeholder="Enter your new password"
                onChange={(e) => setNewPassword(e.target.value)}
                className={`input ${
                  editPassword ? "block" : "hidden"
                } max-w-sm mt-2`}
              />
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
              <button
                className="coloredButton py-2 px-7 rounded-md max-w-32"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
          <div className="border-2 mx-auto mt-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 p-5 rounded-md max-w-screen-sm flex justify-end">
            <button
              className="bg-red-600 text-white py-2 px-7 rounded-md"
              onClick={() => logoutUser(setUserData)}
            >
              <Logout className="mr-2" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
