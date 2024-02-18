import { Menu } from "@mui/icons-material";
import Loading from "../Loading";

export default function Skeleton() {
  return (
    <div className="animate-pulse">
      <nav className="fixed z-50 bg-gray-100 flex justify-between items-center border-b px-5 md:px-10 py-3 top-0 left-0 w-full">
        <div className="flex items-center gap-5 md:gap-10">
          <div>
            <Menu />
          </div>
          <div className="h-2.5 bg-gray-200 rounded-full w-48"></div>
        </div>
        <div className="flex items-center gap-5">
          <button className="bg-gray-200 w-8 h-8 rounded-full"></button>
          <button className="bg-gray-200 w-8 h-8 rounded-full"></button>
        </div>
      </nav>

      <div className="bg-gray-100 z-10 fixed left-0 top-0 min-w-56 -translate-x-full h-screen pt-20 border-r-2 border-gray-200 lg:translate-x-0 transition-all duration-300 p-5">
        <div className="h-2 bg-gray-200 rounded-full max-w-56 mb-5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-40 mb-5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-56 mb-5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-32 mb-5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-56 mb-5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-28 mb-10"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-56 mb-5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-40 mb-5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-56 mb-5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-32 mb-5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-56 mb-5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-28 mb-5"></div>
      </div>

      <main className="pl-0 lg:pl-52 transition-all duration-300 w-full min-h-screen bg-[#f8f8f9]">
        <Loading />
      </main>
    </div>
  );
}
