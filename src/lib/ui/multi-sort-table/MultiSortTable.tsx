import React, { useState, useMemo } from "react";

type SortDirection = "asc" | "desc";

export interface MstColumn<T> {
  key: keyof T;
  header: React.ReactNode;
  renderCell?: (row: T) => React.ReactNode;
}

export interface MstProps<T> {
  /** The table’s row data */
  data: T[];

  /** Column definitions, in order */
  columns: MstColumn<T>[];

  /** Initial sort column (defaults to columns[0]) */
  initialSortKey?: keyof T;

  /** initial sort direction (defaults to 'asc') */
  initialSortDirection?: SortDirection;

  /**
   * Tie-breaker keys for each primary sort key
   * e.g. { 'total': ['gold', 'silver'], 'bronze': ['gold'] }
   */
  sortPriorities?: Partial<Record<keyof T, Array<keyof T>>>;

  /** Show row numbers as the first column */
  showIndexColumn?: boolean;

    /** Styles for index column */
  indexColumnClassName?: string;
}

export function MultiSortTable<T>({
  data,
  columns,
  initialSortKey,
  initialSortDirection = "asc",
  sortPriorities = {},
  showIndexColumn = false,
  indexColumnClassName = ""
}: MstProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T>(
    initialSortKey ?? columns[0].key
  );
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(initialSortDirection);

  const sortedData = useMemo(() => {
    const multiplier = sortDirection === "asc" ? 1 : -1;
    const keys: Array<keyof T> = [sortKey, ...(sortPriorities[sortKey] ?? [])];

    return [...data].sort((a, b) => {
      for (const key of keys) {
        const aVal = a[key];
        const bVal = b[key];
        if (aVal < bVal) return -1 * multiplier;
        if (aVal > bVal) return 1 * multiplier;
      }
      return 0;
    });
  }, [data, sortKey, sortDirection, sortPriorities]);

  function handleHeaderClick(key: keyof T) {
    if (key === sortKey) {
      setSortDirection((direction) => (direction === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  }

  return (
    <table className="table-auto w-full">
      <thead>
        <tr className="border-b-2 border-gray-500">
          {showIndexColumn && <th></th>}
          {columns.map((col) => (
            <th className={`cursor-pointer px-1 pt-1 border-gray-500 ${col.key === sortKey ? 'border-t-2': ''}`}
              key={String(col.key)}
              onClick={() => handleHeaderClick(col.key)}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-300">
        {sortedData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {showIndexColumn && <td className={indexColumnClassName}>{rowIndex + 1}</td>}
            {columns.map((col) => (
              <td key={String(col.key)}>
                {col.renderCell
                  ? col.renderCell(row as any)
                  : (row as any)[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
