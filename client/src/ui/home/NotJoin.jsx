import { useState } from "react";
import shape from "../../img/shape.svg";
import Dialog from "../../components/Dialog";

export default function NotJoin() {
  const [joinActive, setJoinActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);

  return (
    <div>
      {joinActive && (
        <Dialog
          title={"Join an absentee"}
          handleClose={() => setJoinActive(false)}
          label1={"List Code"}
          label2={"Display Name (optional)"}
          labelButton={"Join"}
        />
      )}

      {createActive && (
        <Dialog
          title={"Create an absentee"}
          handleClose={() => setCreateActive(false)}
          label1={"Absent name"}
          label2={"Owner Name (optional)"}
          labelButton={"Create"}
        />
      )}

      <div className="h-screen -mt-16 flex justify-center items-center">
        <div className="w-full min-w-80 max-w-md md:w-1/2">
          <div className="flex justify-center mb-5">
            <img src={shape} alt="" className="w-1/2" />
          </div>
          <h4 className="font-bold mb-5 text-center text-sm sm:text-base">
            Feels kind of empty here, let’s change that
          </h4>
          <div className="flex gap-5 px-2">
            <button
              className="button coloredButton text-sm"
              onClick={() => setJoinActive(true)}
            >
              Create an absentee
            </button>
            <button
              className="button coloredButton text-sm"
              onClick={() => setCreateActive(true)}
            >
              Join an absentee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
