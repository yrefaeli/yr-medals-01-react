import { useMemo } from "react";
import type { MedalTallyRow } from "./country-medal-tally-record";
import {
  MultiSortTable,
  type MstColumn,
} from "../../lib/ui/multi-sort-table/MultiSortTable";
import type { MedalTally } from "../../models/domain/country-medal-tally";
import { FlagImage } from "../../lib/ui/flag-image/FlagImage";

export const MedalTable = ({ medals }: { medals: MedalTally[] }) => {
  const medalRecords = useMemo(
    () =>
      medals?.map(
        (tally) =>
          ({
            ...tally,
            total: tally.gold + tally.silver + tally.bronze,
          } as MedalTallyRow)
      ) ?? [],
    [medals]
  );

  const columns: MstColumn<MedalTallyRow>[] = [
    {
      key: "code",
      header: <span></span>,
      renderCell: (row) => (
        <div className="min-w-4">
          <span className="px-4">
            <FlagImage code={row.code} />
          </span>
          <span className="text-[#7b7b7b] font-bold pr-2">{row.code}</span>
        </div>
      ),
    },
    {
      key: "gold",
      header: (
        <span className="inline-block w-5 h-5 rounded-full bg-yellow-400" />
      ),
      renderCell: (row) => (
        <span className="text-[#7b7b7b] block w-full text-center py-1">{row.gold}</span>
      ),
    },
    {
      key: "silver",
      header: (
        <span className="inline-block w-5 h-5 rounded-full bg-gray-400" />
      ),
      renderCell: (row) => (
        <span className="text-[#7b7b7b] block w-full text-center py-1">{row.silver}</span>
      ),
    },
    {
      key: "bronze",
      header: (
        <span
          className="inline-block w-5 h-5 rounded-full"
          style={{ backgroundColor: "#CD7F32" }}
        />
      ),
      renderCell: (row) => (
        <span className="text-[#7b7b7b] block w-full text-center py-1">{row.bronze}</span>
      ),
    },
    {
      key: "total",
      header: <span className="text-[#7b7b7b] text-lg font-normal block pb-1">TOTAL</span>,
      renderCell: (row) => (
        <span className="text-[#7b7b7b] font-bold block w-full text-center py-1">{row.total}</span>
      ),
    },
  ];

  return (
    <>
      <MultiSortTable
        columns={columns}
        data={medalRecords}
        initialSortKey="gold"
        sortPriorities={{
          total: ["gold"],
          gold: ["silver"],
          silver: ["gold"],
          bronze: ["gold"],
        }}
        showIndexColumn={true}
        indexColumnClassName="text-[#7b7b7b] block w-full text-right py-1"
      />
    </>
  );
};
