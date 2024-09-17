import * as React from "react";
import { StatusBar } from "react-native";
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Routes from "./src/routes/routes";

function App() {
  return (
    <>
        <StatusBar animated={true} hidden={true} />
        <Routes />
        <Toast />
    </>
  );
}

export default App;
