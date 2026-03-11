import { type JSX,  } from "react";
import { useUser } from '../../../context/userContext.tsx'
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
    children: JSX.Element;
    isAuthPage?: boolean;
}

const ProtectedRoutes = ({ children, isAuthPage = false }: ProtectedRouteProps) => {
    const { user } = useUser();

    if (!user && !isAuthPage) {
        return <Navigate to="/login" replace />;
    }

    if (user && isAuthPage) {
        return <Navigate to="/chat" replace />;
    }

    return children;
}

export default ProtectedRoutes