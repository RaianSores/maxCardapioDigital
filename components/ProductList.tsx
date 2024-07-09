import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, RefreshControl } from "react-native";
import ProductSection from "./ProductSection";
import { getProdutos } from "../services/produtoService";
import { Produto } from "../interfaces/Produto";

interface ProductListProps {
  selectedGroupId: number;
}

const ProductList: React.FC<ProductListProps> = ({ selectedGroupId }) => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProdutos();
  }, [selectedGroupId]);

  const fetchProdutos = async () => {
    setRefreshing(true);
    try {
      const produtosData = await getProdutos(selectedGroupId);
      setProdutos(produtosData);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      style={styles.productList}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchProdutos} />
      }
    >
      <ProductSection title="Opções / Bebidas" products={produtos} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productList: {
    padding: 10,
    paddingLeft: 0,
    maxHeight: "100%",
  },
});

export default ProductList;
