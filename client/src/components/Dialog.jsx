function DialogFormat({ handleClose, title, label1, label2, labelButton }) {
  return (
    <div className={`dialog-content`}>
      <h1 className="text-lg font-bold mb-5">{title}</h1>
      <div>
        <label htmlFor={label1} className="text-[#404040] font-semibold">
          {label1}
        </label>
        <input
          type="text"
          name={label1}
          id={label1}
          className="mb-5 mt-1 input"
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
        />
      </div>
      <div className="flex justify-end gap-5">
        <button onClick={handleClose}>Cancel</button>
        <button>{labelButton}</button>
      </div>
    </div>
  );
}

export default function Dialog({
  joinActive,
  createActive,
  setJoinActive,
  setCreateActive,
}) {
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
        />
      </div>
    </>
  );
}
