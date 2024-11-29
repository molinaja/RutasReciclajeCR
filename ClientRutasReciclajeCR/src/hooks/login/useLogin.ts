import { useMutation, UseMutationResult } from "@tanstack/react-query";
import apiInstancia from "../api";
import { AxiosError } from "axios";

interface LoginDtoRequest {
  userName: string;
  password: string;
}

interface LoginDtoResponse {
  token: string;
  name: string;
  success: boolean;
  msnError?: string;
}

export function useLogin(): UseMutationResult<
  LoginDtoResponse,
  AxiosError,
  LoginDtoRequest
> {
  return useMutation<LoginDtoResponse, AxiosError, LoginDtoRequest>({
    mutationFn: async (data: LoginDtoRequest) => {
      const response = await apiInstancia.post<LoginDtoResponse>(
        "Users/Login",
        data
      );
      return response.data;
    },
    onError: (error: AxiosError) => {
      console.error("Error during login:", error);
    },
    onSuccess: (data) => {
      if (data.success) {
        localStorage.setItem("jwt", data.token);
        console.log("Login successful:", data.name);
      } else {
        console.error("Login failed:", data.msnError);
      }
    },
  });
}
