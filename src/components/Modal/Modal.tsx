import { Dialog } from '@mui/material';
import { FunctionComponent, ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
    children: ReactElement<ReactNode>;
    isOpen: boolean;
    modalClose: () => void
}

const Modal: FunctionComponent<IProps> = ({ isOpen, modalClose, children }) => {
    return ReactDOM.createPortal(
        <>
            <Dialog onClose={modalClose} open={isOpen} maxWidth={false} scroll="paper"> 
                {children}
            </Dialog>
        </>,
        document.getElementById('root') as HTMLElement
    );
};

export default Modal;
