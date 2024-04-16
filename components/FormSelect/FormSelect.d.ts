import { SelectOption } from '../../index';
import { Form } from 'react-bootstrap';
import { UseQueryOptions } from '@tanstack/react-query';
import { default as React } from '../../../node_modules/react';

export type Props = Omit<React.ComponentProps<typeof Form.Select>, 'value' | 'onChange'> & {
    useQueryOptions?: UseQueryOptions<Array<SelectOption>>;
    value?: string;
    setValue: (value?: string) => void;
};
export declare const FormSelect: React.FC<Props>;
