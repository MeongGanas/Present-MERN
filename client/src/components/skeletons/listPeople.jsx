export default function ListPeopleSkeleton({ users, owner, admin }) {
  return (
    <div className="bg-white mt-5 rounded-md border p-5">
      <div className="mb-5" id="admin-list">
        <h1 className="mb-5 border-b border-b-gray-300 py-2 text-xl font-bold">
          Admin
        </h1>
        <div className="flex gap-5 items-center">
          <div className="circle p-1 flex justify-center items-center animate-pulse bg-gray-500"></div>
          <h1 className="text-lg">{owner}</h1>
        </div>
      </div>

      <div id="participants-list">
        <div className="flex justify-between border-b border-b-gray-300 py-2">
          <h1 className="text-xl font-bold">Peserta</h1>
          <h1 className="font-bold">{users.length} People</h1>
        </div>
        <ul>
          {users &&
            users.map((participant) => (
              <li className="people" key={participant.userId}>
                <div className="flex justify-between items-center">
                  <div className="flex gap-5 items-center">
                    <div className="circle p-1 flex items-center justify-center animate-pulse bg-gray-500"></div>
                    <h1 className="text-lg">{participant.username}</h1>
                  </div>
                  {admin && (
                    <button
                      className="text-red-700 animate-pulse cursor-not-allowed"
                      disabled
                      value={participant.userId}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
