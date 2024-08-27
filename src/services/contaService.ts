import api from "./api";
import { Conta } from "../@types/Conta";

export const getItemsMesa = async (numeroMesa: number): Promise<Conta[]> => {
  try {
    const response = await api.get<Conta[]>(
      `/food/venda/mesa/consultarItens?numero=${numeroMesa}`
    );
    if (response.status === 200) {
      return response.data as Conta[];
    } else if (response.status === 204) {
      return [];
    } else {
      throw new Error(`Unexpected status code: ${response.status}`);
    }  
  } catch (error) {
    throw error;
  }
};

