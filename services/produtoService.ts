import api from "./api";
import { Produto } from "../interfaces/Produto";

export const getProdutos = async (idGrupo: number): Promise<Produto[]> => {
  console.log("iniciando busca produtos");
  try {
    const response = await api.get<{ docs: Produto[] }>(
      `/food/produto/consultar?idGrupo=${idGrupo}`
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter produtos do grupo ${idGrupo}:`, error);
    throw error;
  }
};
