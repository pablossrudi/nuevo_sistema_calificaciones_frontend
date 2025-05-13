import { useState } from 'react';
import { alumnosService } from '../service/alumnos.service';
import type { Alumno } from '../service/alumnos.service';
import { ModalCentrado } from './modals/ModalCentrado';
import { AlumnoForm } from './AlumnoForm';

interface Props {
    alumno: Alumno
    fechAlumnos: () => void
}

export const CardAlumno = ({ alumno, fechAlumnos }: Props) => {
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    
    const handleDeleteAlumno = async () => {
        setError('');
        try {
            await alumnosService.deleteAlumno(alumno.alumnoId);
            setModalOpen(false);
            fechAlumnos();
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                'Error al conectar con el servidor. Por favor, intente nuevamente.'
            );
        }
    };

    const handleEditAlumno = async (alumnoData: Omit<Alumno, 'alumnoId' | 'materias'>) => {
        setError('');
        try {
            await alumnosService.updateAlumno(alumno.alumnoId, alumnoData);
            setModalOpen(false);
            fechAlumnos();
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                'Error al conectar con el servidor. Por favor, intente nuevamente.'
            );
        }
    }

    return (
        <div className="bg-primary shadow-primary overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6 flex flex-col justify-between h-full mx-3">
                <div>
                    <div className="mb-4">
                        <h2 className="text-2xl font-medium text-gray-700">{alumno.alumnoNombre}</h2>
                    </div>
                    <div className="text-gray-700">
                        <p className="text-base font-medium">
                            Rut: {alumno.alumnoRut}
                        </p>
                        <p className="text-base font-medium">
                            Dirección: {alumno.alumnoDireccion}
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <ul className="list-inside list-none">
                        {alumno.materias.map((materia, index) => (
                            <div className='flex justify-between shadow-primary p-3 mb-2' key={index}>
                                <li key={index} className="text-base font-medium text-gray-700 ">{materia.materiaNombre}</li>
                                <p className="text-base font-medium text-gray-700 cursor-pointer">Ver más</p>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="mt-4 flex justify-between space-x-4">
                    <button
                        className="p-3 w-full bg-red-100 text-red-700 hover:bg-red-500 hover:text-white text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                        onClick={() => setModalOpen(true)}
                    >
                        Eliminar Alumno
                    </button>
                    <button
                        className="p-3 w-full bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                        onClick={() => setModalEditOpen(true)}
                    >
                        Editar Alumno
                    </button>
                </div>
                {/* <p>{error}</p> */}
            </div>
            <ModalCentrado open={modalOpen} title='Eliminar Alumno' onClose={() => setModalOpen(false)} onConfirm={handleDeleteAlumno}>
                <h2 className='text-xl font-bold text-gray-700'>Estas a punto de eliminar a {alumno.alumnoNombre}</h2>
                <h2 className='text-xl font-bold text-gray-700'>¿Estas segur@ de ejecutar esta acción?</h2>
            </ModalCentrado>

            <ModalCentrado open={modalEditOpen} title='Editar Alumno' onClose={() => setModalEditOpen(false)}>
                <AlumnoForm alumno={alumno} onSubmit={handleEditAlumno} error={error} onClose={() => setModalOpen(false)} />
            </ModalCentrado>
        </div>
    );
};