import { createContext, ReactNode } from "react";

interface EnvContextType{
    development: boolean;
}

interface EnvProviderProps {
    children: ReactNode;
}

const defaultEnv: EnvContextType = {
    development: false
};

export const EnvContext = createContext<EnvContextType>(defaultEnv);

export const EnvProvider = ({ children }: EnvProviderProps) => {
  return (
    <EnvContext.Provider value={defaultEnv}>
      {children}
    </EnvContext.Provider>
  );
};