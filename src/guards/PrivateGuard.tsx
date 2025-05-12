import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../service/auth.service";

export const PrivateGuard = () => {
    const isAuthenticated = authService.isAuthenticated();

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
