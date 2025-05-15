import { useState } from 'react';
import { alumnosService } from '../../service/alumnos.service';
import type { Alumno } from '../../service/alumnos.service';
import { ModalCentrado } from '../modals/ModalCentrado';
import { AlumnoForm } from './AlumnoForm';
import { ModalDerecha } from '../modals/ModalDerecha';

interface Props {
    alumno: Alumno
    fechAlumnos: () => void
}

interface Evaluacion {
    alumnoMateriaId: string,
    nota: number;
}

export const CardAlumno = ({ alumno, fechAlumnos }: Props) => {
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const [modalNotas, setModalNotas] = useState(false);
    const [titleMateria, setTitleMateria] = useState('');
    const [dataMateria, setDataMateria] = useState<Evaluacion[]>([]);
    const [promedioNota, setPromedioNota] = useState(Number);

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

    const handleMateriaAlumnoModal = (evaluaciones: Evaluacion[], title: string) => {
        setModalNotas(true);
        setTitleMateria(title);
        setDataMateria(evaluaciones);
        
        var suma = 0;
        evaluaciones.forEach(evaluacion => {
           suma += evaluacion.nota; 
        });

        setPromedioNota(suma/evaluaciones.length);
    }

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
                                <p className="text-base font-medium text-gray-700 cursor-pointer" onClick={() => handleMateriaAlumnoModal(materia.evaluaciones, materia.materiaNombre)}>Ver más</p>
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

            <ModalDerecha open={modalNotas} title={titleMateria} onClose={() => setModalNotas(false)}>
                <>
                    <h1>{alumno.alumnoNombre}</h1>
                    <h2>Rut: {alumno.alumnoRut}</h2>
                    <h2>Direccion: {alumno.alumnoDireccion}</h2>
                    <div className='my-5'>
                        <h2>Notas:</h2>
                        {
                            dataMateria.map((evaluacion, index) => (
                                <div key={index}>
                                    <p>Prueba {index+1}: {evaluacion.nota}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='w-full absolute bottom-4'>
                        <hr className='max-w-72 mb-2' />
                        <p>Agregar nueva nota</p>

                        <p>Promedio: {promedioNota}</p>
                    </div>
                </>

            </ModalDerecha>
        </div>
    );
};