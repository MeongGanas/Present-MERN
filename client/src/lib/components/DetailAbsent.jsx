import AbsenteeDetail from "../../components/AbsenteeDetail";

export default function DetailAbsent({ resource }) {
  const absentData = resource.data.read().absentee;

  return (
    <>
      <AbsenteeDetail absent={absentData} />
    </>
  );
}
