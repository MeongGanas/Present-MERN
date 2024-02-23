import { useContext, useState } from "react";
import { createAbsentee, joinAbsentee } from "../../lib/actions";
import { LoadingContext } from "../../hooks/loadingContext";
import swal from "sweetalert2";
import { DataContext } from "../../hooks/dataContext";

function DialogFormat({
  handleClose,
  title,
  label1,
  label2,
  labelButton,
  handleAction,
}) {
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  return (
    <div className={`dialog-content`}>
      <h1 className="text-lg font-bold mb-5">{title}</h1>
      <form>
        <div>
          <label htmlFor={label1} className="text-[#404040] font-semibold">
            {label1}
          </label>
          <input
            type="text"
            name={label1}
            id={label1}
            className="mb-5 mt-1 input"
            onChange={(e) => setData1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor={label2} className="text-[#404040] font-semibold">
            {label2}
          </label>
          <input
            type="text"
            name={label2}
            id={label2}
            className="mb-5 mt-1 input"
            onChange={(e) => setData2(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-5">
          <button type="button" onClick={handleClose}>
            Cancel
          </button>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleAction(data1, data2);
            }}
          >
            {labelButton}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Dialog({
  joinActive,
  createActive,
  setJoinActive,
  setCreateActive,
}) {
  const { setLoading } = useContext(LoadingContext);
  const { userData } = useContext(DataContext);

  const create = async (absentName, ownerName) => {
    setLoading(true);
    try {
      await createAbsentee(
        absentName,
        ownerName,
        userData._id,
        userData.username
      ).then((response) => {
        setLoading(false);
        setCreateActive(false);
      });
    } catch (err) {
      setLoading(false);
      swal.fire({
        title: "Create Absentee Fail!",
        text: err.response?.data?.mssg || "An error occurred during login",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  const join = async (absentCode, displayName) => {
    setLoading(true);
    try {
      await joinAbsentee(
        absentCode,
        displayName,
        userData._id,
        userData.username
      ).then((response) => {
        if (!response.absentee) {
          swal.fire({
            title: "Failed Join!",
            text: "There are no such absentee!",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
        setLoading(false);
        setJoinActive(false);
      });
    } catch (err) {
      setLoading(false);
      swal.fire({
        title: "Join Absentee Fail!",
        text: err.response?.data?.mssg || "An error occurred during login",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  return (
    <>
      <div
        className={`dialog ${
          joinActive ? "scale-100" : "scale-0"
        } transition-all duration-200`}
      >
        <DialogFormat
          title={"Join an absentee"}
          handleClose={() => setJoinActive(false)}
          label1={"List Code"}
          label2={"Display Name (optional)"}
          labelButton={"Join"}
          handleAction={join}
        />
      </div>

      <div
        className={`dialog ${
          createActive ? "scale-100" : "scale-0"
        } transition-all duration-200`}
      >
        <DialogFormat
          title={"Create an absentee"}
          handleClose={() => setCreateActive(false)}
          label1={"Absent name"}
          label2={"Owner Name (optional)"}
          labelButton={"Create"}
          handleAction={create}
        />
      </div>
    </>
  );
}
