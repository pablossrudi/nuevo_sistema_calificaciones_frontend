
import type { Alumno } from '../service/alumnos.service';

export const CardAlumno = ({ alumnoId, alumnoNombre, alumnoRut, alumnoDireccion, materias }: Alumno) => {
    return (
        <div className="bg-primary shadow-primary overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="p-6 flex flex-col justify-between h-full mx-3">
                <div>
                    <div className="mb-4">
                        <h2 className="text-2xl font-medium text-gray-700">{alumnoNombre}</h2>
                    </div>
                    <div className="text-gray-700">
                        <p className="text-base font-medium">
                            Rut: {alumnoRut}
                        </p>
                        <p className="text-base font-medium">
                            Dirección: {alumnoDireccion}
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <ul className="list-inside list-none">
                        {materias.map((materia, index) => (
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
                        onClick={() => console.log('Eliminar', alumnoId)}
                    >
                        Eliminar Alumno
                    </button>
                    <button
                        className="p-3 w-full bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                        onClick={() => console.log('Editar', alumnoId)}
                    >
                        Editar Alumno
                    </button>
                </div>
            </div>
        </div>
    );
};