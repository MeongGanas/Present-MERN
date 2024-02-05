export default function Dialog() {
  return (
    <div className="min-w-80 max-w-96 md:w-1/2 p-5 rounded-md bg-white">
      <h1 className="text-lg font-bold mb-5">Join an Absentee</h1>
      <div>
        <label htmlFor="code">List Code</label>
        <input
          type="text"
          name="code"
          id="code"
          className="mb-5"
          placeholder="abcdef"
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="mb-5"
          placeholder="example@gmail.com"
        />
      </div>
      <div className="flex justify-end gap-5">
        <button>Cancel</button>
        <button>Join</button>
      </div>
    </div>
  );
}
