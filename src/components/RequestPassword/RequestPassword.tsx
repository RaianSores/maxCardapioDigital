import React, { useState, useRef, useEffect } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONTFAMILY, FONTSIZE } from "../../theme/theme";

interface RequestPasswordProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    errorMessage?: string;
    correctPassword: string;
}

const RequestPassword: React.FC<RequestPasswordProps> = ({
    visible,
    onClose,
    onConfirm,
    title = "Confirme sua senha",
    errorMessage = "Senha incorreta!",
    correctPassword,
}) => {
    const [password, setPassword] = useState("");
    const passwordInputRef = useRef<TextInput>(null);

    useEffect(() => {
        if (visible) {
            passwordInputRef.current?.focus();
        }
    }, [visible]);

    const handleConfirm = () => {
        if (password === correctPassword) {
            onConfirm();
        } else {
            Alert.alert("Erro", errorMessage);
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="fade">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <TextInput
                        ref={passwordInputRef}
                        style={styles.input}
                        placeholder="Digite sua senha"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        autoCapitalize="none"
                    />

                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleConfirm}
                            style={styles.confirmButton}
                        >
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Cor de fundo semi-transparente
        width: '100%',
        height: '100%',
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.secondaryDarkGreyHex,
        padding: 20,
        borderRadius: 10,
        width: hp('80%'), // Largura do modal em relação à tela
        height: hp('35%'),
    },
    modalTitle: {
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: "bold",
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryWhiteHex,
    },
    input: {
        fontSize: FONTSIZE.size_28,
        color: COLORS.primaryWhiteHex,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 20,
    },
    cancelButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primaryRedHex,
        width: wp('15%'),
        height: hp('10%'),
        borderRadius: 5,
    },
    confirmButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primaryGreenHex,
        width: wp('15%'),
        height: hp('10%'),
        borderRadius: 5,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: FONTSIZE.size_20,
        fontFamily: FONTFAMILY.poppins_bold,
        color: COLORS.primaryWhiteHex,
    },
});

export default RequestPassword;
