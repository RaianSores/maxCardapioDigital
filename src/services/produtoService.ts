import api from './api';
import {Produto} from '../@types/Produto';

export const getProdutos = async (idGrupo: number): Promise<any> => {
  try {
    const response = await api.get<{docs: Produto[]}>(
      `/food/produto/consultar?idGrupo=${idGrupo}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProdutosPromocoes = async (): Promise<any> => {
  try {
    const response = await api.get<{docs: Produto[]}>(
      `/food/produtoPromocoes/consultar`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
