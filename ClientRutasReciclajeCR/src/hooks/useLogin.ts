import { useMutation, UseMutationResult } from '@tanstack/react-query';
import apiInstancia from './api';
import { AxiosError } from 'axios';

// Interfaz de la solicitud de login
interface LoginDtoRequest {
  userName: string;
  password: string;
}

// Interfaz de la respuesta de login
interface LoginDtoResponse {
  token: string;
  name: string;
  success: boolean;
  msnError?: string;
}

// Hook para manejar la mutación de Login
export function useLogin(): UseMutationResult<LoginDtoResponse, AxiosError, LoginDtoRequest> {
  return useMutation<LoginDtoResponse, AxiosError, LoginDtoRequest>({
    mutationFn: async (data: LoginDtoRequest) => {
      const response = await apiInstancia.post<LoginDtoResponse>('Users/Login', data);
      return response.data;
    },
    onError: (error: AxiosError) => {
      console.error('Error during login:', error);
    },
    onSuccess: (data) => {
      if (data.success) {
        // Guardar el token en localStorage
        localStorage.setItem('jwt', data.token);
        console.log('Login successful:', data.name);
      } else {
        console.error('Login failed:', data.msnError);
      }
    },
  });
} 