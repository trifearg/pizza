import { Alert, Snackbar } from '@mui/material';
import { FunctionComponent, useState } from 'react';

interface IProps {
    login: string;
}

const FictionalError: FunctionComponent<IProps> = ({ login }) => {
    const [helloAlert, setHelloAlert] = useState(true);

    if (login === 'Error') {
        throw new Error('Ошибка на сервере!');
    }

    const closeAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setHelloAlert(false);
    };

    return (
        <>
            {login ? (
                <Snackbar open={helloAlert} autoHideDuration={3000} onClose={closeAlert}>
                    <Alert severity="success" onClose={closeAlert}>
                        {`Hello, ${login}`}
                    </Alert>
                </Snackbar>
            ) : null}
        </>
    );
};

export default FictionalError;
