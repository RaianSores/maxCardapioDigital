// CartScreen.tsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { getItemsMesa } from "../services/contaService"; // Importe corretamente a função

const CartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [cartItems, setCartItems] = useState<any[]>([]); // Defina o tipo de cartItems como um array de any
  const [numeroMesa, setNumeroMesa] = useState<number | null>(null); // Estado para armazenar o número da mesa
  const [totalPedido, setTotalPedido] = useState<number>(0);
  const [totalServico, setTotalServico] = useState<number>(0);
  const [totalCouvert, setTotalCouvert] = useState<number>(0);
  const [totalFinal, setTotalFinal] = useState<number>(0);

  useEffect(() => {
    fetchNumeroMesa();
  }, []);

  useEffect(() => {
    if (numeroMesa !== null) {
      fetchCartItems(numeroMesa); // Chama fetchCartItems com o número da mesa quando disponível
    }
  }, [numeroMesa]);

  useEffect(() => {
    calcularTotais();
  }, [cartItems]);

  const fetchNumeroMesa = async () => {
    try {
      const mesa = await AsyncStorage.getItem("numMesa");
      if (mesa !== null) {
        setNumeroMesa(parseInt(mesa, 10)); // Converte para número e atualiza o estado
      } else {
        console.error("Número da mesa não encontrado no AsyncStorage");
      }
    } catch (error) {
      console.error("Erro ao carregar número da mesa:", error);
    }
  };

  const fetchCartItems = async (numeroMesa: number) => {
    try {
      const items = await getItemsMesa(numeroMesa); // Chama getItemsMesa com o número da mesa
      setCartItems(items);
    } catch (error) {
      console.error("Erro ao carregar itens da mesa:", error);
    }
  };

  // Função para renderizar a imagem de acordo com o item
  const renderItemImage = (item: any) => {
    if (item.imagem) {
      return (
        <Image
          source={{ uri: `data:image/png;base64,${item.imagem}` }}
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

  const calcularTotais = () => {
    let pedido = 0;
    let servico = 0;
    let couvert = 0;
    let final = 0;

    cartItems.forEach((item) => {
      pedido += item.valorTotal * item.qtde; // Somando o valor total de cada item
      // Aqui você pode adicionar lógica para calcular serviço e couvert se aplicável
    });

    setTotalPedido(pedido);
    setTotalServico(servico);
    setTotalCouvert(couvert);
    setTotalFinal(final);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.actionCardHeader}>
        <Text style={styles.actionCardHeaderTitle}>Minha Conta | </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.actionCardBack}>Voltar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.actionCard}>
        <ScrollView
          style={styles.actionCardContent}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          {cartItems.map((item, index) => (
            <View key={index} style={styles.actionCardInvoiceTableRow}>
              <View style={styles.tableCol}>{renderItemImage(item)}</View>
              <View
                style={[styles.tableCol, styles.actionCardInvoiceTableTitle]}
              >
                <Text>{item.descricaoProd}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text> {formatCurrency(item.valorTotal)}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>x {item.qtde}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text>{formatCurrency(item.valorTotal * item.qtde)}</Text>
              </View>
            </View> /** */
          ))}
        </ScrollView>
        <View style={styles.actionCardInvoiceFooter}>
          <View style={styles.actionCardInvoiceFooterSum}>
            <Text style={styles.title}>Total Pedido: </Text>
            <Text style={styles.price}>
              {formatCurrency(totalPedido.toFixed(2))}
            </Text>
          </View>
          <View style={styles.actionCardInvoiceFooterService}>
            <Text style={styles.title}>+Serviço: </Text>
            <Text style={styles.price}>{totalServico.toFixed(2)}</Text>
          </View>
          <View style={styles.actionCardInvoiceFooterCouvert}>
            <Text style={styles.title}>+Couvert: </Text>
            <Text style={styles.price}>{totalCouvert.toFixed(2)}</Text>
          </View>
          <View style={styles.actionCardInvoiceFooterTotal}>
            <Text style={styles.title}>Total final: </Text>
            <Text style={styles.price}>
              {formatCurrency(totalPedido.toFixed(2))}
            </Text>
          </View>
          <TouchableOpacity style={styles.btnPrimary}>
            <Icon
              name="money"
              size={20}
              color="#fff"
              style={{ marginRight: 5 }}
            />
            <Text style={styles.btnText}>Fechar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    alignItems: "center",
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
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
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
