import { useContext, useEffect, useState } from "react";
import { DriveFileRenameOutline } from "@mui/icons-material";
import background from "../../img/Mask group.png";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../hooks/loadingContext";
import { disbandAbsentee, editAsOwner } from "../../lib/absentee";

export function SettingsAdmin({ absent }) {
  const navigate = useNavigate();
  const [editAbsentName, setEditAbsentName] = useState(false);
  const [editOwnerName, seteditOwnerName] = useState(false);
  const { setLoading } = useContext(LoadingContext);

  const [newAbsentName, setNewAbsentName] = useState("");
  const [newOwnerName, setNewOwnerName] = useState("");

  useEffect(() => {
    setNewAbsentName(absent.name);
    setNewOwnerName(absent.ownerName);
  }, [absent]);

  const editOwner = async () => {
    setLoading(true);
    await editAsOwner(absent._id, { newAbsentName, newOwnerName }).then(() => {
      setLoading(false);
      navigate(`/detailAbsent/${absent._id}/${newAbsentName}`);
    });
  };

  const disband = async () => {
    setLoading(true);
    await disbandAbsentee(absent._id).then(() => {
      navigate("/home");
      setLoading(false);
    });
  };

  return (
    <div className="px-2">
      <div className="border-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">Class Detail</h1>
        <div className="mb-5">
          <div className="flex justify-between items-center">
            <h1 className="font-bold">Name</h1>
            <button
              className="flex gap-2"
              onClick={() => setEditAbsentName(true)}
            >
              <span className="font-bold">Change</span>
              <DriveFileRenameOutline />
            </button>
          </div>
          <h1
            className={`text-sm sm:text-base mt-1 ${
              editAbsentName ? "hidden" : "block"
            }`}
          >
            {absent.name}
          </h1>
          <input
            type="text"
            value={newAbsentName}
            onChange={(e) => setNewAbsentName(e.target.value)}
            className={`input ${
              editAbsentName ? "block" : "hidden"
            } max-w-sm mt-2`}
          />
        </div>
        <div className="mb-5">
          <div className="flex justify-between items-center">
            <h1 className="font-bold">Owner Name</h1>
            <button
              className="flex gap-2"
              onClick={() => seteditOwnerName(true)}
            >
              <span className="font-bold">Change</span>
              <DriveFileRenameOutline />
            </button>
          </div>
          <h1
            className={`text-sm sm:text-base mt-1 ${
              editOwnerName ? "hidden" : "block"
            }`}
          >
            {absent.ownerName}
          </h1>
          <input
            type="text"
            value={newOwnerName}
            onChange={(e) => setNewOwnerName(e.target.value)}
            className={`input ${
              editOwnerName ? "block" : "hidden"
            } max-w-sm mt-2`}
          />
        </div>

        <div className="flex justify-end gap-5">
          <button
            className="p-2 border-2 border-[#d9d9d9] rounded-md"
            onClick={() => {
              setEditAbsentName(false);
              seteditOwnerName(false);
            }}
          >
            Cancel
          </button>
          <button
            className="coloredButton py-2 px-7 rounded-md max-w-32"
            onClick={editOwner}
          >
            Save
          </button>
        </div>
      </div>

      <div className="border-2 mt-5 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm">
        <h1 className="text-xl sm:text-2xl font-bold mb-5">
          Customize Apperance
        </h1>
        <div className="mb-5">
          <img src={background} alt="" className="max-h-64 w-full rounded-md" />
        </div>
        <div className="mb-5">
          <h1 className="text-lg font-bold mb-5">Select Theme</h1>
          <div className="flex gap-5 flex-wrap">
            <button>
              <div className="w-20 h-20 rounded-full bg-[#0E2A47]"></div>
            </button>
            <button>
              <div className="w-20 h-20 rounded-full bg-[#C62E2E]"></div>
            </button>
            <button>
              <div className="w-20 h-20 rounded-full bg-[#3EBA4E]"></div>
            </button>
            <button>
              <div className="w-20 h-20 rounded-full bg-[#404040]"></div>
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-5">
          <button className="coloredButton py-2 px-7 rounded-md max-w-32">
            Save
          </button>
        </div>
      </div>

      <div className="border-2 mt-5 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm">
        <div className="flex justify-end gap-5">
          <button
            className="bg-red-600 text-white py-2 px-7 rounded-md"
            onClick={disband}
          >
            <span>Disband</span>
          </button>
        </div>
      </div>
    </div>
  );
}
