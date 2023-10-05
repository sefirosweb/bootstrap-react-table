import { FilterFn } from "@tanstack/react-table";
import { inRangeDate } from "@/lib/filter";
import { DateTime } from "luxon";

export const inRangeDateFilterFn: FilterFn<any> = (row, columnId, values) => {
  const rowValue = row.getValue(columnId) as string;
  const rowValueMills = DateTime.fromISO(rowValue).toMillis();
  return values.every((value: any) => {
    const min = value.min ? DateTime.fromISO(value.min).toMillis() : undefined;
    const max = value.max ? DateTime.fromISO(value.max).toMillis() : undefined;
    return inRangeDate(rowValueMills, min, max)
  })
};
