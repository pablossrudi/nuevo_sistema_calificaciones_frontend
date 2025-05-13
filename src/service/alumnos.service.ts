import axiosInstance from './AxiosInterceptor';

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/alumnos`;

export interface Alumno {
    alumnoId: string;
    alumnoNombre: string;
    alumnoRut: string;
    alumnoDireccion: string;
    estado: boolean;
    materias: any[];
}

interface PaginatedResponse {
    alumnos: Alumno[];
    numberOfElements: number;
    numberPage: number;
}

export const alumnosService = {
    // Obtener todos los alumnos
    getAlumnos: async (): Promise<Alumno[]> => {
        const response = await axiosInstance.get<PaginatedResponse>(`${BASE_URL}?size=20`);
        
        if (response.data && Array.isArray(response.data.alumnos)) {
            return response.data.alumnos;
        }
        
        throw new Error('No se encontraron alumnos en la respuesta');
    },

    // Obtener un alumno por ID
    getAlumnoById: async (id: string): Promise<Alumno> => {
        const response = await axiosInstance.get<Alumno>(`${BASE_URL}/${id}`);
        return response.data;
    },

    // Crear un nuevo alumno
    createAlumno: async (alumno: Omit<Alumno, 'alumnoId' | 'materias'>): Promise<Alumno> => {
        const response = await axiosInstance.post<Alumno>(BASE_URL, alumno);
        return response.data;
    },

    // Actualizar un alumno existente
    updateAlumno: async (id: string, alumno: Omit<Alumno, 'alumnoId' | 'materias'>): Promise<Alumno> => {
        const response = await axiosInstance.put<Alumno>(`${BASE_URL}/${id}`, alumno);
        return response.data;
    },

    // Eliminar un alumno
    deleteAlumno: async (id: string): Promise<boolean> => {
        const response = await axiosInstance.put<Alumno>(`${BASE_URL}/delete/${id}`)
        console.log(response.data)
        return response.data.estado;
    }
    /* deleteAlumno: async (id: string): Promise<void> => {
        await axiosInstance.delete(`${BASE_URL}/${id}`);
    } */
};
