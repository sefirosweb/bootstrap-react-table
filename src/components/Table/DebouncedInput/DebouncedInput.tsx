import { InputHTMLAttributes, useEffect, useState } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  delayFilter?: number;
}

export const DebouncedInput = (props: Props) => {
  const { value, onChange, delayFilter = 230 } = props;
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    if (typeof value !== 'string') return;
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (!onChange) return;
    const timeout = setTimeout(() => {
      onChange(currentValue);
    }, delayFilter);

    return () => clearTimeout(timeout);
  }, [currentValue]);

  return (
    <input
      {...props}
      value={currentValue}
      onChange={(e) => setCurrentValue(e.target.value)}
    />
  );
}
