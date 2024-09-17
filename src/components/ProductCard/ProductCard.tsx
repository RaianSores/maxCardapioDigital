import React from "react";
import { View, Text, Image } from "react-native";
import { formatPrice } from "../../utils/format";
import { styles } from "./styles";

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

export default ProductCard;
