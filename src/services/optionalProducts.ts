import api from './api';
import {IProdutosOptions} from '../@types/Produto';

export const consultOptionalProducts = async (
  id: number,
): Promise<IProdutosOptions[] | null> => {
  return new Promise<IProdutosOptions[]>((resolve, reject) => {
    try {
      api
        .get(`produto/opcionais/consultar/` + id, {})
        .then(response => {
          if (response.status === 200) {
            resolve(response.data as IProdutosOptions[]);
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
