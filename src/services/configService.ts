import api from './api';
import {ConfiguteService, Corporation} from '../@types/Config';

export const getConfiguracoes = async (): Promise<ConfiguteService> => {
  try {
    const response = await api.get(`/food/configuracoes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmpresa = async (): Promise<Corporation[]> => {
  try {
    const response = await api.get(`public/empresa/consultar`);
    if (response.status = 200) {
      return response.data as Corporation[];
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};
