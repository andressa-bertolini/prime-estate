import { createContext, ReactNode } from "react";

interface EnvContextType{
    development: boolean;
}

export const EnvContext = createContext<EnvContextType>({
    development: true
})

interface EnvProviderProps {
    children: ReactNode;
}

export const EnvProvider = ({ children }: EnvProviderProps) => {
    const development = true;

    return (
        <EnvContext.Provider value={{ development }}>
            {children}
        </EnvContext.Provider>
    );
};