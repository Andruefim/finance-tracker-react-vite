import { LoginData } from "../features/auth/pages/login/LoginForm";
import { RegisterData } from "../features/auth/pages/register/RegisterForm";
import { User } from "../features/auth/types";
import { http } from "../services/http";
import { LOGIN, REGISTER, USER } from "./apiUrls";

export const fetchUser = async (): Promise<User | undefined> => {
    return http.get<User>(USER)
}

export const login = async (values: LoginData, setError: (error: string) => void): Promise<User | undefined> => {
    return http.post<LoginData, User>(LOGIN, values, setError)
}

export const register = async (values: RegisterData, setError: (error: string) => void): Promise<{message: string} | undefined> => {
    return http.post<RegisterData, {message: string}>(REGISTER, values, setError)
}