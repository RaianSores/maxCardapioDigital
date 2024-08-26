import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";

const ActionCard = () => {
  return (
    <View style={styles.actionCard}>
      <View style={styles.actionCardHeader}>
        <TouchableOpacity>
          <Text style={styles.actionCardBack}>Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.actionCardHeaderTitle}>Minha Conta</Text>
      </View>
      <ScrollView style={styles.actionCardContent}>
        <View style={styles.actionCardInvoice}>
          <View style={styles.actionCardInvoiceTable}>
            {Array(5)
              .fill("")
              .map((_, index) => (
                <View key={index} style={styles.actionCardInvoiceTableRow}>
                  <View style={styles.tableCol}>
                    <Image
                      source={require("../assets/img/produtos/cerveja-stella.jpg")}
                      style={styles.invoiceImage}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={[
                      styles.tableCol,
                      styles.actionCardInvoiceTableTitle,
                    ]}
                  >
                    <Text>
                      Cerveja Stella Artois Puro Malte Long Neck 330ml
                    </Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>R$ 7,50</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>x 25</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text>R$ 187,50</Text>
                  </View>
                </View>
              ))}
          </View>
          <View style={styles.actionCardInvoiceFooter}>
            <View style={styles.actionCardInvoiceFooterSum}>
              <Text style={styles.title}>Total Pedido:</Text>
              <Text style={styles.price}>R$ 375,00</Text>
            </View>
            <View style={styles.actionCardInvoiceFooterService}>
              <Text style={styles.title}>+Serviço:</Text>
              <Text style={styles.price}>R$ 37,50</Text>
            </View>
            <View style={styles.actionCardInvoiceFooterCouvert}>
              <Text style={styles.title}>+Couvert:</Text>
              <Text style={styles.price}>R$ 10,00</Text>
            </View>
            <View style={styles.actionCardInvoiceFooterTotal}>
              <Text style={styles.title}>Total final:</Text>
              <Text style={styles.price}>R$ 422,50</Text>
            </View>
            <TouchableOpacity style={styles.btnPrimary}>
              <Text style={styles.btnText}>Fechar Conta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ActionCard;
