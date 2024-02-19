export default function attendanceItem() {
  return (
    <>
      <li className="even:bg-[#F1F1F1] odd:bg-white">
        <div className="flex justify-between p-5">
          <div className="flex gap-5">
            <div className="circle"></div>
            <h1 className="font-bold text-sm md:text-base">
              Farrel Giovanni Jaohari
            </h1>
          </div>
          <h3 className="font-bold text-sm md:text-base">
            Present <span className="text-red-700">(Late)</span>
          </h3>
        </div>
      </li>
      <li className="even:bg-[#F1F1F1] odd:bg-white">
        <div className="flex justify-between p-5">
          <div className="flex gap-5">
            <div className="circle"></div>
            <h1 className="font-bold text-sm md:text-base">
              Farrel Giovanni Jaohari
            </h1>
          </div>
          <h3 className="font-bold text-sm md:text-base">Absent</h3>
        </div>
      </li>
    </>
  );
}
