import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    menu: {
      width: wp("25%"),
      padding: wp("1%"),
      backgroundColor: '#3E3E3E',
    },
    menuConta: {
      width: wp("25%"),
      padding: wp("1%"),
      backgroundColor: '#740c0c',
    },
    menuTitle: {
      fontSize: 20,
      marginBottom: 18,
      marginTop: 8,
      color: "#B5A8A5",
    },
    menuListItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: wp("1%"),
      backgroundColor: '#bdbaba',
      marginBottom: hp("1.5%"),
      borderRadius: 5,
    },
    promotion: {
      backgroundColor: "#ffa500",
      marginTop: hp("5%"),
    },
    home: {
      backgroundColor: '#bdbaba',
    },
    menuListItemPhoto: {
      width: wp('4%'),
      height: hp('8%'),
      marginRight: wp("1%"),
      borderRadius: 6,
    },
    promotionIcon: {
      width: wp('4%'),
      height: hp('8%'),
      marginRight: wp("1%"),
    },
    menuListItemTitle: {
      fontSize: wp("1.5%"),
      fontWeight: "bold",
      color: "#46423F",
    },
    menuListItemPromotion: {
      fontSize: wp("1.7%"),
      fontWeight: "bold",
      color: "#FFF",
      paddingLeft: wp("1%"),
    },
    menuListItemTitleHome: {
      fontSize: wp("1.5%"),
      fontWeight: "bold",
      color: "#46423F",
    },
    menuListItemHome: {
      fontSize: wp("1.5%"),
      fontWeight: "bold",
      color: "#46423F",
      paddingLeft: wp("1%"),
    },
  });