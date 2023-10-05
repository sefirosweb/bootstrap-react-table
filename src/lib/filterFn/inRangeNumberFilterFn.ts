import { FilterFn } from "@tanstack/react-table";
import { inRangeNumber } from "@/lib/filter";

export const inRangeNumberFilterFn: FilterFn<any> = (row, columnId, values) => {
  const rowValue = row.getValue(columnId) as number;
  return values.every((value: any) => inRangeNumber(rowValue, value.min, value.max))
};
