import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
interface CustomProps {
}

export type Props = CustomProps & React.ComponentProps<typeof Button>;

export const DeleteButton: React.FC<Props> = (props) => {
  const { children, variant = "danger" } = props;
  return (
    <Button className='d-flex justify-content-center align-items-center p-2' size='sm' {...props} variant={variant}>
      {children} <FaTrash />
    </Button>
  );
};
