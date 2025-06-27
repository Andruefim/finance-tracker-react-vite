import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { CONFIRM_EMAIL, LOGIN } from '../../constants/routes';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = () => {
    const { user, loadingUser } = useContext(AuthContext);

    if (loadingUser) return null;

    if (!user) return <Navigate to={LOGIN}/>
    if (!user.emailConfirmed) return <Navigate to={CONFIRM_EMAIL}/>

    return <Outlet />
}

export default ProtectedRoute;