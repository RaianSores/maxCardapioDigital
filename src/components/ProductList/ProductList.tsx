import React, { useEffect, useState } from "react";
import { StyleSheet, RefreshControl, SafeAreaView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ProductSection from "../ProductSection/ProductSection";
import { getProdutos, getProdutosPromocoes } from "../../services/produtoService";
import { Produto } from "../../@types/Produto";
import showToast from "../../utils/ToastUtil";

interface ProductListProps {
  selectedGroupId: number;
}

const ProductList: React.FC<ProductListProps> = ({ selectedGroupId }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    selectedGroupId === 10000 ? fetchProdutosPromocoes() : fetchProdutos();
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
    <SafeAreaView style={styles.productListContainer}>
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
          estimatedItemSize={20} // Tamanho estimado de cada item para melhor performance
          contentContainerStyle={styles.flashListContentContainer}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  productListContainer: {
    flex: 1,
    backgroundColor: '#3E3E3E',
  },
  flashListContentContainer: {
    padding: 10,
    paddingLeft: 0,
    backgroundColor: '#3E3E3E',
  },
});

export default ProductList;
