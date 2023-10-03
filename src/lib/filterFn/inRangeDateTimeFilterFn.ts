import { FilterFn } from "@tanstack/react-table";
import { inRangeDateTime } from "@/lib/filter";
import { DateTime } from "luxon";

export const inRangeDateTimeFilterFn: FilterFn<any> = (row, columnId, values) => {
  const rowValue = row.getValue(columnId) as string;
  const rowValueMills = DateTime.fromISO(rowValue).toMillis();
  const min = values.min ? DateTime.fromISO(values.min).toMillis() : undefined;
  const max = values.max ? DateTime.fromISO(values.max).toMillis() : undefined;
  return inRangeDateTime(rowValueMills, min, max)
};
