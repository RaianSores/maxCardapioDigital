import api from "./api";
import { Conta } from "../interfaces/Conta";

export const getItemsMesa = async (numeroMesa: number): Promise<Conta[]> => {
  console.log(numeroMesa);
  try {
    const response = await api.get<Conta[]>(
      `/food/venda/mesa/consultarItens?numero=${numeroMesa}`
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao consultar itens da mesass:", error);
    throw error;
  }
};
