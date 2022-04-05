import { Route, Redirect, RouteProps } from "react-router-dom";
import { FC } from 'react';
import { useSelector } from '../../services/hooks';

const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const { loggedIn } = useSelector((store) => store.auth);

    return (
        <Route
            {...rest}
            render={({ location }) => (
                loggedIn
                ? (children)
                : (<Redirect to={{ pathname: '/login', state: { from: location } }} />)
            )}
        />
    );
}

export default ProtectedRoute;