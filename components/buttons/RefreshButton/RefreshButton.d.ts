import { Button } from 'react-bootstrap';
import { default as React } from '../../../../node_modules/react';

interface CustomProps {
}
export type Props = CustomProps & React.ComponentProps<typeof Button>;
export declare const RefreshButton: React.FC<Props>;
export {};