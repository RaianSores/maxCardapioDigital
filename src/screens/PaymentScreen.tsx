import React, { useEffect, useState, useContext } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import LottieView from 'lottie-react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { IPix, Venda } from '../@types/Venda';
import { CartContext } from '../Context/CartContext';
import { checkPaymentStatusPix, finalizaFoodVenda, generatePix } from '../services/vendaService';
import showToast from '../utils/ToastUtil';
import Header from '../components/Header/Header';
import { formatPrice } from '../utils/format';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IPixData {
    qrCode: string;
    e2e: string;
    expiracao: string;
    txId: string;
};

interface IPaymentStatusData {
    canceladaPeloUsuario: string;
    canceladaPeloPSP: string;
    naoPago: string;
    concluida: string;
};

let paymentTimer: NodeJS.Timeout | null = null;

const PaymentScreen: React.FC = () => {
    const navigation = useNavigation();
    const {
        totalPedido,
        empId,
        totalServico,
        cartItems,
        antecipacao
    } = useContext(CartContext);
    const [pixData, setPixData] = useState<IPixData>({
        qrCode: '',
        e2e: '',
        expiracao: '',
        txId: '',
    });
    const [paymentStatus, setPaymentStatus] = useState<IPaymentStatusData>({
        canceladaPeloUsuario: '',
        canceladaPeloPSP: '',
        naoPago: '',
        concluida: '',
    });

    useEffect(() => {
        paymentGeneratePix();
    }, []);

    useEffect(() => {
        if (pixData.txId) {
            paymentTimer = setInterval(handlePaymentStatusPix, 3000);
        }
        return () => clearPaymentTimer();
    }, [pixData.txId]);

    function clearPaymentTimer() {
        if (paymentTimer) {
            clearInterval(paymentTimer);
            paymentTimer = null;
        };
    };

    async function handlePayment(totalPrice: number, paymentMethod: string) {
        const idEmpresa = await AsyncStorage.getItem("idEmpresa");
        const idVendedor = await AsyncStorage.getItem("idVendedor");
        const numMesa = await AsyncStorage.getItem("numMesa");
        if (idEmpresa && idVendedor && numMesa) {
            const foodVenda: Venda = {
                numMesa: numMesa,
                operador: parseInt(idVendedor),
                tipo: "M",
                venda: {
                    //id: 1,
                    clienteId: 1,
                    tipo: "VE",
                    atendente: parseInt(idVendedor),
                    cliNome: 'CONSUMIDOR',
                    cpf: '11111111111',
                    msg: "",
                    consumidorFinal: true,
                    empId: idEmpresa,
                    status: parseInt(antecipacao) === totalPrice ? 'F' : 'A',
                    pagamentos: [{
                        valor: parseInt(antecipacao),
                        formaPgto: paymentMethod,
                    }]
                },
            };

            await finalizaFoodVenda(foodVenda);
            showToast('Pagamento realizado com sucesso!', 'success');
            navigation.navigate('Home');
        }
    };

    async function handlePaymentStatusPix() {
        try {

            const pixStatus = await checkPaymentStatusPix(pixData.txId);
            switch (pixStatus.statusCobranca) {
                case 'concluida':
                    setPaymentStatus({ ...paymentStatus, concluida: pixStatus.statusCobranca });
                    await handlePayment(parseInt(antecipacao), 'pgPix');
                    clearPaymentTimer();
                    break;
                case 'canceladaPeloUsuario':
                    setPaymentStatus({ ...paymentStatus, canceladaPeloUsuario: pixStatus.statusCobranca });
                    clearPaymentTimer();
                    break;
                case 'canceladaPeloPSP':
                    setPaymentStatus({ ...paymentStatus, canceladaPeloPSP: pixStatus.statusCobranca });
                    clearPaymentTimer();
                    break;

            }
        } catch (error) {
            clearPaymentTimer();
            showToast('Erro ao verificar status do pagamento!', 'error');
        }
    };

    function hasExpired(expirationDate: string): boolean {
        const expirationTimestamp = Date.parse(expirationDate); // Transforma a data de expiração em um timestamp
        const currentTimestamp = Date.now(); // Obtém o timestamp atual
        return expirationTimestamp < currentTimestamp;// Verifica se a data de expiração é anterior à data atual
    };

    async function paymentGeneratePix() {
        try {
            if (!pixData.txId || hasExpired(pixData.expiracao)) {

                const vendaIds = cartItems.map(item => item.vendaId);

                if (vendaIds.length > 0) {
                    const vedId: any = vendaIds[0].vendaId;

                    const pix: IPix = {
                        empId: parseInt(empId),
                        valor: parseInt(antecipacao),
                        nome: 'clientName',
                        cpf: '02324185188',
                        idVenda: vedId,
                    };

                    const response: any = await generatePix(pix);
                    if (response && response.copiaECola) {
                        const { copiaECola, e2e, expiracao, txId } = response;
                        setPixData({
                            qrCode: copiaECola,
                            e2e: e2e,
                            expiracao: expiracao,
                            txId: txId,
                        });
                    };
                };

            };
        } catch (error) {
            showToast('Erro ao processar pagamento!', 'error');
        };
    };

    const renderQRCode = () => {
        if (!pixData || !pixData.qrCode) {
            return (
                <>
                    <View style={styles.ContainerLottieView}>
                        <LottieView
                            source={require("../lottie/MaxData.json")}
                            autoPlay
                            loop
                            style={{ width: 280, height: 280, alignSelf: 'center' }}
                        />
                    </View>
                </>
            )
        };

        return (
            <QRCode
                value={pixData.qrCode}
                size={300}
                color={'#FFF'}
                backgroundColor={'#000'}
                logoSize={30}
                logoMargin={20}
                logoBorderRadius={20}
                logoBackgroundColor={'#FFF'}
            />
        );
    };

    return (
        <>
            <SafeAreaView style={styles.Container}>
                <Header />
                <View style={styles.ActionCardHeader}>
                    <Text style={styles.ActionCardHeaderTitle}>Antecipação | </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.ActionCardBack}>Voltar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ActionCard}>
                    <View style={styles.Context}>
                        <View style={styles.ContainerQrCode}>
                            <Text style={styles.HeaderText}>Pague com Pix</Text>
                            <View style={styles.EmptyView} />
                            {renderQRCode()}
                        </View>
                        <View style={styles.ContainerValue}>
                            <Text style={styles.TextSumary}>Resumo</Text>
                            <View style={styles.ActionCardInvoiceFooterRow}>
                                <Text style={styles.Title}>Total Pedido:</Text>
                                <Text style={styles.Price}>{formatPrice(totalPedido)}</Text>
                            </View>
                            <View style={styles.ActionCardInvoiceFooterRow}>
                                <Text style={styles.Title}>+ Serviço:</Text>
                                <Text style={styles.Price}>{formatPrice(totalServico)}</Text>
                            </View>
                            {/*        <View style={{ backgroundColor: 'black', height: 1 }}/> */}
                            <View style={styles.ActionCardInvoiceFooterRow}>
                                <Text style={styles.Title}>Total Final:</Text>
                                <Text style={styles.Price}>{formatPrice(totalPedido)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default PaymentScreen;

export const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#3E3E3E',
    },
    Context: {
        display: 'flex',
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
    TextSumary: {
        fontSize: 22,
        color: '#3E3E3E',
        fontWeight: 'bold',
    },
    EmptyView: {
        height: 5,
    },
    ContainerQrCode: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-between',
        top: '1%',
        backgroundColor: '#3E3E3E',
        borderRadius: 10,
        padding: '1%',
    },
    ContainerLottieView: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-between',
        top: '1%',
        backgroundColor: '#3E3E3E',
        borderRadius: 10,
        padding: '1%',
    },
    ContainerValue: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'stretch',
        justifyContent: 'space-between',
        padding: hp('2%'),
        top: hp('1%'),
        backgroundColor: '#cecbcb',
        borderRadius: 5,
        width: wp('40%'),
        height: hp('40%'),
    },
    ActionCard: {
        flex: 1,
        backgroundColor: "#ddd",
        borderRadius: 10,
        padding: 20,
        margin: 10,
    },
    Title: {
        flex: 1,
        fontSize: 20,
        color: "#3E3E3E",
    },
    Price: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#3E3E3E",
        textAlign: 'right',
    },
    ActionCardInvoiceFooterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        marginVertical: 5,
    },
    ActionCardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
    ActionCardBack: {
        color: "#ffa500",
        fontWeight: "bold",
        fontSize: 20,
    },
    ActionCardHeaderTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#A2A4A3",
    },
});
