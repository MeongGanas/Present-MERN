import { useContext, useEffect, useState } from "react";
import { DriveFileRenameOutline, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../hooks/dataContext";
import { leaveAbsentee } from "../../lib/actions";
import { LoadingContext } from "../../hooks/loadingContext";
import { editAsParticipant } from "../../lib/absentee";

export function SettingsUser({ absent }) {
  const navigate = useNavigate();
  const { userData } = useContext(DataContext);
  const { setLoading } = useContext(LoadingContext);
  const [data, setData] = useState(null);

  const [editName, setEditName] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState("");

  useEffect(() => {
    const user = absent.usersJoin.filter(
      (user) => user.userId === userData._id
    )[0];
    setData(user);
  });

  useEffect(() => {
    if (data) {
      setNewDisplayName(data.username);
    }
  }, [data]);

  const leave = async () => {
    setLoading(true);

    await leaveAbsentee(absent._id, data.userId).then(() => {
      navigate("/home");
      setLoading(false);
      window.location.reload();
    });
  };

  const editParticipant = async () => {
    setLoading(true);
    await editAsParticipant(absent._id, data.userId, newDisplayName).then(() =>
      setLoading(false)
    );
  };

  return (
    <>
      {data && (
        <div>
          <div className="px-2 sm:p-5">
            <div className="border-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm">
              <h1 className="text-xl sm:text-2xl font-bold mb-5">
                Class Detail
              </h1>
              <div className="mb-5">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold">Display Name</h1>
                  <button
                    className="flex gap-2"
                    onClick={() => setEditName(true)}
                  >
                    <span className="font-bold">Change</span>
                    <DriveFileRenameOutline />
                  </button>
                </div>
                <h1
                  className={`text-sm sm:text-base mt-1 ${
                    editName ? "hidden" : "block"
                  }`}
                >
                  {data.username}
                </h1>
                <input
                  type="text"
                  value={newDisplayName}
                  onChange={(e) => setNewDisplayName(e.target.value)}
                  className={`input ${
                    editName ? "block" : "hidden"
                  } max-w-sm mt-2`}
                />
              </div>

              <div className="flex justify-end gap-5">
                <button
                  className="p-2 border-2 border-[#d9d9d9] rounded-md"
                  onClick={() => {
                    setEditName(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="coloredButton py-2 px-7 rounded-md max-w-32"
                  onClick={editParticipant}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="pt-5 px-2 sm:p-5">
            <div className="border-2 border-[#c4c4c4] bg-white min-w-80 w-full md:w-2/3 mx-auto p-5 rounded-md max-w-screen-sm flex justify-end">
              <button
                className="bg-red-600 text-white py-2 px-7 rounded-md"
                onClick={leave}
              >
                <Logout className="mr-2" />
                <span>Leave</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
