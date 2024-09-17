import React, { useContext, useEffect, useState } from "react";
import { RefreshControl, SafeAreaView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import LottieView from 'lottie-react-native';
import ProductSection from "../ProductSection/ProductSection";
import { getProdutos, getProdutosPromocoes } from "../../services/produtoService";
import { Produto } from "../../@types/Produto";
import showToast from "../../utils/ToastUtil";
import { FoodVendaContext } from "../../Context/FoodVendaContext";
import { styles } from "./styles";

interface ProductListProps {
  selectedGroupId: number;
}

const ProductList: React.FC<ProductListProps> = ({ selectedGroupId }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { consultarFoodMesa, foodVenda } = useContext(FoodVendaContext);

  const pedidoConta = foodVenda?.[0]?.pediuConta !== 0;

  useEffect(() => {
    if (selectedGroupId === 10000) {
      fetchProdutosPromocoes()
    } else if (selectedGroupId === 10001) {
      fetchProdutosHome()
    } else {
      fetchProdutos()
    }

  }, [selectedGroupId]);

  const fetchProdutos = async () => {
    setRefreshing(true);
    setIsLoading(true);
    try {
      const produtosData = await getProdutos(selectedGroupId);
      setProdutos(produtosData);
    } catch (error) {
      showToast("Erro ao buscar produtos!", 'error');
    } finally {
      setTimeout(() => {
        setRefreshing(false);
        setIsLoading(false);
      }, 780);
    }
  };

  const fetchProdutosHome = async () => {
    setRefreshing(true);
    setIsLoading(true);
    try {
      const produtosData = await getProdutos(0);
      setProdutos(produtosData);
    } catch (error) {
      showToast("Erro ao buscar produtos!", 'error');
    } finally {
      setTimeout(() => {
        setRefreshing(false);
        setIsLoading(false);
      }, 780);
    }
  };

  const fetchProdutosPromocoes = async () => {
    setRefreshing(true);
    setIsLoading(true);
    try {
      const produtosData = await getProdutosPromocoes();
      setProdutos(produtosData);
    } catch (error) {
      showToast("Erro ao buscar produtos!", 'error');
    } finally {
      setTimeout(() => {
        setRefreshing(false);
        setIsLoading(false);
      }, 780);
    }
  };

  return (
    <SafeAreaView style={
      pedidoConta
        ? styles.productListContainerConta
        : styles.productListContainer
    }>
      {isLoading ? (
        <LottieView
          source={require("../../lottie/MaxData.json")}
          autoPlay
          loop
          style={{ flex: 1, width: 250, height: 250, alignSelf: 'center' }}
        />
      ) : (
        <FlashList
          data={produtos}
          renderItem={({ item }) => <ProductSection products={[item]} />}
          keyExtractor={(item) => item.proId.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchProdutos} />
          }
          estimatedItemSize={20}
          contentContainerStyle={
            pedidoConta
              ? styles.flashListContentContainerConta
              : styles.flashListContentContainer
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ProductList;
