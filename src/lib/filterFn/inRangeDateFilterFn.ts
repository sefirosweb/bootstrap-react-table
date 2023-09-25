import { FilterFn } from "@tanstack/react-table";
import { inRangeDate } from "@/lib/filter";

export const inRangeDateFilterFn: FilterFn<any> = (row, columnId, values) => {
  const rowValue = row.getValue(columnId) as number;
  return inRangeDate(rowValue, values.min, values.max)
};
