import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface MenuItemProps {
  icon: any;
  title: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title }) => {
  return (
    <TouchableOpacity style={styles.menuListItem}>
      <Image source={icon} style={styles.menuListItemPhoto} />
      <Text style={styles.menuListItemTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  menuListItemPhoto: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  menuListItemTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MenuItem;
