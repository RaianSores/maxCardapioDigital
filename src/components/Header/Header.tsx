import React, { useEffect, useState, useRef, useContext } from "react";
import { View, Text, Image, TouchableOpacity, Alert, BackHandler } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { CartContext } from "../../Context/CartContext";
import RequestPassword from "../RequestPassword/RequestPassword";
import { FoodVendaContext } from "../../Context/FoodVendaContext";
import { styles } from "./styles";

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
  const { foodVenda } = useContext(FoodVendaContext);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [configModalVisible, setConfigModalVisible] = useState(false);

  const pedidoConta = foodVenda?.[0]?.pediuConta !== 0;
  
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchCartItemCount();
      fetchNumMesa();
    });

    return unsubscribe;
  }, [navigation]);

  const handleDoublePress = () => {
    const now = Date.now();
    if (now - lastPress.current < 300) {
      setConfigModalVisible(true);
    }
    lastPress.current = now;
  };

  const handleExitConfirm = () => {
    setExitModalVisible(false);
    Alert.alert("Saindo", "O aplicativo será encerrado.", [
      { text: "OK", onPress: () => BackHandler.exitApp() },
    ]);
  };

  const handleConfigConfirm = () => {
    setConfigModalVisible(false);
    navigation.navigate("Config");
  };

  return (
    <View style={[pedidoConta ? styles.headerConta : styles.header]}>
      <View style={styles.headerLogo}>
        <TouchableOpacity onPress={handleDoublePress}>
          <Image
            source={require("../../assets/img/logo.png")}
            style={[pedidoConta ? styles.logoConta : styles.logo]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.headerContent}>
        {!pedidoConta ? (
          <>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <View style={styles.headerContentTable}>
                <View style={styles.iconCircle}>
                  <FontAwesome5 name="concierge-bell" size={20} color="#A3A2A2" />
                </View>
                <Text style={styles.mesaText}>
                  Mesa {numMesa}
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.headerContentTable}>
              <View style={styles.iconCircle}>
                <FontAwesome5 name="concierge-bell" size={20} color="#A3A2A2" />
              </View>
              <Text style={styles.mesaText}>
                Mesa {numMesa} | Fechamento
              </Text>
            </View>
          </>
        )}

        <View style={styles.headerContentInfor}>
          {!pedidoConta && (
            <>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View style={styles.headerContentInforOrder}>
                  <View style={[styles.iconCircle, styles.headerContentInforOrderCount]}>
                    <Text style={styles.orderCount}>{cartItemCount}</Text>
                    <FontAwesome5 name="cart-plus" size={18} color="#A3A2A2" />
                  </View>
                  <Text style={styles.headerContentInforOrderTitle}>Pedido</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("MyAccount")}>
                <View style={styles.headerContentInforTotal}>
                  <View style={styles.iconCircle}>
                    <FontAwesome5 name="hand-holding-usd" size={20} color="#A3A2A2" />
                  </View>
                  <Text style={styles.conta}>Conta</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setExitModalVisible(true)}>
                <View style={styles.headerContentInforTotal}>
                  <View style={styles.iconCircle}>
                    <FontAwesome5 name="times" size={23} color="#A3A2A2" />
                  </View>
                  <Text style={styles.conta}>Sair</Text>
                </View>
              </TouchableOpacity>
            </>
          )}

          <RequestPassword
            visible={exitModalVisible}
            onClose={() => setExitModalVisible(false)}
            onConfirm={handleExitConfirm}
            title="Sair do App"
            errorMessage="Senha incorreta!"
            correctPassword="123"
          />

          <RequestPassword
            visible={configModalVisible}
            onClose={() => setConfigModalVisible(false)}
            onConfirm={handleConfigConfirm}
            title="Acessar configurações"
            errorMessage="Senha incorreta para acessar as configurações!"
            correctPassword="max5699"
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
