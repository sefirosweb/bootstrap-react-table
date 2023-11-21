import { FieldType } from "@/index";
import { inRangeDateFilterFn } from "./inRangeDateFilterFn";
import { FilterFn } from "@tanstack/react-table";
import { textFilterFn } from "./textFilterFn";
import { inRangeNumberFilterFn } from "./inRangeNumberFilterFn";
import { inRangeDateTimeFilterFn } from "./inRangeDateTimeFilterFn";

export const filterFn = (fieldType?: FieldType): FilterFn<any> => {
    if (fieldType === 'number') return inRangeNumberFilterFn;
    if (fieldType === 'date') return inRangeDateFilterFn;
    if (fieldType === 'datetime') return inRangeDateTimeFilterFn;
    return textFilterFn;
}

export * from './globalFilterFn'