import axiosInstance from "./AxiosInterceptor";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/materias`;

export interface Materia {
    materiaId: string;
    materiaNombre: string;
    alumnos: any[];
}

export const materiaService = {
    // Crear una nueva materia
        createAlumno: async (alumno: Omit<Materia, 'materiaId' | 'alumnos'>): Promise<Materia> => {
            const response = await axiosInstance.post<Materia>(BASE_URL, alumno);
            return response.data;
        },
}