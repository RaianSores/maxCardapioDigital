import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type ProductCardProps = {
  image: string;
  title: string;
  about?: string;
  priceFinal: string;
  priceDiscount?: string;
};

const defaultImage = require("../assets/img/sem-foto.jpg");

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  about,
  priceFinal,
  priceDiscount,
}) => {
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };
  const renderImage = () => {
    if (image) {
      const base64Clean = image.replace(/\r?\n|\r/g, "");
      return (
        <Image
          source={{ uri: `data:image/png;base64,${base64Clean}` }}
          style={styles.productCardPhoto}
        />
      );
    } else {
      return <Image source={defaultImage} style={styles.productCardPhoto} />;
    }
  };
  return (
    <View style={styles.productCard}>
      <View>{renderImage()}</View>
      <View style={styles.productCardInfor}>
        <Text style={styles.productCardTitle}>{title}</Text>
        {about && <Text style={styles.productCardAbout}>{about}</Text>}
        <View style={styles.productCardPrice}>
          {priceDiscount && (
            <Text style={styles.priceDiscount}>
              {formatCurrency(priceDiscount)}
            </Text>
          )}
          <Text style={styles.priceFinal}>{formatCurrency(priceFinal)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#dddddd",
    borderRadius: 5,
    color: "#000",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 10,
    marginBottom: 10,
    gap: 16,
  },
  productCardPhoto: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    overflow: "hidden",
    height: 120,
    width: 100,
    maxWidth: "100%",
    maxHeight: 120,
    objectFit: "contain",
  },
  productCardImage: {},
  productCardInfor: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    fontSize: 14,
    flex: 1,
    paddingBottom: 20, // espaço para o preço fixo
  },
  productCardTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  productCardAbout: {
    flex: 1,
  },
  productCardPrice: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  priceDiscount: {
    fontSize: 14,
    textDecorationLine: "line-through",
    textDecorationColor: "red",
    opacity: 0.8,
    marginRight: 10,
  },
  priceFinal: {
    fontWeight: "bold",
    fontSize: 23,
  },
});

export default ProductCard;
