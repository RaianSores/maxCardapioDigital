import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { getGrupos } from "../services/grupoService";
import { Grupo } from "../interfaces/Grupo";

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
      console.error("Erro ao buscar grupos:", error);
    }
  };

  const handleGrupoSelect = (groupId: number) => {
    onGrupoSelect(groupId);
  };

  return (
    <View style={styles.menu}>
      <Text style={styles.menuTitle}>Menu</Text>
      <ScrollView style={styles.menuNav}>
        <TouchableOpacity
          onPress={() => handleGrupoSelect(0)}
          style={[styles.menuListItem, styles.promotion]}
        >
          <Image
            source={require("../assets/img/smile.svg")}
            style={styles.promotionIcon}
          />
          <Text style={[styles.menuListItemTitle, { color: "#fff" }]}>
            Promoções
          </Text>
        </TouchableOpacity>
        {grupos.map((grupo) => (
          <TouchableOpacity
            key={grupo.id}
            onPress={() => handleGrupoSelect(grupo.id)}
            style={styles.menuListItem}
          >
            <Image
              source={
                grupo.imagem
                  ? { uri: "data:image/png;base64," + grupo.imagem }
                  : require("../assets/img/sem-foto.jpg")
              }
              style={styles.menuListItemPhoto}
            />
            <Text style={styles.menuListItemTitle}>{grupo.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  menuNav: {
    flexDirection: "column",
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
  },
  menuListItemPhoto: {
    width: 40,
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
  },
});

export default Menu;
