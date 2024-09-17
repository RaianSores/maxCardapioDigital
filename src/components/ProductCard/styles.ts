import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FONTSIZE } from "../../theme/theme";

export const styles = StyleSheet.create({
    productCard: {
      display: "flex",
      backgroundColor: '#bdbaba',
      borderRadius: 5,
      color: "#000",
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 6,
      gap: wp('1%'),
      height: wp('14.2'),
      maxHeight: hp('26%'),
    },
    productCardPhoto: {
      justifyContent: "center",
      alignItems: "center",
      padding: 5,
      borderRadius: 5,
      overflow: "hidden",
      height: hp('23%'),
      width: wp('13%'),
      maxWidth: wp('13%'),
      maxHeight: hp('23%'),
    },
    productCardInfor: {
      flex: 1,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      fontSize: FONTSIZE.size_14,
      color: "#46423F",
    },
    productCardTitle: {
      fontSize: FONTSIZE.size_18,
      fontWeight: "700",
      color: "#46423F",
    },
    productCardAbout: {
      flex: 1,
      fontSize: FONTSIZE.size_14,
      color: "#46423F",
    },
    priceContainer: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginRight: 10,
    },
    productCardPrice: {
      fontSize: FONTSIZE.size_18,
      fontWeight: 'bold',
      color: '#B3B6BB',
      marginRight: 8,
  
    },
    priceDiscount: {
      fontSize: FONTSIZE.size_18,
      textDecorationLine: 'line-through',
      color: '#52555A',
    },
    priceFinal: {
      fontWeight: "bold",
      fontSize: FONTSIZE.size_24,
      color: "#46423F",
    },
  });