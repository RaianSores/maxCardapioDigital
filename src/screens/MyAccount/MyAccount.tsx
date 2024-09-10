import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Modal,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import LottieView from 'lottie-react-native';
import * as Icons from 'react-native-feather';
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../../components/Header/Header";
import { formatPrice } from "../../utils/format";
import { CartContext } from "../../Context/CartContext";
import { solicitarConta } from "../../services/vendaService";
import { IRequestAccount } from "../../@types/Venda";
import showToast from "../../utils/ToastUtil";
import { styles } from "./styles";
import { getConfiguracoes } from "../../services/configService";

const MyAccountScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    cartItems,
    totalPedido,
    desconto,
    totalServico,
    numeroMesa,
    totalFinal,
    antecipacao,
    calcularTotais,
    fetchCartItems,
    temContaMaxDigital,
    setTemContaMaxDigital,
    setAntecipacao,
    setTaxaServico
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
    fetchConfiEmp();
    const mesa = await AsyncStorage.getItem("numMesa");
    if (mesa !== null) {
      fetchCartItems(parseInt(mesa));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }

  const fetchConfiEmp = async () => {
    try {
      const data = await getConfiguracoes();
      setTemContaMaxDigital(data.TemContaMaxDigital);
      setTaxaServico(data.TaxaServico);
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
    }
  }

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
  }

  async function handlePaymentClick() {
    try {
      await navigation.navigate('Payment');
    } catch (error) {
      showToast("Erro ao solicitar conta!", 'error');
    }
  }

  const closeModal = () => {
    setShowModal(false);
    if (showModal && antecipacao !== '') {
      handlePaymentClick();
    }
  }

  const openModal = () => {
    setShowModal(true);
  }

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
  }

  const renderCartItem = ({ item }: { item: any }) => {
    return (
      <>
        <View style={styles.actionCardInvoiceTableRow}>
          <View style={styles.tableCol}>{renderItemImage(item)}</View>
          <View style={[styles.tableColLeft, styles.actionCardInvoiceTableTitle]}>
            <Text style={styles.regTable}>{item.descricaoProd}</Text>
          </View>
          <View style={styles.tableColRigth}>
            <Text style={styles.regTable}>{formatPrice(item.valorTotal)}</Text>
          </View>
          <View style={styles.tableColRigth}>
            <Text style={styles.regTable}>x {item.qtde}</Text>
          </View>
          <View style={styles.tableColRigth}>
            <Text style={styles.regTable}>{formatPrice(item.valorLiquido)}</Text>
          </View>
        </View>
      </>
    );
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
              fontSize: 30,
              color: '#FFF',
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
          <View style={styles.mainContent}>
            <View style={styles.actionCard}>
              <View style={styles.actionCardHeaderList}>
              <View style={[
                  styles.tableColLeft,
                  styles.actionCardInvoiceTableTitle,
                ]}>
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
              {cartItems.length > 0 ? (
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
              ) : (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 34, fontWeight: "bold", color: "#46423F" }}>Mesa vázia!</Text>
                </View>
              )}
            </View>

            <View style={styles.actionPrice}>
              <Text style={styles.textSumary}>Resumo</Text>
              <View style={styles.lineItem}>
                <Text style={styles.title}>Total Pedido:</Text>
                <Text style={styles.price}>{formatPrice(totalPedido)}</Text>
              </View>
              <View style={styles.lineItem}>
                <Text style={styles.title}>+ Serviço:</Text>
                <Text style={styles.price}>{formatPrice(totalServico)}</Text>
              </View>
              <View style={styles.lineItem}>
                <Text style={styles.title}>- Desconto:</Text>
                <Text style={styles.price}>{formatPrice(desconto)}</Text>
              </View>
              <View style={styles.lineItem}>
                <Text style={styles.title}>Total Final:</Text>
                <Text style={styles.price}>{formatPrice(totalFinal)}</Text>
              </View>


              <View style={styles.containerBottom}>
                {temContaMaxDigital && (
                  <TouchableOpacity onPress={openModal} style={styles.btnSecondary}>
                    <Icon name="qrcode" size={30} color="#fff" />
                    <Text style={styles.btnText}>Antecipar PIX</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={solicitaContaClick} style={styles.btnPrimary}>
                  <Icons.CheckSquare strokeWidth={3} height={30} width={30} stroke="#FFF" />
                  <Text style={styles.btnText}>Pedir Conta</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {showModal && renderModal()}
      </SafeAreaView>
    </>
  );
};

export default MyAccountScreen;
