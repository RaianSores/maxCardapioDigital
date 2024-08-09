import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { CartContext } from "../../Context/CartContext";

type RootStackParamList = {
  Config: undefined;
  Cart: undefined;
  MyAccount: undefined;
  Home: undefined;
};

const Header: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const lastPress = useRef(0);
  const { cartItemCount, numMesa, fetchCartItemCount, fetchNumMesa } = useContext(CartContext);

  const handleImagePress = () => {
    const now = Date.now();
    if (now - lastPress.current < 300) {
      navigation.navigate("Config");
    }
    lastPress.current = now;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchCartItemCount();
      fetchNumMesa();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.header}>
      <View style={styles.headerLogo}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            source={require("../../assets/img/logo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContent}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.headerContentTable}>
          <View style={styles.iconCircle}>
            <FontAwesome5
              name="concierge-bell"
              size={20}
              color="#A3A2A2"
              style={{ flex: 1 }}
            />
          </View>
          <Text style={styles.mesaText}>Mesa {numMesa}</Text>
        </View>
        </TouchableOpacity>
        <View style={styles.headerContentTable1}></View>
        <View style={styles.headerContentInfor}>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <View style={styles.headerContentInforOrder}>
              <View style={styles.headerContentInforOrder}>
                <View
                  style={[styles.iconCircle, styles.headerContentInforOrderCount]}
                >
                  <Text style={styles.orderCount}>{cartItemCount}</Text>
                  <FontAwesome5
                    name="cart-plus"
                    size={18}
                    color="#A3A2A2"
                    style={{ flex: 1, marginTop: 2 }}
                  />
                </View>
                <Text style={styles.headerContentInforOrderTitle}>Pedido</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyAccount")}>
            <View style={styles.headerContentInforTotal}>
              <View style={styles.iconCircle}>
                <FontAwesome5
                  name="hand-holding-usd"
                  size={20}
                  color="#A3A2A2"
                  style={{ flex: 1, }}
                />
              </View>
              <View style={styles.headerContentInforTotalValue}>
                <Text style={styles.conta}>Conta</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#3E3E3E",
    alignItems: "center",
  },
  headerLogo: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 260,
    height: 60,
    borderBottomRightRadius: 5,
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
