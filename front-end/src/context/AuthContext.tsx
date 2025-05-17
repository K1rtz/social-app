import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

type AuthUserType = {
    id: string;
    fullName: string;
    username: string;
    email: string;
    profileDescription: string;
    profilePic: string;
    gender: string;
    follows?: FollowType[];
    following?: FollowType[];
}
type FollowType = {
    id: string;
    fromId: string;
    toId: string;
    from?: Partial<AuthUserType>;
    to?: Partial<AuthUserType>;
};

const AuthContext = createContext<{
    authUser: AuthUserType | null;
    setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
    isLoading: boolean;
}>({
    authUser: null,
    setAuthUser: () => {},
    isLoading: true,
})


export const useAuthContext = () =>{
    return useContext(AuthContext);
}


export const AuthContextProvider = ({children} : {children:ReactNode}) => {
    const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const fetchAuthUser = async () => {
            try {
                setIsLoading(true)
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error)
                }
                setAuthUser(data);
            } catch (error: any) {
                console.error(error);
            }finally{
                setIsLoading(false);
            }
        }
        fetchAuthUser();
    }, [])
    return (
        <AuthContext.Provider
        value = {{
            authUser,
            isLoading,
            setAuthUser
        }}
        >
            {children}
        </AuthContext.Provider>
        
    )
}