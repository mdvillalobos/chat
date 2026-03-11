import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import type { User } from "../src/types/UserTypes";
import axiosInstance from "../src/utils/axiosUtil";

type Props = {
    children: ReactNode
}

type UserContextType = {
    user: User | null
    setUser: (user: User | null) => void
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: Props) => {
    const [ user, setUser ] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { data } = await axiosInstance.get('/api/user/fetch-user-data');
                setUser(data.data)
            } catch(error: any) {
                setUser(null)
            }
        }

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within a UserContextProvider");
    }

    return context;
};