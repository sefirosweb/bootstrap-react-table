import { FilterFn } from "@tanstack/react-table";
import { inRangeDateTime } from "@/lib/filter";
import { DateTime } from "luxon";

export const inRangeDateTimeFilterFn: FilterFn<any> = (row, columnId, values) => {
  const rowValue = row.getValue(columnId) as string;
  const rowValueMills = DateTime.fromISO(rowValue).toMillis();
  return values.every((value: any) => {
    const min = value[0] ? DateTime.fromISO(value[0]).toMillis() : undefined;
    const max = value[1] ? DateTime.fromISO(value[1]).toMillis() : undefined;
    return inRangeDateTime(rowValueMills, min, max)
  })
};
