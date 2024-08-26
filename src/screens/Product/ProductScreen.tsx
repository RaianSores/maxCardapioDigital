import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Header/Header";
import { Produto } from "../../@types/Produto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../../utils/ToastUtil";
import { formatPrice } from "../../utils/format";
import { CartContext } from "../../Context/CartContext";
import { styles } from "./styles";

interface ProductScreenProps {
  route: {
    params: {
      product: Produto;
    };
  };
  navigation: any;
}

const ProductScreen: React.FC<ProductScreenProps> = ({ route, navigation }) => {
  const { product } = route.params;
  const [quantity, setQuantity] = useState(1);
  const { cartItems, setCartItems } = useContext(CartContext);

  const addToCart = async ({ productId, quantity, price, description, image }: any) => {
    const newItem = {
      id: productId,
      quantity: quantity,
      price: price,
      description: description,
      image: image,
    };

    try {
      const existingItems = await AsyncStorage.getItem("cartItems");
      let cartItems = existingItems ? JSON.parse(existingItems) : [];

      cartItems.push(newItem);

      await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));

      setCartItems(cartItems);
      showToast("Item adicionado ao carrinho!", 'success');
      await navigation.navigate("Home");
    } catch (error) {
      showToast("Erro ao adicionar item ao carrinho!", 'error');
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const defaultImage = require("../../assets/img/sem-foto.jpg");

  const renderImage = () => {
    if (product.imagem) {
      return (
        <Image
          source={{ uri: `data:image/png;base64,${product.imagem}` }}
          style={styles.productImage}
        />
      );
    } else {
      return <Image source={defaultImage} style={styles.productImage} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.actionCardHeader}>
        <TouchableOpacity
          style={styles.actionCardBack}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionCard}>
        <View style={styles.actionCardContent}>
          <View style={styles.actionCardShowProduct}>
            <View style={styles.actionCardContentImg}>{renderImage()}</View>
            <View style={styles.actionCardContentInfo}>
              <Text style={styles.contentInfoTitle}>{product.descricao}</Text>
              <Text style={styles.contentInfoAbout}>{product.proMsg}</Text>
              <View style={styles.contentInfoPrice}>

                <Text style={styles.priceFinal}>
                  {formatPrice(!product.valorPromocao ? product.valorVenda : product.valorPromocao)}
                </Text>
              </View>
              <View style={styles.contentInfoActions}>
                <View style={styles.inputQtd}>
                  <TouchableOpacity
                    onPress={decreaseQuantity}
                    style={styles.quantityButtonLeft}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    keyboardType="numeric"
                    value={String(quantity)}
                    onChangeText={(text) => setQuantity(Number(text))}
                    editable={false}
                  />
                  <TouchableOpacity
                    onPress={increaseQuantity}
                    style={styles.quantityButtonRight}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.buttonOrder}
                  onPress={() =>
                    addToCart({
                      productId: product.proId,
                      quantity: quantity,
                      price: !product.valorPromocao ? product.valorVenda : product.valorPromocao,
                      description: product.descricao,
                      image: product.imagem,
                    })
                  }
                >
                  <Icon
                    name="thumbs-up"
                    size={35}
                    color="#fff"
                    style={styles.icon}
                  />
                  <Text style={styles.orderText}>Pedir</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;
