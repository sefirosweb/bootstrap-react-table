import React, { InputHTMLAttributes, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

type CustomProps = {
  value?: string;
  onChange?: (value: string) => void;
  delayFilter: number;
}

type Props = CustomProps & Omit<React.ComponentProps<typeof Form.Control>, 'onChange' | 'value'>;

export const DebouncedInput: React.FC<Props> = (props) => {
  const { value, onChange, delayFilter, ...inputProps } = props;
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    if (typeof value !== 'string') return;
    if (value === currentValue) return;


    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (!onChange) return;
    if (value === currentValue) return;

    const timeout = setTimeout(() => {

      onChange(currentValue);
    }, delayFilter);

    return () => clearTimeout(timeout);
  }, [currentValue]);

  return (
    <Form.Control
      {...inputProps}
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
    />
  );
}
