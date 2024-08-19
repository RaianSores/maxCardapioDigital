import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DeviceInfo from 'react-native-device-info';
import LottieView from 'lottie-react-native';
import showToast from "../../utils/ToastUtil";

function Config({ navigation }: any) {
  const [ipUrl, setIpUrl] = useState("");
  const [porta, setPorta] = useState("");
  const [idEmpresa, setIdEmpresa] = useState("");
  const [idVendedor, setIdVendedor] = useState("");
  const [numMesa, setNumMesa] = useState("");
  const [loading, setLoading] = useState(false);
  const [empresaData, setEmpresaData] = useState<any[]>([]);

  const fetchEmpresaData = async () => {
    try {
      const response = await axios.get(
        `http://${ipUrl}:${porta}/v1/public/empresa/consultar`
      );
      if (response.data && response.data.length > 0) {
        setEmpresaData(response.data);
      } else {
        showToast("Dados da empresa não encontrados!", 'error');
      }
    } catch (error) {
      // showToast("Não foi possível carregar os dados da empresa. Verifique a conexão e tente novamente.", 'error');
      Alert.alert("Erro", "Não foi possível carregar os dados da empresa. Verifique a conexão e tente novamente.");
    }
  };

  const fetchItems = async () => {
    try {
      await fetchEmpresaData();
      setTimeout(async () => {
        setLoading(false);
      }, 880);
    } catch (error) {
      showToast("Erro ao buscar dados da API!", 'error');
    }
  };

  useEffect(() => {
    fetchConfigurations();
  }, []);

  const fetchConfigurations = async () => {
    setLoading(true);
    try {
      const ipUrl = await AsyncStorage.getItem("ipUrl");
      const porta = await AsyncStorage.getItem("porta");
      const idEmpresa = await AsyncStorage.getItem("idEmpresa");
      const idVendedor = await AsyncStorage.getItem("idVendedor");
      const numMesa = await AsyncStorage.getItem("numMesa");

      if (ipUrl) setIpUrl(ipUrl);
      if (porta) setPorta(porta);
      if (idEmpresa) setIdEmpresa(idEmpresa);
      if (idVendedor) setIdVendedor(idVendedor);
      if (numMesa) setNumMesa(numMesa);

      if (ipUrl && porta && idEmpresa && idVendedor && numMesa) {
        try {
          setLoading(true);
          const id = await DeviceInfo.getUniqueId();
          const config = {
            headers: { terminal: id, empId: idEmpresa },
          };
          const response = await axios.get(
            "http://" + ipUrl + ":" + porta + "/v1/auth",
            config
          );
          await AsyncStorage.setItem("token", response.data.token);
          setTimeout(async () => {
            setLoading(false);
          }, 1800);
          await navigation.navigate('Home');
        } catch (error) {
          //showToast("Erro ao buscar dados. Por favor, tente novamente!", 'error');
          Alert.alert("Erro", "Erro ao buscar dados. Por favor, tente novamente.");
        }
      }
      setTimeout(async () => {
        setLoading(false);
      }, 1800);
    } catch (error) {
      showToast("Erro ao buscar dados do AsyncStorage!", 'error');
    }
  };

  const salvarConfiguracao = async () => {
    try {
      await AsyncStorage.setItem("ipUrl", ipUrl);
      await AsyncStorage.setItem("porta", porta);
      await AsyncStorage.setItem("idEmpresa", idEmpresa);
      await AsyncStorage.setItem("idVendedor", idVendedor);
      await AsyncStorage.setItem("numMesa", numMesa);

      try {     
        const id = await DeviceInfo.getUniqueId();
        const config = {
          headers: { terminal: id, empId: idEmpresa },
        };
        const response = await axios.get(
          "http://" + ipUrl + ":" + porta + "/v1/auth",
          config
        );
        await AsyncStorage.setItem("token", response.data.token);
        await navigation.navigate('Home');
      } catch (error) {
        //showToast("Erro ao buscar dados. Por favor, tente novamente!", 'error');
        Alert.alert("Erro", "Erro ao buscar dados. Por favor, tente novamente.");
      }
    } catch (error) {
      //showToast("Erro ao salvar dados. Por favor, tente novamente!", 'error');
      Alert.alert("Erro", "Erro ao salvar dados. Por favor, tente novamente.");
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#3E3E3E" }}>
        {loading ? (
          <>
            <LottieView
              source={require("../../lottie/MaxData.json")}
              autoPlay
              loop
              style={{ flex: 1, width: 250, height: 250, alignSelf: 'center', backgroundColor: '#3E3E3E' }}
            />
          </>
        ) : (
          <>

            <View style={[styles.container, { paddingVertical: 20 }]}>
              <View
                style={[
                  styles.row,
                  { alignItems: "center", justifyContent: "space-between" },
                ]}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                  <Text style={[{ fontSize: 20, color: "#fff" }]}>
                    Configuração Da Aplicação
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderRadius: 10,
                marginLeft: 50,
                marginRight: 50,
              }}
            >
              <View style={[styles.container, { flexGrow: 1, marginTop: 0 }]}>
                <ScrollView>
                  <View style={{ paddingTop: 0 }}>
                    <Text style={[{ fontSize: 18, color: "#7D899D" }]}>
                      IP/URL(sem http)
                    </Text>
                    <TextInput
                      style={[styles.input, styles.textInput]}
                      placeholder="Digite aqui..."
                      keyboardType="numeric"
                      onChangeText={(value) => setIpUrl(value)}
                      value={ipUrl}
                    />
                  </View>

                  <View style={{ paddingTop: 0 }}>
                    <Text style={[{ fontSize: 18, color: "#7D899D" }]}>Porta</Text>
                    <TextInput
                      style={[styles.input, styles.textInput]}
                      placeholder="Digite aqui..."
                      keyboardType="numeric"
                      onChangeText={(value) => setPorta(value)}
                      value={porta}
                    />
                  </View>

                  <View
                    style={{
                      paddingTop: 0,
                      flex: 1,
                    }}
                  >
                    <Text style={[{ fontSize: 18, color: "#7D899D" }]}>
                      ID Empresa
                    </Text>
                    <TouchableOpacity
                      style={styles.pickerContainer}
                      onPress={fetchItems}
                    >
                      <Picker
                        selectedValue={idEmpresa}
                        onValueChange={(itemValue) => setIdEmpresa(itemValue)}
                        style={[styles.picker, styles.textInput]}
                      >
                        <Picker.Item label="Selecione..." value="" />
                        {empresaData.map((empresa, index) => (
                          <Picker.Item
                            key={index}
                            label={empresa.fantasia}
                            value={empresa.empId.toString()}
                          />
                        ))}
                      </Picker>
                      <FontAwesome5
                        name={loading ? "spinner" : "sync"}
                        size={20}
                        color="#3E3E3E"
                        style={styles.refreshIcon}
                        solid={!loading}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={{ paddingTop: 0 }}>
                    <Text style={[{ fontSize: 18, color: "#7D899D" }]}>
                      ID Vendedor
                    </Text>
                    <TextInput
                      style={[styles.input, styles.textInput]}
                      placeholder="Digite aqui..."
                      keyboardType="numeric"
                      onChangeText={(value) => setIdVendedor(value)}
                      value={idVendedor}
                    />
                  </View>

                  <View style={{ paddingTop: 0 }}>
                    <Text style={[{ fontSize: 18, color: "#7D899D" }]}>
                      Número Mesa
                    </Text>
                    <TextInput
                      style={[styles.input, styles.textInput]}
                      placeholder="Digite aqui..."
                      keyboardType="numeric"
                      onChangeText={(value) => setNumMesa(value)}
                      value={numMesa}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: 15,
                      gap: 5,
                    }}
                  ></View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={salvarConfiguracao}
                  >
                    <Text style={styles.buttonText}>Gravar/Continuar</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  pickerContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 5,
  },
  picker: {
    flex: 1,
    height: 40,
  },
  refreshIcon: {
    marginLeft: 10,
  },
  selectedItem: {
    fontSize: 18,
  },
  button: {
    backgroundColor: "#3E3E3E",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    padding: 10,
    maxWidth: 2500,
    marginLeft: "auto",
    marginRight: "auto",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#7D899D",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 5,
    width: "100%",
    marginTop: 5,
    fontSize: 18,
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    color: '#21262E',
  },
});

export default Config;
