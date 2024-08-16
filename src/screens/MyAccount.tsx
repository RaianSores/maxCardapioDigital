import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
  Dimensions,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import LottieView from 'lottie-react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from "../components/Header/Header";
import { formatPrice } from "../utils/format";
import { CartContext } from "../Context/CartContext";
import { solicitarConta } from "../services/vendaService";
import { IRequestAccount } from "../@types/Venda";
import * as Icons from 'react-native-feather';
import showToast from "../utils/ToastUtil";
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    cartItems,
    totalPedido,
    totalServico,
    numeroMesa,
    antecipacao,
    calcularTotais,
    fetchCartItems,
    fetchNumeroMesa,
    setAntecipacao,
  } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { fetchUserData } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    calcularTotais();
  }, [cartItems]);

  async function init() {
    fetchNumeroMesa();
    if (numeroMesa !== null) {
      setIsLoading(true);
      fetchCartItems(numeroMesa);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  async function solicitaContaClick() {
    try {
      fetchUserData();
      const idVendedor = await AsyncStorage.getItem("idVendedor");
      const foodVenda: IRequestAccount = {
        numero: numeroMesa!,
        tipo: 'M',
        atendente: parseInt(idVendedor!),
      };

      await solicitarConta(foodVenda);
      showToast("Conta solicitada com sucesso!", 'success');
      setTimeout(async () => {
        await navigation.navigate('Home');
      }, 1800);
    } catch (error) {
      showToast("Erro ao solicitar conta!", 'error');
    }
  };

  async function handlePaymentClick() {
    try {
      await navigation.navigate('Payment')
    } catch (error) {
      showToast("Erro ao solicitar conta!", 'error');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (showModal && antecipacao !== '') {
      handlePaymentClick();
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

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
          resizeMode="contain"
        />
      );
    }
  };

  const renderCartItem = ({ item }: { item: any }) => {
    return (
      <>
        <View style={styles.actionCardInvoiceTableRow}>
          <View style={styles.tableCol}>{renderItemImage(item)}</View>
          <View
            style={[
              styles.tableColLeft,
              styles.actionCardInvoiceTableTitle,
            ]}
          >
            <Text style={styles.regTable}>{item.descricaoProd}</Text>
          </View>
          <View style={styles.tableColRigth}>
            <Text style={styles.regTable}>
              {formatPrice(item.valorTotal)}
            </Text>
          </View>
          <View style={styles.tableColRigth}>
            <Text style={styles.regTable}>x {item.qtde}</Text>
          </View>
          <View style={styles.tableColRigth}>
            <Text style={styles.regTable}>
              {formatPrice(item.valorTotal * item.qtde)}
            </Text>
          </View>
        </View>
      </>
    )
  };

  const renderModal = () => (
    <Modal visible={showModal} animationType="fade" transparent={true} >
      <View style={styles.ModalContainer}>
        <View style={styles.ModalContent}>
          <Text style={styles.ModalText}>Informe o Valor da Antecipação</Text>
          <TextInput
            value={antecipacao}
            onChangeText={setAntecipacao}
            maxLength={14}
            keyboardType="numeric"
            placeholder="0,00"
            style={{
              fontSize: FONTSIZE.size_30,
              color: COLORS.primaryWhiteHex,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          />

          <View style={styles.ModalContainerButton}>
            <View style={styles.ModalButtonCancelar}>
              <TouchableOpacity onPress={() => {
                setAntecipacao('');
                closeModal();
              }}>
                <Text style={styles.ModalTextButton}>Cancelar</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ModalButtonConfirmar}>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.ModalTextButton}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.actionCardHeader}>
          <Text style={styles.actionCardHeaderTitle}>Minha Conta | </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.actionCardBack}>Voltar</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <>
            <LottieView
              source={require("../lottie/MaxData.json")}
              autoPlay
              loop
              style={{ flex: 1, width: 250, height: 250, alignSelf: 'center' }}
            />
          </>
        ) : (
          <>
            <View style={styles.actionCard}>
              {cartItems.length > 0 ? (
                <>
                  <FlashList
                    data={cartItems}
                    renderItem={renderCartItem}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={() => fetchCartItems(numeroMesa!)} />
                    }
                    estimatedItemSize={50}
                    contentContainerStyle={styles.flashListContentContainer}
                  />
                  <View style={styles.actionCardInvoiceFooter}>
                    <View style={styles.actionCardInvoiceFooterSum}>
                      <Text style={styles.title}>Total Pedido: </Text>
                      <Text style={styles.price}>
                        {formatPrice(totalPedido)}
                      </Text>
                    </View>
                    <View style={styles.actionCardInvoiceFooterService}>
                      <Text style={styles.title}>+Serviço: </Text>
                      <Text style={styles.price}>{formatPrice(totalServico)}</Text>
                    </View>
                    <View style={styles.actionCardInvoiceFooterTotal}>
                      <Text style={styles.title}>Total final: </Text>
                      <Text style={styles.price}>
                        {formatPrice(totalPedido)}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setAntecipacao('');
                        openModal()
                      }}
                      style={styles.btnSecondary}
                    >
                      <Icon
                        name="qrcode"
                        size={25}
                        color="#fff"
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.btnText}>Antecipação PIX</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => solicitaContaClick()}
                      style={styles.btnPrimary}
                    >
                      <Icons.CheckSquare
                        strokeWidth={2}
                        height={25}
                        width={30}
                        stroke="#FFF"
                        style={{ marginRight: 5 }}
                      />
                      <Text style={styles.btnText}>Pedir Conta</Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{
                      fontSize: 34,
                      fontWeight: "bold",
                      color: "#46423F",
                    }}>Mesa vázia!</Text>
                  </View>
                </>
              )}
            </View>
          </>
        )}
        {showModal && (renderModal())}
      </SafeAreaView>
    </>
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
    fontSize: 20,
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    padding: 10,
    width: wp('15%'),
    height: hp('10%'),
    borderRadius: 5,
    alignItems: "center",
    flexDirection: "row",
  },
  btnSecondary: {
    backgroundColor: '#03A371',
    padding: 10,
    width: wp('18%'),
    height: hp('10%'),
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
  btnSubText: {
    color: "#fff",
    fontSize: 18,
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
  flashListContentContainer: {
    padding: 10,
    paddingLeft: 0,
  },
  ModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo semi-transparente
    width: '100%',
    height: '100%',
  },
  ModalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryDarkGreyHex,
    padding: 20,
    borderRadius: 10,
    width: hp('80%'), // Largura do modal em relação à tela
    height: hp('35%'),
  },
  ModalContainerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20
  },
  ModalButtonCancelar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryRedHex,
    width: wp('15%'),
    height: hp('10%'),
    borderRadius: 5,
  },
  ModalButtonConfirmar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryGreenHex,
    width: wp('15%'),
    height: hp('10%'),
    borderRadius: 5,
  },
  ModalText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: "bold",
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  ModalTextButton: {
    fontWeight: "bold",
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryWhiteHex,
  },
});

export default CartScreen;
