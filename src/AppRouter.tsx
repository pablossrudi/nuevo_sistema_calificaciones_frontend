import { BrowserRouter, Navigate, Route } from "react-router-dom"
import { Login } from "./pages/public/Login"
import { Alumnos } from "./pages/private/Alumnos"
import { PrivateGuard } from "./guards/PrivateGuard"
import { AdminGuard } from "./guards/AdminGuard"
import { RoutesWithNotFound } from "./routes/RoutesWithNotFound"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <RoutesWithNotFound>
                <Route path="/" element={<Navigate to={"/login"} />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateGuard />}>
                    <Route element={<AdminGuard />} >
                        <Route path="/admin/alumnos" element={<Alumnos />} />
                    </Route>
                    <Route path="/client/alumnos" element={<Alumnos />} />
                </Route>
            </RoutesWithNotFound>
        </BrowserRouter>
    )
}