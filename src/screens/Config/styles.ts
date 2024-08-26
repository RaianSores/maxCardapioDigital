import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    containerArea: {
      flex: 1,
      backgroundColor: "#3E3E3E",
    },
    pickerContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      paddingHorizontal: 5,
    },
    picker: {
      flex: 1,
      height: 40,
    },
    refreshIcon: {
      marginLeft: 10,
    },
    selectedItem: {
      fontSize: 18,
    },
    button: {
      backgroundColor: "#3E3E3E",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 16,
      fontWeight: "bold",
    },
    container: {
      padding: 10,
      marginLeft: "auto",
      marginRight: "auto",
      width: "100%",
    },
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginHorizontal: -5,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: "#7D899D",
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 10,
      marginBottom: 5,
      width: "100%",
      marginTop: 5,
      fontSize: 18,
    },
    textInput: {
      backgroundColor: '#FFFFFF',
      color: '#21262E',
    },
    logo: {
      width: 260,
      height: 60,
      borderBottomRightRadius: 5,
      backgroundColor: "#3E3E3E",
    },
  });
  