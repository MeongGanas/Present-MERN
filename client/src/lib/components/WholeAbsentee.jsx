import { useContext } from "react";
import { LayoutContext } from "../../hooks/dialogContext";
import NotJoin from "../../ui/home/NotJoin";
import Card from "../../components/Card";

export default function WholeAbsentee({ resource }) {
  const { setCreateActive, setJoinActive } = useContext(LayoutContext);
  const absentee = resource.data.read().absentee;

  return (
    <>
      {absentee.length === 0 && (
        <NotJoin
          setCreateActive={setCreateActive}
          setJoinActive={setJoinActive}
        />
      )}

      {absentee.length > 0 && (
        <div className="flex p-5 justify-center">
          <div className="grid grid-cols-1 max-w-screen-lg md:grid-cols-2 xl:grid-cols-3 gap-5">
            {absentee &&
              absentee.map((absent) => (
                <Card absent={absent} key={absent._id} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
