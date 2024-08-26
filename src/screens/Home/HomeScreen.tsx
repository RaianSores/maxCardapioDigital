import React, { useState } from "react";
import { View } from "react-native";
import Header from "../../components/Header/Header";
import Menu from "../../components/Menu/Menu";
import ProductList from "../../components/ProductList/ProductList";
import { styles } from "./styles";

const HomeScreen = () => {
  const [selectedGroupId, setSelectedGroupId] = useState(0);

  const handleGrupoSelect = (groupId: any) => {
    setSelectedGroupId(groupId);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Menu onGrupoSelect={handleGrupoSelect} />
        <ProductList selectedGroupId={selectedGroupId} />
      </View>
    </View>
  );
};

export default HomeScreen;
