import { Button, Dialog, DialogActions } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import { Connector, PropsFromRedux } from "../../store/connector/Connector";

interface IProps extends PropsFromRedux {
    children: ReactElement<ReactNode>
}

const Modal = Connector((props: IProps) => {
    const { isOpen, modalClose, children } = props;
    return (
        <>
            <Dialog onClose={modalClose} open={isOpen}>
                {children}
                <DialogActions>
                    <Button onClick={modalClose} color="warning">Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>
    );
});

export default Modal;