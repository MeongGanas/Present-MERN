export default function Dialog({
  handleClose,
  title,
  label1,
  label2,
  labelButton,
}) {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center">
      <div className="min-w-80 max-w-96 md:w-1/2 p-5 rounded-md bg-white">
        <h1 className="text-lg font-bold mb-5">{title}</h1>
        <div>
          <label htmlFor={label1} className="text-[#404040] font-semibold">
            {label1}
          </label>
          <input type="text" name={label1} id={label1} className="mb-5 mt-1" />
        </div>
        <div>
          <label htmlFor={label2} className="text-[#404040] font-semibold">
            {label2}
          </label>
          <input type="text" name={label2} id={label2} className="mb-5 mt-1" />
        </div>
        <div className="flex justify-end gap-5">
          <button onClick={handleClose}>Cancel</button>
          <button>{labelButton}</button>
        </div>
      </div>
    </div>
  );
}
