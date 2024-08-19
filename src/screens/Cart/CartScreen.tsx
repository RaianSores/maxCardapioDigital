import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LottieView from 'lottie-react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from "../../components/Header/Header";
import { Venda, VendaItem } from "../../@types/Venda";
import { sendVenda } from "../../services/vendaService";
import showToast from "../../utils/ToastUtil";
import { formatPrice } from "../../utils/format";
import { CartContext } from "../../Context/CartContext";
import { FONTSIZE } from "../../theme/theme";

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
      showToast("Dados da venda enviados com sucesso!", 'success');
    } catch (error) {
      showToast("Erro ao enviar dados da venda!", 'error');
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

    const itensVenda: VendaItem[] = cart.map((item: any) => ({
      vendaId: 0,
      codProduto: item.id,
      cfop: 5102,
      qtde: item.quantity,
      valor: item.price,
      descricaoProd: item.description,
      valorTotal: item.price * item.quantity,
      status: "A",
      data: new Date().toISOString(),
      un: "UN",
      desconto: item.desconto || 0,
    }));

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
                    fontSize: 25,
                    fontWeight: "bold",
                    color: "#46423F",
                  }}
                >
                  seu carrinho está vazio :(
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.actionCard}>
              <ScrollView
                style={styles.actionCardContent}
                contentContainerStyle={{ paddingBottom: 60 }}
              >
                {cartItems.map((item: any, index) => (
                  <View key={index} style={styles.actionCardInvoiceTableRow}>
                    <View style={styles.tableCol}>{renderItemImage(item)}</View>
                    <View
                      style={[
                        styles.tableColLeft,
                        styles.actionCardInvoiceTableTitle,
                      ]}
                    >
                      <Text style={styles.regTable}>{item.description}</Text>
                    </View>
                    <View style={styles.tableColRigth}>
                      <Text style={styles.regTable}>
                        {formatPrice(item.price)}
                      </Text>
                    </View>
                    <View style={styles.tableColRigth}>
                      <Text style={styles.regTable}>x {item.quantity}</Text>
                    </View>
                    <View style={styles.tableColRigth}>
                      <Text style={styles.regTable}>
                        {formatPrice(item.price * item.quantity)}
                      </Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3E3E3E",
  },
  actionCardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    marginTop: wp('2%'),
  },
  actionCardHeaderTitle: {
    fontSize: FONTSIZE.size_20,
    fontWeight: "bold",
    color: "#A2A4A3",
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: hp('2%'),
    margin: wp('2%'),
  },
  regTable: {
    fontSize: FONTSIZE.size_18,
    fontWeight: "bold",
    color: "#363539",
    marginLeft: hp('1%'), 
  },
  emptyCartImage: {
    width: hp('40%'),
    height: wp('20%'),
  },
  actionCardBack: {
    color: "#ffa500",
    fontWeight: "bold",
    fontSize: FONTSIZE.size_20,
  },
  actionCardContent: {
    flex: 1,
  },
  actionCardInvoiceTableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#696969",
    marginBottom: 8,
  },
  tableCol: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: hp('1%'),
  },
  tableColLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  tableColRigth: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  actionCardInvoiceTableTitle: {
    flex: 2,
  },
  invoiceImage: {
    width: hp('10%'),
    height: wp('5%'),
    borderRadius: 5,
  },
  actionCardInvoiceFooter: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    flexDirection: "row", // Altera o layout para linha
    alignItems: "center", // Alinha os itens verticalmente
    justifyContent: "space-between", // Distribui espaço uniformemente
  },
  title: {
    fontSize: FONTSIZE.size_16,
    color: "#46423F",
  },
  price: {
    fontSize: FONTSIZE.size_20,
    fontWeight: "bold",
    color: "#46423F",
  },
  btnPrimary: {
    backgroundColor: '#F38321',
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  btnDanger: {
    backgroundColor: "#3E3E3E",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  btnText: {
    color: "#fff",
    fontSize: FONTSIZE.size_20,
    fontWeight: "bold",
  },
  actionCardInvoiceFooterSum: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCardInvoiceFooterService: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCardInvoiceFooterCouvert: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCardInvoiceFooterTotal: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CartScreen;
