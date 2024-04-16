import { Modal as BModal, ButtonProps } from 'react-bootstrap';
import { default as React } from '../../../node_modules/react';

type CustomProps = {
    body: JSX.Element | string;
    title?: JSX.Element | string;
    accept?: JSX.Element | string;
    handleAccept?: React.MouseEventHandler<HTMLButtonElement>;
    acceptVariant?: ButtonProps['variant'];
    isLoading?: boolean;
};
export type Props = CustomProps & React.ComponentProps<typeof BModal>;
export declare const Modal: React.FC<Props>;
export {};
