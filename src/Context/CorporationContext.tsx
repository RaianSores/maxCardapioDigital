import React, {
    useState,
    useCallback,
    ReactNode,
    createContext,
    useContext
} from "react";
import { Corporation } from "../@types/Config";
import { getEmpresa } from "../services/configService";

interface ICorporationProviderProps {
    children: React.ReactNode;
};

interface ICorporationContextData {
    empresaData: Corporation[];
    setEmpresaData: React.Dispatch<React.SetStateAction<Corporation[]>>;
    isInit: boolean;
    setIsInit: React.Dispatch<React.SetStateAction<boolean>>;
    fetchEmpresaData: () => Promise<Corporation[]>;
};

export const CorporationContext = createContext<ICorporationContextData>(
    {} as ICorporationContextData
);

export function CorporationProvider({ children }: ICorporationProviderProps) {
    const [empresaData, setEmpresaData] = useState<Corporation[]>([]);
    const [isInit, setIsInit] = useState(false);

    const fetchEmpresaData = useCallback(async () => {
        try {
            const data: Corporation[] = await getEmpresa();
            setEmpresaData(data);
            return data as Corporation[];
        } catch (error) {
            return [];
        }
    }, []);

    return (
        <CorporationContext.Provider
            value={{
                empresaData,
                setEmpresaData,
                fetchEmpresaData,
                isInit,
                setIsInit,
            }}
        >
            {children}
        </CorporationContext.Provider>
    )

};

export const useCorporationContext = () => {
    return useContext(CorporationContext);
};