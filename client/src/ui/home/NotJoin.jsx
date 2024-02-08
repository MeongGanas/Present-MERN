import { useState } from "react";
import shape from "../../img/shape.svg";
import Dialog from "../../components/Dialog";

export default function NotJoin() {
  const [joinActive, setJoinActive] = useState(false);
  const [createActive, setCreateActive] = useState(false);

  return (
    <div>
      <Dialog
        joinActive={joinActive}
        createActive={createActive}
        setCreateActive={setCreateActive}
        setJoinActive={setJoinActive}
      />

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
              onClick={() => setCreateActive(true)}
            >
              Create an absentee
            </button>
            <button
              className="button coloredButton text-sm"
              onClick={() => setJoinActive(true)}
            >
              Join an absentee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
