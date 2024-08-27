import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    actionCard: {
      padding: 10,
    },
    actionCardHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 10,
    },
    actionCardBack: {
      fontFamily: "Roboto-Regular",
      fontSize: 16,
      color: "#000",
    },
    actionCardHeaderTitle: {
      fontFamily: "Roboto-Bold",
      fontSize: 18,
    },
    actionCardContent: {
      backgroundColor: "#fff",
      borderRadius: 5,
      padding: 10,
    },
    actionCardInvoice: {},
    actionCardInvoiceTable: {},
    actionCardInvoiceTableRow: {
      flexDirection: "row",
      paddingVertical: 5,
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
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
    },
    actionCardInvoiceFooterSum: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    actionCardInvoiceFooterService: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    actionCardInvoiceFooterCouvert: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    actionCardInvoiceFooterTotal: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    title: {
      fontFamily: "Roboto-Regular",
      fontSize: 16,
    },
    price: {
      fontFamily: "Roboto-Bold",
      fontSize: 16,
    },
    btnPrimary: {
      marginTop: 20,
      backgroundColor: "#ffa500",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    btnText: {
      color: "#fff",
      fontFamily: "Roboto-Bold",
      fontSize: 16,
    },
  });