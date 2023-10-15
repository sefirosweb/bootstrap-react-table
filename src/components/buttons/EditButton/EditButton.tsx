import React from 'react';
import { FaPen } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
interface CustomProps {
}

export type Props = CustomProps & React.ComponentProps<typeof Button>;

export const EditButton: React.FC<Props> = (props) => {
  const { children, variant = 'secondary' } = props;
  return (
    <Button className='d-flex justify-content-center align-items-center p-2' size='sm' variant={variant} {...props} >
      {children} <FaPen />
    </Button>
  );
};
