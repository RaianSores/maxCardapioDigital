import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ProductCard from "./ProductCard";
import { Produto } from "../interfaces/Produto";
import { useNavigation } from "@react-navigation/native";

const ProductSection: React.FC<Produto> = ({ products }) => {
  const firstProduct = products.length > 0 ? products[0] : null;

  const navigation = useNavigation(); // Hook de navegação do React Navigation

  const navigateToProductDetails = (product: Produto) => {
    navigation.navigate("Product", { product });
  };
  return (
    <View style={styles.section}>
      {firstProduct && (
        <Text style={styles.sectionTitle}>{firstProduct.grupo}</Text>
      )}
      <View style={styles.sectionCards}>
        {products.map((product, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigateToProductDetails(product)}
          >
            <ProductCard
              key={index}
              image={product.imagem}
              title={product.descricao}
              about={product.proMsg}
              priceFinal={product.valorVenda}
              priceDiscount={product.priceDiscount}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    marginBottom: 10,
    padding: 8,
    paddingLeft: 14,
    position: "relative",
    color: "#B5A8A5",
  },
  sectionCards: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
});

export default ProductSection;
