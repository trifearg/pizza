import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    openError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            hasError: false,
            openError: false,
        };

        this.closeAlert = this.closeAlert.bind(this);
    }

    static getDerivedStateFromError(_: Error): State {
        return { hasError: true, openError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log('Error: ', error, errorInfo);
    }

    closeAlert(event?: React.SyntheticEvent | Event, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState((prev) => {
            return {
                openError: !prev.openError,
            };
        });
    }

    render() {
        if (this.state.hasError) {
            return (
                <Snackbar open autoHideDuration={1000} onClose={this.closeAlert}>
                    <Alert severity="error" onClose={this.closeAlert}>
                        <AlertTitle>Ошибка</AlertTitle>
                        Извините, возникли неполадки на сервере.
                    </Alert>
                </Snackbar>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
