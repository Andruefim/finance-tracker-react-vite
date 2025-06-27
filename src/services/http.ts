import { T } from "react-router/dist/development/route-data-5OzAzQtT";
import { BACKEND_URL } from "../api/apiUrls";
import { getToken } from "./jwt"

export const getAuthHeaders = () => {
    const token = getToken();

    return {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }
}

export const postHeaders = {
    'Content-Type': 'application/json',
    ...getAuthHeaders()
}

export const http = {
    get: async<T>(url: string, setError?: (err: string) => void): Promise<T | undefined> => {
        try {
            const response = await fetch(`${BACKEND_URL}${url}`, {
                method: 'GET',
                headers: getAuthHeaders()
            });
     
            return await response.json(); 
        } catch (e) {
            setError
                ? setError(e as string)
                : console.log(e as string)
        }
    },

    post: async<T, R>(url: string, values: T, setError?: (err: string) => void): Promise<R | undefined> => {
        try {
            const response = await fetch(`${BACKEND_URL}${url}`, {
                method: 'POST',
                headers: postHeaders,
                body: JSON.stringify(values)
            });
    
            return await response.json(); 
        } catch (e) {
            setError
                ? setError(e as string)
                : console.log(e as string)
        }
    }
}

