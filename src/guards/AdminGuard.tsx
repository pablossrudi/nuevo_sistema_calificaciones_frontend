import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../service/auth.service";
import { Navbar } from "../components/Navbar";

export const AdminGuard = () => {
    const role = authService.getRole();
    const isAdmin = role === 'ROLE_ADMIN';

    return isAdmin ? (
        <Navbar>
            <Outlet />
        </Navbar>
    ) : <Navigate to="/login" replace />
}