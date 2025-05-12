import type { ReactNode } from "react";
import { LogOut } from "lucide-react";
import { authService } from "../service/auth.service";
import { useNavigate } from "react-router-dom";

interface Props {
    children: ReactNode
}

export const Navbar = ({ children }: Props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate("/login");
        console.log("Cerrar sesión");
    };

    return (
        <>
            <nav className="flex flex-row h-16 w-full items-center shadow-navbar bg-primary mx-auto fixed top-0 left-0 z-10">
                <div className="container mx-auto flex justify-between items-center px-4">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-gray-700">Sistema de calificaciones</h1>
                    </div>
                    <div className="flex items-center space-x-6">
                        <ul className="flex flex-row list-none space-x-3 text-gray-700 font-medium text-lg">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Alumnos</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Administracion</a>
                            </li>
                        </ul>
                        <button onClick={handleLogout} className="flex flex-row items-center btn btn-danger ms-auto text-gray-700 font-medium text-lg cursor-pointer">
                            <LogOut className="mr-1"/> Cerrar sesion
                        </button>

                    </div>
                </div>
            </nav>
            {children}
        </>
    );
}