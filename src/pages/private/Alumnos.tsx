import { useEffect, useState } from 'react';
import { alumnosService } from '../../service/alumnos.service';
import type { Alumno } from '../../service/alumnos.service';
import { CardAlumno } from '../../components/CardAlumno';
import { Buscador } from '../../components/Buscador';

export const Alumnos = () => {
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [loading, setLoading] = useState(true);

    console.log(import.meta.env.VITE_API_URL)

    const [error, setError] = useState(''); const fetchAlumnos = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await alumnosService.getAlumnos();
            setAlumnos(data);
            console.log(data);
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                'Error al conectar con el servidor. Por favor, intente nuevamente.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlumnos();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
                <div className="text-red-500 text-center max-w-md px-4">
                    <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h2 className="text-xl font-semibold mb-2">Error</h2>
                    <p className="mb-4">{error}</p>
                    <button
                        onClick={fetchAlumnos}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                    >
                        Intentar nuevamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 pt-28 pb-20">
            <h1 className="text-2xl font-bold text-gray-700">Lista de Alumnos</h1>
            <Buscador />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                {alumnos.map((alumno) => (
                    <CardAlumno key={alumno.alumnoId} {...alumno} />
                ))}
            </div>
        </div>
    );
};