import React, { InputHTMLAttributes, useEffect, useState } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value?: string;
  onChange?: (value: string) => void;
  delayFilter: number;
}

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
    <input
      {...inputProps}
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
    />
  );
}
