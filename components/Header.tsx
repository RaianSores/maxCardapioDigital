import React, { useEffect, useState, useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";
import ConciergeBell from "../assets/img/concierge-bell.svg";
import ShoppingCart from "../assets/img/shopping-cart.svg";
import HandCoins from "../assets/img/hand-coins.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCartItemCount } from "../utils/cartUtils";

const Header: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [numMesa, setNumMesa] = useState<string>("");
  const lastPress = useRef(0);
  const handleImagePress = () => {
    const now = Date.now();
    if (now - lastPress.current < 300) {
      navigation.navigate("Config"); // Navegar para outra tela
    }
    lastPress.current = now;
  };

  useEffect(() => {
    const fetchCartItemCount = async () => {
      const itemCount = await getCartItemCount();
      setCartItemCount(itemCount);
    };

    const fetchNumMesa = async () => {
      try {
        const mesa = await AsyncStorage.getItem("numMesa");
        if (mesa) {
          setNumMesa(mesa);
        }
      } catch (error) {
        console.error("Erro ao obter número da mesa:", error);
      }
    };

    fetchCartItemCount();
    fetchNumMesa();
  }, [navigation]);
  return (
    <View style={styles.header}>
      <View style={styles.headerLogo}>
        <TouchableOpacity onPress={handleImagePress}>
          <Image
            source={require("../assets/img/logo.png")}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerContent}>
        <View style={styles.headerContentTable1}></View>
        <View style={styles.headerContentInfor}>
          <View style={styles.headerContentTable}>
            <View style={styles.iconCircle}>
              <ConciergeBell width={18} height={24} />
            </View>
            <Text style={styles.mesaText}>Mesa {numMesa}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <View style={styles.headerContentInforOrder}>
              <View
                style={[styles.iconCircle, styles.headerContentInforOrderCount]}
              >
                <Text style={styles.orderCount}>{cartItemCount}</Text>
                <ShoppingCart width={18} height={24} />
              </View>
              <Text style={styles.headerContentInforOrderTitle}>Pedido</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("MyAccount")}>
            <View style={styles.headerContentInforTotal}>
              <View style={styles.iconCircle}>
                <HandCoins width={18} height={24} />
              </View>
              <View style={styles.headerContentInforTotalValue}>
                <Text style={styles.price}>Conta</Text>
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
  iconCircle: {
    justifyContent: "center",
    alignItems: "center",
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#A3A2A2",
    padding: 3,
  },
  headerContentInfor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  headerContentInfor1: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    display: "none",
  },
  headerContentInforOrder: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    position: "relative",
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
  headerContentInforOrderTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#A3A2A2",
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
  title: {
    opacity: 0.8,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#A3A2A2",
  },
  mesaText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#A3A2A2",
  },
});
