import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { formatPrice } from "../../utils/format";

type ProductCardProps = {
  image: string;
  title: string;
  about?: string;
  priceFinal: number;
  priceDiscount?: number;
};

const defaultImage = require("../../assets/img/sem-foto.jpg");

const ProductCard: React.FC<ProductCardProps> = ({
  image,
  title,
  about,
  priceFinal,
  priceDiscount,
}) => {

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
  const temPromocao = !!priceDiscount;
  return (
    <View style={styles.productCard}>
      <View>{renderImage()}</View>
      <View style={styles.productCardInfor}>
        <Text style={styles.productCardTitle}>{title}</Text>
        <Text style={styles.productCardAbout}>{about}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.priceFinal}>
            {temPromocao ?
              (<Text style={styles.priceDiscount}>
                {formatPrice(priceFinal)}
              </Text>)
              :
              (
                <>{formatPrice(priceFinal)}</>
              )
            }
          </Text>
          {priceDiscount && <Text style={styles.priceFinal}>{formatPrice(priceDiscount)}</Text>}
        </View>
      </View>

    </View >
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: "#E0DCD9",
    borderRadius: 5,
    color: "#000",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 4,
    gap: 10,
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
    color: "#46423F",
  },
  productCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#46423F",
  },
  productCardAbout: {
    flex: 1,
    fontSize: 18,
    color: "#46423F",
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: 2,
  },
  productCardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#B3B6BB',
    marginRight: 8,
  },
  priceDiscount: {
    fontSize: 18,
    textDecorationLine: 'line-through',
    color: '#52555A',
  },
  priceFinal: {
    fontWeight: "bold",
    fontSize: 23,
    color: "#46423F",
  },
});

export default ProductCard;
