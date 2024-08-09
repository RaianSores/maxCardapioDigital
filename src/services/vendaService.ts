import api from './api';
import {IPix, IRequestAccount, Venda} from '../@types/Venda';

export const sendVenda = async (venda: Venda): Promise<Venda> => {
  try {
    const response = await api.post('/food/venda/lancar', venda);
    if (response.status === 200) {
      return response.data as Venda;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Erro ao enviar venda:', error);
    throw error;
  }
};

export const solicitarConta = async (
  venda: IRequestAccount,
): Promise<IRequestAccount> => {
  try {
    const response = await api.post('/food/venda/solicitaConta', venda);
    if (response.status === 200) {
      return response.data as IRequestAccount;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const generatePix = async (pix: IPix): Promise<IPix> => {
  try {
    const response = await api.post(`/financeiro/pix/gerar`, pix);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const checkPaymentStatusPix = async (TxId: string): Promise<any> => {
  try {
    const response = await api.get(`/financeiro/pix/consultar/${TxId}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};

export const finalizaFoodVenda = async (venda: Venda): Promise<Venda> => {
  try {
    const response = await api.put(`/food/venda/finalizar`, venda);
    if (response.status === 200) {
      return response.data as Venda;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw error;
  }
};
