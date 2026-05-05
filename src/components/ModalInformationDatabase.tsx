import { useEffect, useMemo, useState } from "react";
import { Result } from "../interfacesAndTypes";

type SplitTable = {
  columns: unknown[];
  data: unknown[][];
  index: unknown[];
};

type ModalInformationDatabaseProps = {
  result: Result;
  selectedDatabase: any;
};

function normalizeSplit(obj: unknown): SplitTable | null {
  if (!obj || typeof obj !== "object") return null;
  const o = obj as Record<string, unknown>;
  if (o.is_multiindex && o.data && typeof o.data === "object")
    return normalizeSplit(o.data);
  if (
    Array.isArray(o.data) &&
    Array.isArray(o.columns) &&
    Array.isArray(o.index)
  ) {
    return o as unknown as SplitTable;
  }
  return null;
}

function ModalInformationDatabase(props: ModalInformationDatabaseProps) {
  const { result, selectedDatabase } = props;

  const infoAboutDB = result["data"][selectedDatabase];

  const subTables = useMemo(() => {
    if (!infoAboutDB) return [];
    if (Array.isArray(infoAboutDB)) {
      return infoAboutDB.map(normalizeSplit).filter(Boolean) as SplitTable[];
    }
    const single = normalizeSplit(infoAboutDB);
    return single ? [single] : [];
  }, [infoAboutDB]);

  const [selectedSubTableIdx, setSelectedSubTableIdx] = useState(0);

  useEffect(() => {
    setSelectedSubTableIdx(0);
  }, [selectedDatabase]);

  const activeTable =
    subTables[selectedSubTableIdx] ??
    ({ columns: [], data: [], index: [] } satisfies SplitTable);

  const cols = activeTable.columns.map(String);
  const hasTable =
    cols.length > 0 && activeTable.index.length > 0 && activeTable.data.length > 0;

  return (
    <>
      <div className="flex justify-between bg-white p-2 rounded-t-md flex-none">
        <div>
          <span className="text-green-800 text-sm md:text-base font-semibold">
            {selectedDatabase}
          </span>
        </div>
      </div>

      {/* Scroll verticale + orizzontale solo qui (barra orizzontale in basso quando serve) */}
      <div className="bg-white flex-1 min-h-0 rounded-b-md overflow-auto p-2 flex flex-col">
        {subTables.length > 1 && (
          <div className="flex flex-row flex-wrap gap-2 mb-3 flex-none">
            {subTables.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedSubTableIdx(idx)}
                className={`text-xs md:text-sm rounded px-2 py-1 border shadow-sm transition-all ${
                  idx === selectedSubTableIdx
                    ? "bg-green-50 border-green-300 text-green-800"
                    : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                {`${selectedDatabase}_${idx}`}
              </button>
            ))}
          </div>
        )}

        {selectedDatabase && hasTable ? (
          <div className="min-w-max">
            <table className="border-collapse text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th
                    scope="col"
                    className="sticky left-0 z-[2] bg-white py-2 pr-4 pl-1 font-semibold text-green-900 align-bottom whitespace-normal max-w-[14rem]"
                  >
                    Field
                  </th>
                  {cols.map((c, j) => (
                    <th
                      key={j}
                      scope="col"
                      className="py-2 px-2 font-semibold text-neutral-700 align-bottom whitespace-nowrap border-l border-neutral-100"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activeTable.index.map((rowLabel, i) => (
                  <tr
                    key={i}
                    className="border-b border-neutral-100 align-top hover:bg-neutral-50/80"
                  >
                    <th
                      scope="row"
                      className="sticky left-0 z-[1] bg-white py-2 pr-4 pl-1 text-green-900 font-normal text-left whitespace-normal align-top max-w-[14rem] break-words shadow-[2px_0_4px_-2px_rgba(0,0,0,0.06)] border-r border-neutral-100"
                    >
                      {String(rowLabel ?? "")}
                    </th>
                    {(activeTable.data[i] ?? []).map((cell, j) => (
                      <td
                        key={j}
                        className={`px-2 py-2 align-top border-l border-neutral-100 whitespace-pre-wrap max-w-[20rem] break-words ${
                          cell === "Positive" ||
                          String(cell ?? "").includes("Positive")
                            ? "text-red-500"
                            : "text-neutral-700"
                        }`}
                      >
                        {String(cell ?? "")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : selectedDatabase ? (
          <div className="text-neutral-500 text-sm">No table data available.</div>
        ) : null}
      </div>
    </>
  );
}

export default ModalInformationDatabase;
