import { HTMLProps, useEffect, useRef } from 'react';

interface Props extends HTMLProps<HTMLInputElement> {
  indeterminate?: boolean;
}

export const IndeterminateCheckbox = (props: Props) => {
  const { indeterminate, ...rest } = props;
  const checkboxRef = useRef<HTMLInputElement>(null!);
  const { checked } = rest;

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      checkboxRef.current.indeterminate = !checked && indeterminate;
    }
  }, [checkboxRef, indeterminate, checked]);

  return <input type="checkbox" ref={checkboxRef} {...rest} />;
};
