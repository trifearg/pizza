import { FunctionComponent, useEffect } from 'react';
import { UserModel } from '../../api/models';

interface IProps {
    currentUser: UserModel;
}
type HOCLoggingType = (props: IProps) => (Component: FunctionComponent) => JSX.Element;

const withLogging: HOCLoggingType = (props) => (Component) => {
    const ComponentLogging: FunctionComponent = () => {
        const { currentUser } = props;
        const currentUserCheck = currentUser.login ? currentUser.login : 'user is not logged in';

        useEffect(() => {
            console.log(`${currentUserCheck} ${Component.displayName}`);
        }, []);

        return <Component />;
    };
    return <ComponentLogging />;
};

export default withLogging;
