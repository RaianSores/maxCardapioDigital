import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CartProvider } from "../Context/CartContext";
import HomeScreen from "../screens/Home/HomeScreen";
import CartScreen from "../screens/Cart/CartScreen";
import ProductScreen from "../screens/Product/ProductScreen";
import MyAccountScreen from "../screens/MyAccount/MyAccount";
import ConfigScreen from "../screens/Config/ConfigScreen";
import PaymentScreen from "../screens/Payment/PaymentScreen";

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <>
      <NavigationContainer>
        <CartProvider>
          <Stack.Navigator initialRouteName="Config">
            <Stack.Screen
              name="Config"
              component={ConfigScreen}
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
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </CartProvider>
      </NavigationContainer>
    </>
  );
};

export default Routes;
