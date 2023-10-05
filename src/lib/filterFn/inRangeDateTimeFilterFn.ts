import { FilterFn } from "@tanstack/react-table";
import { inRangeDateTime } from "@/lib/filter";
import { DateTime } from "luxon";

export const inRangeDateTimeFilterFn: FilterFn<any> = (row, columnId, values) => {
  const rowValue = row.getValue(columnId) as string;
  const rowValueMills = DateTime.fromISO(rowValue).toMillis();
  return values.every((value: any) => {
    const min = value.min ? DateTime.fromISO(value.min).toMillis() : undefined;
    const max = value.max ? DateTime.fromISO(value.max).toMillis() : undefined;
    return inRangeDateTime(rowValueMills, min, max)
  })
};
