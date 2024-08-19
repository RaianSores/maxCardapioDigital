import api from "./api";
import { Conta } from "../@types/Conta";

export const getItemsMesa = async (numeroMesa: number): Promise<Conta[]> => {
  try {
    const response = await api.get<Conta[]>(
      `/food/venda/mesa/consultarItens?numero=${numeroMesa}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }   
  } catch (error) {
    throw error;
  }
};
