import api from "./api";
import { Venda } from "../interfaces/Venda";

export const sendVenda = async (venda: Venda): Promise<void> => {
  try {
    const response = await api.post("/food/venda/lancar", venda);
    console.log("Venda enviada com sucesso:", response.data);
  } catch (error) {
    console.error("Erro ao enviar venda:", error);
    throw error;
  }
};
