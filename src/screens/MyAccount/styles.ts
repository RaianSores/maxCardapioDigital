import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONTFAMILY, FONTSIZE } from '../../theme/theme';

export const styles = StyleSheet.create({
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