import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../service/auth.service';

export const Login = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await authService.login({ userName, password });
            if (response.role === 'ROLE_ADMIN') {
                navigate('/admin/alumnos');
            } else {
                if (response.role === 'ROLE_CLIENT') {
                    navigate('/client/alumnos');
                } else {
                    setError('No tienes permisos para acceder');
                }
            }
        } catch (error) {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-transparent">
            <h1 className="text-3xl font-medium text-gray-700 mb-9">
                Sistema de calificaciones
            </h1>
            <div className="max-w-sm w-full space-y-8 py-8 px-10 bg-primary shadow-primary hover:shadow-lg transition-shadow duration-300 ease-in-out">
                <h1 className="text-2xl font-medium text-gray-700">
                    Bienvenid@!
                </h1>
                <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col space-y-6 mb-16">
                        <div>
                            <h1 className="text-color-primary font-medium text-gray-700 mb-0.5">Nombre de usuario</h1>
                            <label htmlFor="username" className="sr-only"></label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="relative block w-full px-3 py-2 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Usuario"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div>
                            <h1 className="text-color-primary font-medium text-gray-700 mb-0.5">Contraseña</h1>
                            <label htmlFor="password" className="sr-only"></label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="relative block w-full px-3 py-2 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="••••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <div className='flex justify-center mb-2'>
                        <button
                            type="submit"
                            className="p-3 w-48 bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};