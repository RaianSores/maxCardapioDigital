import api from './api';
import { ConfiguteService } from '../@types/Config';

export const getConfiguracoes = async (): Promise<ConfiguteService> => {
  try {
    const response = await api.get('/food/configuracoes');
    return response.data;
  } catch (error) {
    throw error;
  }
};
