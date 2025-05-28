import { MedalTable } from "../features/medals/MedalTable";
import type { MedalTally } from "../models/domain/country-medal-tally";

export const MedalsPage = ({ medals }: { medals: MedalTally[] }) => {
  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-3xl font-thin text-[#7b7b7b] ml-4">MEDAL COUNT</h1>
      <div className="p-4"><MedalTable medals={medals} /></div>
    </div>
  );
};
