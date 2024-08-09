import api from "./api";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
}

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    throw error;
  }
};
