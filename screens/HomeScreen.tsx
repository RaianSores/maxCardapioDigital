import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import Menu from "../components/Menu";
import ProductList from "../components/ProductList";

const HomeScreen = ({ navigation }) => {
  const [selectedGroupId, setSelectedGroupId] = useState(0);

  const handleGrupoSelect = (groupId) => {
    setSelectedGroupId(groupId);
  };

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.content}>
        <Menu onGrupoSelect={handleGrupoSelect} />
        <ProductList selectedGroupId={selectedGroupId} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3E3E3E",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
});

export default HomeScreen;
