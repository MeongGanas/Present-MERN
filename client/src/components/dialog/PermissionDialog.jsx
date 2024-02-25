import { Close } from "@mui/icons-material";
import { useContext, useState } from "react";
import { LoadingContext } from "../../hooks/loadingContext";
import { DataContext } from "../../hooks/dataContext";
import { permissionUser } from "../../lib/absentee";

export default function PermissionDialog({
  active,
  setActive,
  absentId,
  shiftId,
  absentHour,
}) {
  const { setLoading } = useContext(LoadingContext);
  const { userData } = useContext(DataContext);
  const [title, setTitle] = useState("");
  const [description, setDiscription] = useState("");

  const handlePermission = async () => {
    setLoading(true);
    const data = {
      userId: userData._id,
      shiftId,
      username: userData.username,
      shift: absentHour.name,
      status: "Permission",
      detail: title,
      notes: description,
    };
    await permissionUser(absentId, data).then(() => setLoading(false));
  };

  return (
    <div
      className={`dialog ${
        active ? "scale-100" : "scale-0"
      } transition-all duration-200 overflow-hidden`}
    >
      <div className="w-full max-w-96 bg-white h-fit rounded-md overflow-hidden">
        <div className="flex p-3 items-center border-b-2 border-[#d9d9d9]">
          <button className="iconbutton" onClick={() => setActive(false)}>
            <Close />
          </button>
          <h1 className="font-bold ml-3">Permission</h1>
        </div>
        <div className="p-3 bg-[#f8f8f8] h-full">
          <div className="mb-5">
            <label htmlFor="title" className="block font-bold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="border-[1.5px] border-black p-3 w-full rounded-md"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-5">
            <label htmlFor="desc" className="block font-bold mb-2">
              Description
            </label>
            <textarea
              name="desc"
              id="desc"
              rows={10}
              className="w-full border-[1.5px] p-2 border-black rounded-md"
              onChange={(e) => setDiscription(e.target.value)}
            ></textarea>
          </div>

          <button
            className="text-center w-full py-3 bg-[#0E2A47] rounded-md text-white font-bold"
            onClick={handlePermission}
          >
            Check-In
          </button>
        </div>
      </div>
    </div>
  );
}
