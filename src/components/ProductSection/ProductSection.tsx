import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import ProductCard from "../ProductCard/ProductCard";
import { Produto } from "../../@types/Produto";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { FoodVendaContext } from "../../Context/FoodVendaContext";

type ProductSectionProps = {
  products: Produto[];
};

const ProductSection: React.FC<ProductSectionProps> = ({ products }) => {
  const firstProduct = products.length > 0 ? products[0] : null;
  const navigation = useNavigation<NavigationProp<any>>();
  const { foodVenda } = useContext(FoodVendaContext);

  const navigateToProductDetails = (product: Produto) => {
    if (foodVenda[0]?.pediuConta && foodVenda[0].pediuConta !== 0) {
      Alert.alert(
        "Ação não permitida!",
        "Você já solicitou a conta, não é possível acessar o produto.",
        [{ text: "OK" }]
      );
    } else {
      navigation.navigate("Product", { product });
    }
  };

  return (
    <View>
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
              priceDiscount={product.valorPromocao}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    paddingLeft: 14,
    color: "#B5A8A5",
  },
  sectionCards: {
    flexDirection: "column",
  },
});

export default ProductSection;
