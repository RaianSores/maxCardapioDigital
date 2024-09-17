import React, {
  useState,
  useEffect,
  useContext
} from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LottieView from 'lottie-react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Venda, VendaItem } from "../../@types/Venda";
import Header from "../../components/Header/Header";
import { sendVenda } from "../../services/vendaService";
import showToast from "../../utils/ToastUtil";
import { formatPrice } from "../../utils/format";
import { CartContext } from "../../Context/CartContext";
import { styles } from "./styles";

const CartScreen = ({ navigation }: any) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchUserData, atendente, empId, numMesa } = useContext(CartContext);

  useEffect(() => {
    fetchCartItems();
    fetchUserData();
  }, []);

  const fetchCartItems = async () => {
    try {
      // Lógica para obter os itens do carrinho
      const items = await AsyncStorage.getItem("cartItems");
      if (items) {
        setCartItems(JSON.parse(items));
      }
    } catch (error) {
      showToast("Erro ao carregar itens do carrinho!", 'error');
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("cartItems");
      await fetchCartItems();
      await navigation.navigate("Home");
    } catch (error) {
      showToast("Erro ao limpar o carrinho!", 'error');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 780)
    }
  };

  async function enviaDadosVenda(vendaData: Venda) {
    try {
      await sendVenda(vendaData);
      showToast("Pedido enviado!", 'success');
    } catch (error) {
      showToast("Erro ao enviar pedido!", 'error');
    } finally {
      setIsLoading(false); // Desativa o indicador de carregamento
    }
  }

  const captaInfoVenda = async () => {
    setIsLoading(true);
    const jsonCart = await AsyncStorage.getItem("cartItems");
    const cart = jsonCart != null ? JSON.parse(jsonCart) : { itens: [] };

    // Verifica se cart.itens existe e tem pelo menos um item
    const vlrTotalLiqProd =
      cart.itens && cart.itens.length > 0
        ? cart.itens.reduce((total: number, item: any) => total + item.valorTotal, 0)
        : 0;

    const itensVenda: VendaItem[] = cart.map((product: any) => {
      const item: any = {
        vendaId: 0,
        codProduto: product.id,
        cfop: 5102,
        qtde: product.quantity,
        valor: product.price,
        descricaoProd: product.description,
        valorTotal: product.price * product.quantity,
        status: "A",
        data: new Date().toISOString(),
        un: "UN",
        desconto: product.desconto || 0,
      }

      if (product.additionals && product.additionals.length > 0) {
        item.adicional = product.additionals;
        item.infAdProd = 'ADD';
      }

      if (product.optionals && product.optionals.length > 0) {
        item.opcional = product.optionals;
      }

      return item;
    });

    const orderJson: Venda = {
      numMesa: numMesa,
      operador: 1,
      tipo: "",
      venda: {
        id: 0,
        clienteId: 1,
        tipo: "VE",
        atendente: atendente,
        status: "tpMesa",
        abertura: "",
        cfop: 5102,
        cliNome: "CONSUMIDOR",
        cpf: "",
        totalNf: vlrTotalLiqProd,
        msg: "",
        vlrTotalLiqProd: vlrTotalLiqProd,
        consumidorFinal: true,
        empId: empId || '1',
        itens: itensVenda,
      },
    };
    await enviaDadosVenda(orderJson);
    await clearCart();
  };

  const renderItemImage = (item: any) => {
    if (item.image) {
      return (
        <Image
          source={{ uri: `data:image/png;base64,${item.image}` }}
          style={styles.invoiceImage}
        />
      );
    } else {
      return (
        <Image
          source={require("../../assets/img/sem-foto.jpg")}
          style={styles.invoiceImage}
          resizeMode="contain"
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.actionCardHeader}>
        <Text style={styles.actionCardHeaderTitle}>Meu Carrinho | </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.actionCardBack}>Voltar</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <>
          <LottieView
            source={require("../../lottie/MaxData.json")}
            autoPlay
            loop
            style={{ flex: 1, width: 250, height: 250, alignSelf: 'center' }}
          />
        </>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <View style={styles.actionCard}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/carrinho.png")}
                  style={styles.emptyCartImage}
                />
                <Text
                  style={{
                    fontSize: 34,
                    fontWeight: "bold",
                    color: "#46423F",
                  }}
                >
                  Seu carrinho está vazio!
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.actionCard}>
              <View style={styles.actionCardHeaderList}>
                <View style={styles.tableColLeft}>
                  <Text style={styles.regTable}>Descrição</Text>
                </View>
                <View style={styles.tableColRigth}>
                  <Text style={styles.regTable}>Vlr Unit.</Text>
                </View>
                <View style={styles.tableColRigth}>
                  <Text style={styles.regTable}>Qtde</Text>
                </View>
                <View style={styles.tableColRigth}>
                  <Text style={styles.regTable}>Vlr Total</Text>
                </View>
              </View>
              <ScrollView
                style={styles.actionCardContent}
                contentContainerStyle={{ paddingBottom: 60 }}
              >
                {cartItems.map((item: any, index) => (
                  <View key={index} style={styles.actionCardInvoiceTableRow}>
                    <View style={styles.tableCol}>{renderItemImage(item)}</View> 
                    <View  style={[styles.tableColLeft, styles.actionCardInvoiceTableTitle]}>
                      <Text style={styles.regTable}>{item.description}</Text>
                    </View>
                    <View style={styles.tableColRigth}>
                      <Text style={styles.regTable}>{formatPrice(item.price)}</Text>
                    </View>
                    <View style={styles.tableColRigth}>
                      <Text style={styles.regTable}>x {item.quantity}</Text>
                    </View>
                    <View style={styles.tableColRigth}>
                      <Text style={styles.regTable}>{formatPrice(item.price * item.quantity)}</Text>
                    </View>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.actionCardInvoiceFooter}>
                <TouchableOpacity style={styles.btnDanger} onPress={clearCart}>
                  <Icon
                    name="close"
                    size={20}
                    color="#fff"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.btnText}>Limpar Carrinho</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnPrimary}
                  onPress={captaInfoVenda}
                >
                  <Icon
                    name="check"
                    size={20}
                    color="#fff"
                    style={{ marginRight: 5 }}
                  />
                  <Text style={styles.btnText}>Enviar Pedido</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default CartScreen;
