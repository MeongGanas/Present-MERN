import { useContext, useEffect } from "react";
import { LayoutContext } from "../../hooks/dialogContext";
import NotJoin from "../../ui/home/NotJoin";
import Card from "../../components/Card";
import { DataContext } from "../../hooks/dataContext";

export default function WholeAbsentee({ resource }) {
  const { setCreateActive, setJoinActive } = useContext(LayoutContext);
  const { setAbsentee } = useContext(DataContext);
  const absentee = resource.data.read().absentee;

  useEffect(() => {
    setAbsentee(absentee);
  }, [absentee]);

  return (
    <>
      {!absentee ||
        (absentee.length === 0 && (
          <NotJoin
            setCreateActive={setCreateActive}
            setJoinActive={setJoinActive}
          />
        ))}

      {absentee && (
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
