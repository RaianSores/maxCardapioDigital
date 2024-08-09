import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../components/Header/Header";
import { Produto } from "../@types/Produto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../utils/ToastUtil";
import { formatPrice } from "../utils/format";
import { CartContext } from "../Context/CartContext";

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

  const defaultImage = require("../assets/img/sem-foto.jpg");

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3E3E3E",
  },
  actionCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  actionCardBack: {
    marginRight: 10,
    color: "#F38321",
  },
  backText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F38321",
  },
  actionCard: {
    backgroundColor: "#E0DCD9",
    padding: 20,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  actionCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionCardShowProduct: {
    flexDirection: "row",
  },
  actionCardContentImg: {
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 300,
    height: 350,
    marginRight: 10,
    borderRadius: 10,
  },
  actionCardContentInfo: {},
  contentInfoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#363539",
    marginBottom: 10,
  },
  contentInfoAbout: {
    fontSize: 16,
    marginBottom: 10,
    flexWrap: "wrap",
    width: "100%",
    height: 70,
    color: "#363539",
  },
  contentInfoPrice: {
    flexDirection: "column",
    marginBottom: 20,
    height: 127,
    color: "#363539",
  },
  priceDiscount: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "red",
    opacity: 0.8,
    display: "none",
  },
  priceFinal: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#363539",
  },
  contentInfoActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 0,
    width: "79%",
  },
  inputQtd: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButtonLeft: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4E4D4B",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  quantityButtonRight: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4E4D4B",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  quantityButtonText: {
    fontSize: 45,
    color: "#fff",
  },
  quantityInput: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#3E3E3E",
    width: 80,
    height: 80,
    fontSize: 26,
    fontWeight: 'bold',
  },
  buttonOrder: {
    backgroundColor: "#F38321",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginLeft: "auto",
  },
  orderText: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
});

export default ProductScreen;
