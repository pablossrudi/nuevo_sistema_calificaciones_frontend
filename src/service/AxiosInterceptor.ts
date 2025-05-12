import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { TOKEN_KEY } from './auth.service';

// Crear una instancia de axios que podemos reutilizar
export const axiosInstance = axios.create();

// Configurar el interceptor para incluir el token en todas las peticiones
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Exportar la instancia configurada para que otros servicios la puedan usar
export default axiosInstance;

