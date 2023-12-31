import { FilterFn } from "@tanstack/react-table";
import { matchString } from "@/lib/filter";

export const textFilterFn: FilterFn<any> = (row, columnId, values) => {
  const text = row.getValue(columnId) as string | number | null;
  return values.every((value: string) => matchString(text, value))
};
