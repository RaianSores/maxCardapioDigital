import React, { useContext, useCallback, useState, useEffect, useRef } from "react";
import { View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import ProductList from "../../components/ProductList/ProductList";
import { FoodVendaContext } from "../../Context/FoodVendaContext";
import { CorporationContext } from "../../Context/CorporationContext";

import { styles } from "./styles";
import RestScreen from "../../components/RestScreen/RestScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const HomeScreen = () => {
  const [selectedGroupId, setSelectedGroupId] = useState(0);
  const { consultarFoodMesa, foodVenda } = useContext(FoodVendaContext);
  const { fetchEmpresaData, setIsInit, isInit } = useContext(CorporationContext);

  const pedidoConta = foodVenda?.[0]?.pediuConta !== 0;
  const ocupada = foodVenda && foodVenda[0] && foodVenda[0].idVenda !== 0;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startInactivityTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsInit(false); // Após 30 segundos de inatividade, chamar o RestScreen
    }, 30000);
  };

  const fetch = useCallback(async () => {
    const mesa = await AsyncStorage.getItem("numMesa");
    if (mesa) {
      await consultarFoodMesa(parseInt(mesa));
    }
  }, [consultarFoodMesa,]);

  useEffect(() => {
    fetchEmpresaData();
  }, []);

  useEffect(() => {
    if (ocupada) {
      setIsInit(true);
    } else {
      setIsInit(false);
    }
  }, [ocupada]);

  useEffect(() => {
    startInactivityTimer(); // Inicia o temporizador quando a tela for montada

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current); // Limpa o temporizador quando o componente desmonta
      }
    };
  }, [isInit]);

  useFocusEffect(
    useCallback(() => {
      fetch();
    }, [fetch])
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (pedidoConta) {
      interval = setInterval(() => {
        fetch();
      }, 6000);
    }

    return () => clearInterval(interval);
  }, [pedidoConta, fetch]);

  const handleGrupoSelect = (groupId: any) => {
    setSelectedGroupId(groupId);
  };

  const handleUserInteraction = () => {
    setIsInit(true);
    startInactivityTimer();
  };

  return (
    <GestureHandlerRootView 
      style={{ flex: 1 }} 
      onTouchStart={handleUserInteraction}
      onTouchMove={handleUserInteraction}
    >
      <View style={[pedidoConta ? styles.containerConta : styles.container, styles.container]}>
        {isInit ? (
          <>
            <Header />
          </>
        ) : (
          <>
          </>
        )}
        <View style={styles.content}>
          {isInit ? (
            <>
              <Menu onGrupoSelect={handleGrupoSelect} />
              <ProductList selectedGroupId={selectedGroupId} />
            </>
          ) : (
            <>
              <RestScreen />
            </>
          )}
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
