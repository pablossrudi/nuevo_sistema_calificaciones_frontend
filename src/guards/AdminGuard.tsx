import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../service/auth.service";

export const AdminGuard = () => {
    const role = authService.getRole();
    const isAdmin = role === 'ROLE_ADMIN';

    return isAdmin ? (
        <Outlet />
    ) : <Navigate to="/login" replace />
}