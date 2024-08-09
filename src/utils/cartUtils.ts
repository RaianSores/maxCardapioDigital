import AsyncStorage from "@react-native-async-storage/async-storage";

// Interface para o item do carrinho
interface CartItem {
  id: number;
  quantity: number;
  price: number;
  description: string;
  image: string;
}

// Função para obter a quantidade de itens no carrinho
export const getCartItemCount = async (): Promise<number> => {
  try {
    const existingItems = await AsyncStorage.getItem("cartItems");
    const cartItems: CartItem[] = existingItems
      ? JSON.parse(existingItems)
      : [];
    return cartItems.length;
  } catch (error) {
    console.error("Erro ao obter quantidade de itens do carrinho:", error);
    return 0;
  }
};
