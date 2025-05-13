import { useState, useEffect } from 'react';
import type { Alumno } from '../service/alumnos.service';

interface Props {
    alumno?: Omit<Alumno, 'alumnoId' | 'materias'>;
    onSubmit: (alumnoData: Omit<Alumno, 'alumnoId' | 'materias'>) => void;
    error?: string;
    onClose: () => void;
}

export const AlumnoForm = ({ alumno, onSubmit, error, onClose }: Props) => {
    const [formData, setFormData] = useState({
        alumnoNombre: '',
        alumnoRut: '',
        alumnoDireccion: '',
        estado: true
    });

    useEffect(() => {
        if (alumno) {
            setFormData({
                alumnoNombre: alumno.alumnoNombre,
                alumnoRut: alumno.alumnoRut,
                alumnoDireccion: alumno.alumnoDireccion,
                estado: alumno.estado
            });
        }
    }, [alumno]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4">
            <div>
                <label htmlFor="alumnoNombre" className="block text-xl font-medium text-gray-700">
                    Nombre alumno
                </label>
                <input
                    type="text"
                    id="alumnoNombre"
                    name="alumnoNombre"
                    value={formData.alumnoNombre}
                    onChange={handleChange}
                    className="relative block w-full px-3 py-2 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="alumnoRut" className="block text-xl font-medium text-gray-700">
                    Rut alumno
                </label>
                <input
                    type="text"
                    id="alumnoRut"
                    name="alumnoRut"
                    value={formData.alumnoRut}
                    onChange={handleChange}
                    className="relative block w-full px-3 py-2 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                />
            </div>
            <div>
                <label htmlFor="alumnoDireccion" className="block text-xl font-medium text-gray-700">
                    Dirección alumno
                </label>
                <input
                    type="text"
                    id="alumnoDireccion"
                    name="alumnoDireccion"
                    value={formData.alumnoDireccion}
                    onChange={handleChange}
                    className="relative block w-full px-3 py-2 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <div className='flex space-x-4 mt-9'>
                <button
                    className="p-3 w-full bg-red-100 text-red-700 hover:bg-red-500 hover:text-white text-base font-medium shadow-md hover:shadow-lg transition-shadow duration-300"
                    onClick={onClose}
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
        </form>
    );
};