import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

function Config({ navigation }) {
  const [ipUrl, setIpUrl] = useState("");
  const [porta, setPorta] = useState("");
  const [idEmpresa, setIdEmpresa] = useState("");
  const [idVendedor, setIdVendedor] = useState("");
  const [numMesa, setNumMesa] = useState("");

  const [selectedItem, setSelectedItem] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false); // Estado para controlar o estado de loading do refresh
  const [empresaData, setEmpresaData] = useState<any[]>([]);

  const fetchEmpresaData = async () => {
    try {
      const response = await axios.get(
        `http://${ipUrl}:${porta}/v1/public/empresa/consultar`
      );
      if (response.data && response.data.length > 0) {
        setEmpresaData(response.data); // Atualiza o estado com os dados da empresa
      } else {
        throw new Error("Dados da empresa não encontrados");
      }
    } catch (error) {
      console.error("Erro ao buscar dados da empresa:", error);
      Alert.alert(
        "Erro",
        "Não foi possível carregar os dados da empresa. Verifique a conexão e tente novamente."
      );
    }
  };

  const fetchItems = async () => {
    setLoading(true); // Inicia o estado de loading
    try {
      // Simula uma requisição à API com um delay para demonstração
      setTimeout(async () => {
        setLoading(false); // Finaliza o estado de loading
      }, 1500); // Delay de 1.5 segundos para simular uma requisição real

      // Busca os dados da empresa
      await fetchEmpresaData();
    } catch (error) {
      console.error("Erro ao buscar dados da API:", error);
      setLoading(false); // Finaliza o estado de loading em caso de erro
    }
  };

  useEffect(() => {
    // Função assíncrona para buscar os dados salvos no AsyncStorage
    const fetchConfigurations = async () => {
      try {
        const ipUrl = await AsyncStorage.getItem("ipUrl");
        const porta = await AsyncStorage.getItem("porta");
        const idEmpresa = await AsyncStorage.getItem("idEmpresa");
        const idVendedor = await AsyncStorage.getItem("idVendedor");
        const numMesa = await AsyncStorage.getItem("numMesa");

        // Atualiza os estados apenas se os valores do AsyncStorage não forem nulos
        if (ipUrl) setIpUrl(ipUrl);
        if (porta) setPorta(porta);
        if (idEmpresa) setIdEmpresa(idEmpresa);
        if (idVendedor) setIdVendedor(idVendedor);
        if (numMesa) setNumMesa(numMesa);
      } catch (error) {
        console.error("Erro ao buscar dados do AsyncStorage:", error);
      }
    };

    // Chama a função para buscar os dados ao carregar a tela
    fetchConfigurations();
  }, []);

  const salvarConfiguracao = async () => {
    try {
      await AsyncStorage.setItem("ipUrl", ipUrl);
      await AsyncStorage.setItem("porta", porta);
      await AsyncStorage.setItem("idEmpresa", idEmpresa);
      await AsyncStorage.setItem("idVendedor", idVendedor);
      await AsyncStorage.setItem("numMesa", numMesa);

      try {
        const config = {
          headers: { terminal: "123456", empId: idEmpresa },
        };
        const response = await axios.get(
          "http://" + ipUrl + ":" + porta + "/v1/auth",
          config
        );
        await AsyncStorage.setItem("token", response.data.token);
        await navigation.navigate("Home");
      } catch (error) {
        Alert.alert("Ops", "Erro ao buscar dados. Por favor, tente novamente.");
      }
    } catch (error) {
      Alert.alert(
        "Ops",
        "Erro ao salvar dados. Por favor, tente novamente." + error
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#3E3E3E" }}>
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
                style={styles.input}
                placeholder="Digite aqui..."
                keyboardType="numeric"
                onChangeText={(value) => setIpUrl(value)}
                value={ipUrl}
              />
            </View>

            <View style={{ paddingTop: 0 }}>
              <Text style={[{ fontSize: 18, color: "#7D899D" }]}>Porta</Text>
              <TextInput
                style={styles.input}
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
                  style={styles.picker}
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
                  spin={loading}
                />
              </TouchableOpacity>
            </View>

            <View style={{ paddingTop: 0 }}>
              <Text style={[{ fontSize: 18, color: "#7D899D" }]}>
                ID Vendedor
              </Text>
              <TextInput
                style={styles.input}
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
                style={styles.input}
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
    </SafeAreaView>
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
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 5,
    width: "100%",
    marginTop: 5,
    fontSize: 18,
  },
});

export default Config;
