import axiosInstance from './AxiosInterceptor';

/* const BASE_URL = 'http://localhost:8080/api/auth'; */
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResponse {
    jwt: string;         // El token JWT viene en la propiedad 'jwt'
    role: string;        // El rol viene como string simple
}

export const TOKEN_KEY = 'auth_token';
export const ROLE_KEY = 'user_role';

export const authService = {
    login: async (credentials: LoginRequest): Promise<LoginResponse> => {
        try {
            const response = await axiosInstance.post<LoginResponse>(`${BASE_URL}/login`, credentials);
            if (!response.data.jwt) {
                throw new Error('No se recibió el token del servidor');
            }

            // Guardar el token y el rol en localStorage
            localStorage.setItem(TOKEN_KEY, response.data.jwt);
            localStorage.setItem(ROLE_KEY, response.data.role);

            return response.data;
        } catch (error: any) {
            throw error;
        }
    },

    logout: () => {
        // Eliminar token y rol del localStorage
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(ROLE_KEY);
    },

    getToken: (): string | null => {
        return localStorage.getItem(TOKEN_KEY);
    },

    getRole: (): string | null => {
        return localStorage.getItem(ROLE_KEY);
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem(TOKEN_KEY);
    }
};
