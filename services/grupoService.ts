import api from "./api";
import { Grupo } from "../interfaces/Grupo";

export const getGrupos = async (): Promise<Grupo[]> => {
  try {
    const response = await api.get<Grupo[]>("/food/grupo/consultar");
    return response.data;
  } catch (error) {
    console.error("Erro ao obter grupos:", error);
    throw error;
  }
};
