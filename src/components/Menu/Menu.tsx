import React, { useContext, useEffect, useState, } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import * as Icons from 'react-native-feather';
import { getGrupos } from "../../services/grupoService";
import { Grupo } from "../../@types/Grupo";
import showToast from "../../utils/ToastUtil";
import { styles } from "./styles";
import { FoodVendaContext } from "../../Context/FoodVendaContext";

interface MenuProps {
  onGrupoSelect: (groupId: number) => void;
}

const Menu: React.FC<MenuProps> = ({ onGrupoSelect }) => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const { foodVenda } = useContext(FoodVendaContext);

  const pedidoConta = foodVenda?.[0]?.pediuConta !== 0;

  useEffect(() => {
    fetchGrupos();
  }, []);

  const fetchGrupos = async () => {
    try {
      const gruposData = await getGrupos();
      setGrupos(gruposData);
    } catch (error) {
      showToast("Erro ao buscar grupos!", 'error');
    }
  };

  const handleGrupoSelect = (groupId: number) => {
    if (groupId === 10000) {
      onGrupoSelect(10000);
    } else if (groupId === 10001) {
      onGrupoSelect(10001);
    } else {
      onGrupoSelect(groupId);
    }
  };

  const renderItem = ({ item }: { item: Grupo }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleGrupoSelect(item.id)}
      style={styles.menuListItem}
    >
      <Image
        source={
          item.imagem
            ? { uri: "data:image/png;base64," + item.imagem }
            : require("../../assets/img/sem-foto.jpg")
        }
        resizeMode="contain"
        style={styles.menuListItemPhoto}
      />
      <Text style={styles.menuListItemTitle}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[pedidoConta ? styles.menuConta : styles.menu]}>
      <TouchableOpacity
        onPress={() => handleGrupoSelect(10000)}
        style={[styles.menuListItem, styles.promotion]}
      >
        <Icons.Smile
          strokeWidth={2}
          height={40}
          width={40}
          stroke="#FFF"
        />
        <Text style={[styles.menuListItemTitle, styles.menuListItemPromotion]}>
          Promoções
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handleGrupoSelect(10001)}
        style={[styles.menuListItem, styles.home]}
      >
        <Icons.Home
          strokeWidth={2}
          height={40}
          width={40}
          stroke="#46423F"
        />
        <Text style={[styles.menuListItemHome, styles.menuListItemHome]}>
          HOME
        </Text>
      </TouchableOpacity>
      <FlashList
        data={grupos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={20}
      />
    </View>
  );
};

export default Menu;
