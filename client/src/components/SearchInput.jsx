import { Search } from "@mui/icons-material";

export default function SearchInput() {
  return (
    <form className="relative max-w-60 min-w-52">
      <Search className="absolute left-3 top-2.5" />
      <input
        type="text"
        className="h-full w-full border-2 border-black px-5 pl-10 py-2 rounded-[9px]"
        placeholder="Search Name"
      />
    </form>
  );
}
