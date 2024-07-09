import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { Venda, VendaItem } from "./interfaces/Venda";
import { sendVenda } from "../services/vendaService";

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [numMesa, setNumMesa] = useState(""); // Estado para numMesa
  const [empId, setEmpId] = useState(""); // Estado para empId
  const [atendente, setAtendente] = useState(""); // Estado para atendente
  useEffect(() => {
    fetchCartItems();
    fetchUserData();
  }, []);
  const fetchUserData = async () => {
    try {
      // Busca os dados do usuário/atendente no AsyncStorage
      const numMesa = await AsyncStorage.getItem("numMesa");
      const empId = await AsyncStorage.getItem("empId");
      const atendente = await AsyncStorage.getItem("atendente");

      // Atualiza o estado com os valores obtidos
      setNumMesa(numMesa || ""); // Se numMesa não existir no AsyncStorage, seta como string vazia
      setEmpId(empId || ""); // Se empId não existir no AsyncStorage, seta como string vazia
      setAtendente(atendente || ""); // Se atendente não existir no AsyncStorage, seta como string vazia
    } catch (error) {
      console.error("Erro ao carregar dados do usuário/atendente:", error);
    }
  };
  const fetchCartItems = async () => {
    try {
      // Lógica para obter os itens do carrinho
      const items = await AsyncStorage.getItem("cartItems");
      if (items) {
        await setCartItems(JSON.parse(items));
      }

      //console.log(cartItems);
    } catch (error) {
      console.error("Erro ao carregar itens do carrinho:", error);
    }
  };

  const clearCart = async () => {
    try {
      setIsLoading(true);
      await AsyncStorage.removeItem("cartItems");
      await fetchCartItems();
      await navigation.navigate("Home");
    } catch (error) {
      console.error("Erro ao limpar o carrinho:", error);
    } finally {
      setIsLoading(false); // Desativa o indicador de carregamento
    }
  };

  async function enviaDadosVenda(vendaData: Venda) {
    try {
      await sendVenda(vendaData);
      console.log("Dados da venda enviados com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar dados da venda:", error);
    } finally {
      setIsLoading(false); // Desativa o indicador de carregamento
    }
  }

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.valorTotal, 0)
      .toFixed(2);
  };

  const captaInfoVenda = async () => {
    setIsLoading(true);
    const jsonCart = await AsyncStorage.getItem("cartItems");
    const cart = jsonCart != null ? JSON.parse(jsonCart) : { itens: [] };

    // Verifica se cart.itens existe e tem pelo menos um item
    const vlrTotalLiqProd =
      cart.itens && cart.itens.length > 0
        ? cart.itens.reduce((total, item) => total + item.valorTotal, 0)
        : 0;

    const itensVenda: VendaItem[] = cart.map((item) => ({
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

    const orderJson = {
      numMesa: numMesa,
      operador: 1,
      tipo: "",
      venda: {
        id: 0,
        clienteId: 1,
        tipo: "VE",
        atendente: atendente || 1,
        status: "tpMesa",
        abertura: "",
        cfop: 5102,
        cliNome: "CONSUMIDOR",
        cpf: "",
        totalNf: null,
        msg: "",
        vlrTotalLiqProd: vlrTotalLiqProd,
        consumidorFinal: true,
        empId: empId || 1,
        itens: itensVenda,
      },
    };

    console.log(orderJson);
    console.log(itensVenda);

    await enviaDadosVenda(orderJson);
    await clearCart();
  };

  const renderItemImage = (item) => {
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
          source={require("../assets/img/sem-foto.jpg")}
          style={styles.invoiceImage}
        />
      );
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      currencyDisplay: "symbol", // 'symbol' é o padrão, exibe o símbolo da moeda
      minimumFractionDigits: 2, // opcional: define a quantidade mínima de dígitos após o ponto decimal
    })
      .format(value)
      .replace("R$", ""); // remove explicitamente o símbolo 'R$'
  };

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}
      <Header navigation={navigation} />
      <View style={styles.actionCardHeader}>
        <Text style={styles.actionCardHeaderTitle}>Meu Carrinho | </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.actionCardBack}>Voltar</Text>
        </TouchableOpacity>
      </View>

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
              source={require("../assets/carrinho.png")}
              style={styles.emptyCartImage}
            />
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
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
            {cartItems.map((item, index) => (
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
                <View style={styles.tableCol}>
                  <Text style={styles.regTable}>
                    {formatCurrency(item.price)}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.regTable}>x {item.quantity}</Text>
                </View>
                <View style={styles.tableColRigth}>
                  <Text style={styles.regTable}>
                    {formatCurrency(item.price * item.quantity)}
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
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // Fundo semi-transparente
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1, // Certifica que a overlay está sobre os outros componentes
  },
  regTable: {
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyCartImage: {
    width: 200,
    height: 200,
  },
  container: {
    flex: 1,
    backgroundColor: "#3E3E3E",
  },
  actionCard: {
    flex: 1,
    backgroundColor: "#ddd",
    borderRadius: 10,
    padding: 20,
    margin: 20,
  },
  actionCardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
  },
  actionCardBack: {
    color: "#ffa500",
    fontWeight: "bold",
    fontSize: 20,
  },
  actionCardHeaderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#A2A4A3",
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: 50,
    height: 50,
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
    fontSize: 16,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
  },
  btnPrimary: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  btnDanger: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
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
