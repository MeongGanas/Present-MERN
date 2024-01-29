import { useEffect, useState } from "react";

export function ListHomeAsUser() {
  const [waktu, setWaktu] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setWaktu(new Date());
    }, 1000);
  });

  return (
    <div className="p-5 listDetail text-white rounded-md">
      <h1 className="text-3xl">List 1</h1>

      <div className="py-10 text-center">
        <h1 className="mb-2 text-5xl font-bold">
          {waktu.getHours()}:{waktu.getMinutes()}
        </h1>
        <p>Fri, 18 sep 2023</p>
      </div>

      <div className="text-black bg-white rounded-md">
        <div className="text-center border-b-2 py-5">
          <h4 className="font-bold">Shift 1</h4>
          <h1 className="text-3xl font-bold my-4">08:30 - 10:00</h1>
          <p>Toleransi</p>
        </div>
        <div className="flex px-5 sm:px-10 justify-center gap-5 pt-5">
          <button className="button bg-[#0E2A47] max-w-72 text-white">
            Check-In
          </button>
          <button className="button max-w-72">Permission</button>
        </div>
      </div>
    </div>
  );
}
