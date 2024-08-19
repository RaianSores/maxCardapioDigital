import React, { useEffect, useState, } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FlashList } from "@shopify/flash-list";
import * as Icons from 'react-native-feather';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
        resizeMode="contain"
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
        estimatedItemSize={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: wp("25%"),
    padding: wp("1%"),
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
    backgroundColor: "#dddddd",
    marginBottom: hp("1.5%"),
    borderRadius: 5,
  },
  promotion: {
    backgroundColor: "#ffa500",
    marginTop: hp("5%"),
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
});

export default Menu;
