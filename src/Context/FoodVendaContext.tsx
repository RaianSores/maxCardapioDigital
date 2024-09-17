import React, {
    useState,
    useCallback,
    ReactNode,
    createContext,
    useContext
} from "react";
import { Venda } from "../@types/Venda";
import { consultarFoodVendaMesa } from "../services/vendaService";

interface IFoodVendaProviderProps {
    children: ReactNode;
};

interface IFoodVendaContextData {
    setFoodVenda: React.Dispatch<React.SetStateAction<Venda[]>>;
    foodVenda: Venda[];
    consultarFoodMesa: (numMesa: number) => Promise<Venda[]>;
};

export const FoodVendaContext = createContext<IFoodVendaContextData>(
    {} as IFoodVendaContextData
);

export function FoodVendaProvider({ children }: IFoodVendaProviderProps) {
    const [foodVenda, setFoodVenda] = useState<Venda[]>([]);

    const consultarFoodMesa = useCallback(async (numMesa: number) => {
        try {
            const foodVenda: Venda[] = await consultarFoodVendaMesa(numMesa);
            if (foodVenda) {
                setFoodVenda(foodVenda);
                return foodVenda as Venda[];
            } else {
                return [];
            }
        } catch (error) {
            return [];
        }
    }, []);

    return (
        <FoodVendaContext.Provider
            value={{
                setFoodVenda,
                foodVenda,
                consultarFoodMesa,
            }}
        >
            {children}
        </FoodVendaContext.Provider>
    );
};

export const useFoodVendaContext = () => useContext(FoodVendaContext);
