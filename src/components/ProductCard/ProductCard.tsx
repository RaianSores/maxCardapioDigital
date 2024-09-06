import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { formatPrice } from "../../utils/format";
import { FONTSIZE } from "../../theme/theme";

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
          resizeMode="cover"
        />
      );
    } else {
      return <Image
        source={defaultImage}
        style={styles.productCardPhoto}
        resizeMode="contain"
      />;
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
    display: "flex",
    backgroundColor: "#E0DCD9",
    borderRadius: 5,
    color: "#000",
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 6,
    gap: wp('1%'),
    maxHeight: hp('25%')
  },
  productCardPhoto: {
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 5,
    overflow: "hidden",
    height: hp('22%'),
    width: wp('13%'),
    maxWidth: wp('13%'),
    maxHeight: hp('22%'),
  },
  productCardInfor: {
    flex: 1,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    fontSize: FONTSIZE.size_14,
    color: "#46423F",
  },
  productCardTitle: {
    fontSize: FONTSIZE.size_18,
    fontWeight: "700",
    color: "#46423F",
  },
  productCardAbout: {
    flex: 1,
    fontSize: FONTSIZE.size_16,
    color: "#46423F",
  },
  priceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginRight: 10,
  },
  productCardPrice: {
    fontSize: FONTSIZE.size_18,
    fontWeight: 'bold',
    color: '#B3B6BB',
    marginRight: 8,

  },
  priceDiscount: {
    fontSize: FONTSIZE.size_18,
    textDecorationLine: 'line-through',
    color: '#52555A',
  },
  priceFinal: {
    fontWeight: "bold",
    fontSize: FONTSIZE.size_24,
    color: "#46423F",
  },
});

export default ProductCard;
