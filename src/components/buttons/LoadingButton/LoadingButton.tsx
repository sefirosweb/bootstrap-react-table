import React from 'react';
import { Button } from 'react-bootstrap';
import { LoadingSpinner } from './../../icons/LoadingSpinner';

export type Props = React.ComponentProps<typeof Button>;

export const LoadingButton: React.FC<Props> = (props) => {
  return (
    <Button className='d-flex justify-content-center align-items-center' size='sm' variant="primary" disabled {...props}>
      <LoadingSpinner />
    </Button>
  );
};
