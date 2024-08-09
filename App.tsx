import * as React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NavigationBarColor from "react-native-navigation-bar-color";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import MyAccountScreen from "./screens/MyAccount";
import ConfigCreen from "./screens/ConfigScreen";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar hidden />
      <Stack.Navigator initialRouteName="Config">
        <Stack.Screen
          name="Config"
          component={ConfigCreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyAccount"
          component={MyAccountScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
