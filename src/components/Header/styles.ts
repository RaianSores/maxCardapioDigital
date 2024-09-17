import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
      flexDirection: "row",
      backgroundColor: "#3E3E3E",
      alignItems: "center",
    },
    headerConta: {
      flexDirection: "row",
      backgroundColor: '#740c0c',
      alignItems: "center",
    },
    headerLogo: {
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 8,
    },
    logo: {
      width: 260,
      height: 60,
      borderBottomRightRadius: 5,
      backgroundColor: "#3E3E3E",
    },
    logoConta:{
      width: 260,
      height: 60,
      borderBottomRightRadius: 5,
      backgroundColor: '#740c0c',
    },
    iconCircle: {
      justifyContent: "center",
      alignItems: "center",
      width: 35,
      height: 35,
      borderRadius: 50,
      borderWidth: 2,
      borderColor: "#A3A2A2",
      padding: 3,
    },
    headerContent: {
      flex: 5,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 10,
    },
    headerContentTable: {
      flexDirection: "row",
      gap: 6,
    },
    headerContentTable1: {
      flexDirection: "row",
      gap: 6,
    },
    headerContentInfor: {
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
    },
    headerContentInforOrder: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      position: "relative",
    },
    headerContentInforTotal: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    headerContentInforTotalValue: {
      flexDirection: "column",
      fontSize: 13,
    },
    conta: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#A3A2A2",
    },
    price: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#FFF",
    },
    mesaText: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#A3A2A2",
    },
    headerContentInforOrderTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#A3A2A2",
    },
    headerContentInforOrderCount: {
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
    },
    orderCount: {
      position: "absolute",
      top: -2,
      left: -6,
      backgroundColor: "#ffa500",
      color: "#fff",
      fontSize: 12,
      width: 15,
      height: 15,
      borderRadius: 7.5,
      textAlign: "center",
      lineHeight: 15,
    },
  });