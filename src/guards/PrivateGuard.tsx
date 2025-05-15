import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../service/auth.service";
import { Navbar } from "../components/Navbar";

export const PrivateGuard = () => {
    const isAuthenticated = authService.isAuthenticated();

    return isAuthenticated ? (<Navbar><Outlet /></Navbar>) : <Navigate to="/login" replace />
}
