import { FilterFn } from "@tanstack/react-table";
import { inRangeDate } from "@/lib/filter";
import { DateTime } from "luxon";

export const inRangeDateFilterFn: FilterFn<any> = (row, columnId, values) => {
  const rowValue = row.getValue(columnId) as string;
  const rowValueMills = DateTime.fromISO(rowValue).toMillis();
  const min = values.min ? DateTime.fromISO(values.min).toMillis() : undefined;
  const max = values.max ? DateTime.fromISO(values.max).toMillis() : undefined;
  return inRangeDate(rowValueMills, min, max)
};
