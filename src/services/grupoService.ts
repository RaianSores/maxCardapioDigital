import api from "./api";
import { Grupo } from "../@types/Grupo";

export const getGrupos = async (): Promise<Grupo[]> => {
  try {
    const response = await api.get<Grupo[]>("/food/grupo/consultar");
    return response.data;
  } catch (error) {
    throw error;
  }
};
