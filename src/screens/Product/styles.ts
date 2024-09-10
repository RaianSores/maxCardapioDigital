import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3E3E3E",
  },
  actionCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
  },
  actionCardBack: {
    marginRight: 10,
    color: "#F38321",
  },
  backText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F38321",
  },
  actionCard: {
    backgroundColor: "#E0DCD9",
    padding: 20,
    borderRadius: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 15,
    marginTop: 1,
    flex: 1,
  },
  actionCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  actionCardShowProduct: {
    flexDirection: "row",
    flex: 1,
  },
  actionCardContentImg: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  productImage: {
    width: 300,
    height: 300,
    marginRight: 10,
    borderRadius: 10,
  },
  actionCardContentInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  contentInfoTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#363539",
    marginBottom: 1,
  },
  contentInfoAbout: {
    fontSize: 16,
    marginBottom: 2,
    color: "#363539",
  },
  contentInfoPrice: {
    flexDirection: "column",
    marginBottom: 1,
    color: "#363539",
  },
  priceFinal: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#363539",
  },
  contentInfoActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    gap: 10,
  },
  inputQtd: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButtonLeft: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4E4D4B",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  quantityButtonRight: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4E4D4B",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  quantityButtonText: {
    fontSize: 45,
    color: "#fff",
  },
  quantityInput: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#3E3E3E",
    width: 60,
    height: 60,
    fontSize: 26,
    fontWeight: 'bold',
  },
  buttonOrder: {
    backgroundColor: "#F38321",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: 100,
    height: 60,
  },
  orderText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    marginRight: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});
