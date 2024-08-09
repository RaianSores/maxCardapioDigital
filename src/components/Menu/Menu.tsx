import React, { useEffect, useState, } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import * as Icons from 'react-native-feather';
import { getGrupos } from "../../services/grupoService";
import { Grupo } from "../../@types/Grupo";
import showToast from "../../utils/ToastUtil";

interface MenuProps {
  onGrupoSelect: (groupId: number) => void;
}

const Menu: React.FC<MenuProps> = ({ onGrupoSelect }) => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);

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
        style={styles.menuListItemPhoto}
      />
      <Text style={styles.menuListItemTitle}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.menu}>
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
      <FlashList
        data={grupos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: "25%",
    padding: 10,
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
    padding: 8,
    backgroundColor: "#dddddd",
    color: "#000",
    fontWeight: "600",
    marginBottom: 10,
    borderRadius: 5,
  },
  promotion: {
    backgroundColor: "#ffa500",
    marginTop: 26,
  },
  menuListItemPhoto: {
    width: 45,
    height: 40,
    marginRight: 10,
  },
  promotionIcon: {
    width: 45,
    height: 45,
    marginRight: 10,
  },
  menuListItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#46423F",
  },
  menuListItemPromotion: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
    paddingLeft: 10,
  },
});

export default Menu;
