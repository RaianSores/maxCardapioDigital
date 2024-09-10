import api from "./api";
import { IProdutosAdditional } from "../@types/Produto";

export const consultAdditionalProducts = async (
  id: number,
): Promise<IProdutosAdditional[] | null> => {
  return new Promise<IProdutosAdditional[]>((resolve, reject) => {
    try {
      api
        .get(`produto/adicionais/consultar/` + id, {})
        .then(response => {
          if (response.status === 200) {
            resolve(response.data as IProdutosAdditional[]);
          } else {
            reject(new Error(response.data.message));
          }
        })
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
