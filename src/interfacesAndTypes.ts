
type resultDB = {
  columns: number[];
  data: (boolean | string | number) [][];
  index: string[];
};

export type Result = Record<string, resultDB | null>
