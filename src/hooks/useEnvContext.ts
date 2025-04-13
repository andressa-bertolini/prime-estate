import { useContext } from "react";
import { EnvContext } from "../context/EnvContext";

export const useEnvContext = () => {
    const context = useContext(EnvContext);
    return context;
}