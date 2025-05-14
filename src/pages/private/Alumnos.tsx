import { useEffect, useState } from 'react';
import { alumnosService } from '../../service/alumnos.service';
import type { Alumno } from '../../service/alumnos.service';
import { CardAlumno } from '../../components/alumno/CardAlumno';
import { Buscador } from '../../components/alumno/Buscador';
import { ModalCentrado } from '../../components/modals/ModalCentrado';
import { AlumnoForm } from '../../components/alumno/AlumnoForm';

export const Alumnos = () => {
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modaPostOpen, setModalPostOpen] = useState(false);
    const [notData, setNotData] = useState(false);

    const fetchAlumnos = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await alumnosService.getAlumnos();
            setAlumnos(data);
            setNotData(false);
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

    const handlePostAlumno = async (alumnoData: Omit<Alumno, 'alumnoId' | 'materias'>) => {
        setError('');
        try {
            await alumnosService.createAlumno(alumnoData);
            setModalPostOpen(false);
            fetchAlumnos();
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                'Error al conectar con el servidor. Por favor, intente nuevamente.'
            );
        }
    }

    const handleSearchSubmit = async (rut: string) => {
        if (rut === '') {
            setNotData(false);
            fetchAlumnos();
            return;
        }
        setError('');
        setLoading(true);
        try {
            const response = await alumnosService.getAlumnoByRut(rut)
            if (response) {
                setAlumnos([response]);
            }
        } catch (err: any) {
            setNotData(true);
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
            <div className='flex flex-col md:flex-row justify-between'>
                <h1 className="text-2xl font-bold text-gray-700">Lista de Alumnos</h1>
                <button
                    type="submit"
                    className="md:w-40 bg-white text-gray-700 font-medium p-2.5 md:ml-2 mt-3 md:mt-0 shadow-primary hover:shadow-lg transition-shadow duration-300 "
                    onClick={() => setModalPostOpen(true)}
                >
                    Agregar Alumno
                </button>
            </div>
            <Buscador onSubmit={handleSearchSubmit} />
            {
                notData ? (
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="text-red-500 text-center max-w-md px-4">
                            <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h2 className="text-xl font-semibold mb-2">Ups!!</h2>
                            <p className="mb-4">No se encontraron datos</p>
                            <button
                                className="p-3 w-full bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                                onClick={fetchAlumnos}
                            >
                                Intenta de nuevo
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
                        {alumnos.map((alumno) => (
                            alumno.estado !== false ?
                                <CardAlumno key={alumno.alumnoId} alumno={alumno} fechAlumnos={fetchAlumnos} />
                                : null
                        ))}
                    </div>
                )
            }

            <ModalCentrado open={modaPostOpen} title='Crear nuevo alumno' onClose={() => setModalPostOpen(false)}>
                <AlumnoForm onSubmit={handlePostAlumno} error={error} onClose={() => setModalPostOpen(false)} />
            </ModalCentrado>
        </div >
    );
};