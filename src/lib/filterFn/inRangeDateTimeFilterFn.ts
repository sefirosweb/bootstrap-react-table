import { FilterFn } from "@tanstack/react-table";
import { inRangeDateTime } from "@/lib/filter";

export const inRangeDateTimeFilterFn: FilterFn<any> = (row, columnId, values) => {
  const rowValue = row.getValue(columnId) as number | undefined;
  return inRangeDateTime(rowValue, values.min, values.max)
};
