import { FilterFn } from '@tanstack/react-table';
import { FieldType } from '../../index';

export declare const filterFn: (fieldType?: FieldType) => FilterFn<any>;
export * from './globalFilterFn';
