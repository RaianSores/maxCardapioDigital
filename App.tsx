import * as React from "react";
import { StatusBar } from "react-native";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Routes from "./src/routes/routes";

function App() {
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar animated={true} hidden={true} />
        <Routes />
        <Toast />
      </GestureHandlerRootView>
    </>
  );
}

export default App;
