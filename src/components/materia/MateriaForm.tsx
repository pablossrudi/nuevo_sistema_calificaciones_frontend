import { useState } from "react";
import { materiaService, type Materia } from "../../service/materias.service";

export const MateriaForm = () => {
    const [data, setData] = useState({ materiaNombre: '' });
    const [error, setError] = useState('');

    const postMateria = async (materiaData: Omit<Materia, 'materiaId' | 'alumnos'>) => {
        setError('');
        try {
            await materiaService.createAlumno(materiaData);
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                'Error al conectar con el servidor. Por favor, intente nuevamente.'
            )
        } 
    }

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('materiaNombre') as string;

        const materiaData = {
            materiaNombre: name
        };

        postMateria(materiaData);
    }

    return (
        <form onSubmit={handleChange} className="flex flex-col w-full space-y-4">
            <label htmlFor="materiaNombre" className="block text-xl font-medium text-gray-700">
                Nombre de la materia
            </label>
            <input
                type="text"
                id="materiaNombre"
                name="materiaNombre"
                className="relative block w-full px-3 py-2 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
            />

            <div className='flex space-x-4 mt-9'>
                <button
                    className="p-3 w-full bg-red-100 text-red-700 hover:bg-red-500 hover:text-white text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                /* onClick={onClose} */
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="p-3 w-full bg-blue-100 text-blue-700 hover:bg-blue-500 hover:text-white text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                    Guardar
                </button>
            </div>
            <p>{error}</p>
        </form>
    );
}