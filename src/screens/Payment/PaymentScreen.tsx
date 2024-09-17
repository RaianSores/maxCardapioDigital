import React, { useEffect, useState, useContext } from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import LottieView from 'lottie-react-native';
import { IPix, Venda } from '../../@types/Venda';
import { CartContext } from '../../Context/CartContext';
import { checkPaymentStatusPix, finalizaFoodVenda, generatePix } from '../../services/vendaService';
import showToast from '../../utils/ToastUtil';
import Header from '../../components/Header/Header';
import { formatPrice } from '../../utils/format';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

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
        desconto,
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
    const [vedId, setVedId] = useState<number>();

    useEffect(() => {
        paymentGeneratePix();
    }, []);

    useEffect(() => {
        if (pixData.txId) {
            paymentTimer = setInterval(handlePaymentStatusPix, 6000);
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
                    id: vedId,
                    clienteId: 1,
                    tipo: "VE",
                    atendente: parseInt(idVendedor),
                    cliNome: 'CONSUMIDOR',
                    cpf: '11111111111',
                    msg: "",
                    consumidorFinal: true,
                    empId: idEmpresa,
                    status: antecipacao === totalPrice ? 'F' : 'A',
                    pagamentos: [{
                        valor: antecipacao,
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
            console.log(JSON.stringify(pixStatus, undefined, 2));
            switch (pixStatus.statusCobranca) {
                case 'concluida':
                    setPaymentStatus({ ...paymentStatus, concluida: pixStatus.statusCobranca });
                    await handlePayment(antecipacao, 'pgPix');
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
                    const vedId: any = vendaIds[0];
                    setVedId(vedId);
                    const pix: IPix = {
                        empId: parseInt(empId),
                        valor: antecipacao,
                        nome: '',
                        cpf: '',
                        idVenda: vedId,
                    };                   

                    const response: any = await generatePix(pix);
                    if (response && response.copiaECola) {
                        const { copiaECola, e2e, expiracao, txId } = response;
                        console.log('copiaECola', copiaECola);
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
                    <View style={styles.containerLottieView}>
                        <LottieView
                            source={require("../../lottie/MaxData.json")}
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
                size={420}
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
            <SafeAreaView style={styles.container}>
                <Header />
                <View style={styles.actionCardHeader}>
                    <Text style={styles.actionCardHeaderTitle}>Antecipação | </Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.actionCardBack}>Voltar</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.mainContent}>
                    <View style={styles.actionCard}>
                        <View style={styles.containerQrCode}>
                            <Text style={styles.headerText}>Antecipação com Pix</Text>
                            <View style={styles.emptyView} />
                            {renderQRCode()}
                        </View>
                    </View>
                    <View style={styles.actionPrice}>
                        <Text style={styles.textSumary}>Resumo</Text>
                        <View style={styles.actionCardInvoiceFooterRow}>
                            <Text style={styles.title}>Total Pedido:</Text>
                            <Text style={styles.price}>{formatPrice(totalPedido)}</Text>
                        </View>
                        <View style={styles.actionCardInvoiceFooterRow}>
                            <Text style={styles.title}>+ Serviço:</Text>
                            <Text style={styles.price}>{formatPrice(totalServico)}</Text>
                        </View>
                        <View style={styles.actionCardInvoiceFooterRow}>
                            <Text style={styles.title}>- Desconto:</Text>
                            <Text style={styles.price}>{formatPrice(desconto)}</Text>
                        </View>
                        <View style={styles.actionCardInvoiceFooterRow}>
                            <Text style={styles.title}>Total Final:</Text>
                            <Text style={styles.price}>{formatPrice(totalPedido)}</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
};

export default PaymentScreen;