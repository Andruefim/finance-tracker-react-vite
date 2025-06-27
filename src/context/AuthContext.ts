import { createContext, useEffect, useState } from 'react';
import { fetchUser } from '../api/user';
import { User } from '../features/auth/types';

export interface IAuthContext {
    user: User | null;
    setUser: (user: User) => void;
    refetchUser: () => void;
    loadingUser: boolean;
} 

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuthContext = (): IAuthContext => {
    const [user, setUser] = useState<User | null>(null);
    const [loadingUser, toggleLoadingUser] = useState(true);

    useEffect(()=>{
        refetchUser();
    },[])

    const refetchUser = async () => {
        const userResult = await fetchUser();
        userResult && setUser(userResult);
        toggleLoadingUser(false);
    }

    return {
        user,
        setUser,
        refetchUser,
        loadingUser
    }
}