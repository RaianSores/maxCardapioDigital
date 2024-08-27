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
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import LottieView from 'lottie-react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import Header from "../../components/Header/Header";
import { formatPrice } from "../../utils/format";
import { CartContext } from "../../Context/CartContext";
import { solicitarConta } from "../../services/vendaService";
import { IRequestAccount } from "../../@types/Venda";
import * as Icons from 'react-native-feather';
import showToast from "../../utils/ToastUtil";
import { COLORS, FONTSIZE } from '../../theme/theme';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "./styles";

const MyAccountScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    cartItems,
    setCartItems,
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
    setIsLoading(true);
    fetchNumeroMesa();
    if (numeroMesa !== null) {
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
          source={require("../../assets/img/sem-foto.jpg")}
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
    <Modal visible={showModal} animationType="fade" transparent={true}>
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
              textAlign: 'center',
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
              source={require("../../lottie/MaxData.json")}
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
                    refreshing={refreshing}
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

export default MyAccountScreen;
