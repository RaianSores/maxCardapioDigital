import api from "./api";

export interface Config {
  id: number;
  name: string;
  description: string;
}

export const getGroups = async (): Promise<Config[]> => {
  try {
    const response = await api.get("/groups");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar grupos:", error);
    throw error;
  }
};

export const getGroupById = async (id: number): Promise<Config> => {
  try {
    const response = await api.get(`/groups/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar grupo com ID ${id}:`, error);
    throw error;
  }
};
