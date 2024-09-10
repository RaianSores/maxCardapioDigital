import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Header/Header";
import { IProdutosAdditional, IProdutosOptions, Produto } from "../../@types/Produto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import showToast from "../../utils/ToastUtil";
import { formatPrice } from "../../utils/format";
import { CartContext } from "../../Context/CartContext";
import { styles } from "./styles";

import RenderAdditionals from "../../components/Additionals/Additionals";
import { AdditionalContext } from "../../Context/AdditionalContext";
import RenderOptions from "../../components/Optional/Optional";

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
  const { setCartItems } = useContext(CartContext);
  const {
    additionalData,
    fetchDataAdditional,
    fetchDataOptional,
    additionalCounters,
    setAdditionalCounters,
    optionsData,
  } = useContext<any>(AdditionalContext);
  const [totalPrice, setTotalPrice] = useState(product.valorPromocao || product.valorVenda);

  useEffect(() => {
    fetchDataAdditional(product.proId);
    fetchDataOptional(product.proId);
  }, [product.proId]);

  // Função para calcular o total dos adicionais
  const calculateTotalWithAdditionals = () => {
    let additionalTotal = 0;

    if (additionalData && additionalData.length > 0) {
      additionalData.forEach((item: IProdutosAdditional) => {
        const count = additionalCounters[item.faId] || 0;
        additionalTotal += count * item.faPrecoVenda; // Multiplica a quantidade pelo preço do adicional
      });
    };

    // Soma o preço base do produto com o total dos adicionais
    const finalPrice = ((product.valorPromocao || product.valorVenda) * quantity) + additionalTotal;
    setTotalPrice(finalPrice);
  };

  useEffect(() => {
    calculateTotalWithAdditionals();
  }, [additionalCounters, product, quantity]);

  // Função para adicionar ao carrinho o produto e os adicionais
  const addToCart = async ({ productId, quantity, price, description, image }: any) => {
    // Criando o array de adicionais selecionados
    const selectedAdditionals = additionalData
      .filter((item: IProdutosAdditional) => additionalCounters[item.faId] > 0) // Filtra os adicionais com quantidade maior que 0
      .map((item: IProdutosAdditional) => ({
        faId: item.faId,
        faQtde: additionalCounters[item.faId],
        faPrecoVenda: item.faPrecoVenda,
        faDescricao: item.faDescricao,
      }));

    const optionalsDetails = optionsData
      .filter((optionals: IProdutosOptions) => optionals.isSelected)
      .map((optionals: IProdutosOptions) => ({
        foId: optionals.foId,
        foDescricao: optionals.foDescricao,
        isSelected: optionals.isSelected,
      }));

    const newItem = {
      id: productId,
      quantity,
      price,
      description,
      image,
      additionals: selectedAdditionals,
      optionals: optionalsDetails,
    };

    try {
      const existingItems = await AsyncStorage.getItem("cartItems");
      let cartItems = existingItems ? JSON.parse(existingItems) : [];
      cartItems.push(newItem);
      await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
      setCartItems(cartItems);
      setAdditionalCounters({});
      showToast("Item adicionado ao carrinho!", "success");
      await navigation.navigate("Home");
    } catch (error) {
      showToast("Erro ao adicionar item ao carrinho!", "error");
    }
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const defaultImage = require("../../assets/img/sem-foto.jpg");

  const renderImage = () => (
    <>
      <Image
        source={product.imagem ? { uri: `data:image/png;base64,${product.imagem}` } : defaultImage}
        style={styles.productImage}
      />
      <View>
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
                quantity,
                price: !product.valorPromocao ? product.valorVenda : product.valorPromocao,
                description: product.descricao,
                image: product.imagem,
              })
            }
          >
            <Icon name="thumbs-up" size={28} color="#fff" style={styles.icon} />
            <Text style={styles.orderText}>Pedir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

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
              {/* Parte não rolável */}
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={styles.contentInfoTitle}>{product.descricao}</Text>
                <View style={styles.contentInfoPrice}>
                  <Text style={styles.priceFinal}>
                    {formatPrice(totalPrice)}
                  </Text>
                </View>
              </View>
              <Text style={styles.contentInfoAbout}>{product.proMsg}</Text>

              <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                {/* Parte rolável */}
                {additionalData && additionalData.length > 0 ? (
                  <>
                    <Text style={styles.contentInfoTitle}>Produtos Adicionais:</Text>
                    <FlashList
                      data={additionalData}
                      renderItem={({ item }: { item: IProdutosAdditional }) => (
                        <RenderAdditionals item={item} />
                      )}
                      keyExtractor={(item, index) =>
                        item && item.faId ? item.faId.toString() : index.toString()
                      }
                      contentContainerStyle={{ padding: 5 }}
                      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
                      numColumns={1}
                      estimatedItemSize={200}
                    />
                  </>
                ) : (
                  <></>
                )}

                {optionsData && optionsData.length > 0 ? (
                  <>
                    <Text style={styles.contentInfoTitle}>Opcionais:</Text>
                    <FlashList
                      data={optionsData}
                      renderItem={({ item }: { item: IProdutosOptions }) => (
                        <RenderOptions item={item} />
                      )}
                      keyExtractor={(item, index) =>
                        item && item.foId ? item.foId.toString() : index.toString()
                      }
                      contentContainerStyle={{ padding: 5 }}
                      ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
                      numColumns={1}
                      estimatedItemSize={200}
                    />
                  </>
                ) : (
                  <></>
                )}
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductScreen;
