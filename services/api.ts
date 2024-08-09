import axios, { AxiosInstance } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função para obter o IP, porta e outros dados de configuração
const getConfigData = async () => {
  try {
    const ipUrl = await AsyncStorage.getItem("ipUrl");
    const porta = await AsyncStorage.getItem("porta");
    const idEmpresa = await AsyncStorage.getItem("idEmpresa");
    const token = await AsyncStorage.getItem("token");

    if (ipUrl && porta && idEmpresa && token) {
      return {
        baseURL: `http://${ipUrl}:${porta}/v1`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          empId: idEmpresa,
        },
      };
    } else {
      throw new Error("Dados de configuração incompletos no AsyncStorage");
    }
  } catch (error) {
    console.error("Erro ao obter dados de configuração:", error);
    throw error;
  }
};

const api: AxiosInstance = axios.create({
  baseURL: "", // Inicialmente vazio, será preenchido dinamicamente
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para definir dinamicamente a baseURL, token e outros headers
api.interceptors.request.use(
  async (config) => {
    try {
      const configData = await getConfigData();
      if (configData) {
        config.baseURL = configData.baseURL;
        config.headers = {
          ...config.headers,
          ...configData.headers,
        };
      }
    } catch (error) {
      console.error("Erro ao definir configurações de requisição:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
