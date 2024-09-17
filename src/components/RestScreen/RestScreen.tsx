import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from './styles';
import { FoodVendaContext } from '../../Context/FoodVendaContext';
import { CorporationContext } from '../../Context/CorporationContext';

const RestScreen: React.FC = () => {
    const { foodVenda } = useContext(FoodVendaContext);
    const { empresaData, setIsInit } = useContext(CorporationContext);

    const defaultImage = require("../../assets/maxfood_byMaxda.png");
    const ocupada = foodVenda && foodVenda[0] && foodVenda[0].idVenda !== 0;

    function toggle(isInit: boolean) {
        setIsInit(isInit);
    };

    const renderLogo = () => {
        if (empresaData && empresaData.length > 0 && empresaData[0].logo) {
            return (
                <Image
                    source={{ uri: `data:image/png;base64,${empresaData[0].logo}` }}
                    style={styles.photoEmpresa}
                    resizeMode="contain"
                />
            );
        } else {
            return <Image source={defaultImage} style={styles.photoMaxData} resizeMode="contain" />;
        }
    };

    return (
        <>
            <TouchableOpacity style={styles.content} onPress={() => toggle(true)}>
                <View style={styles.containerTouch}>
                    <View style={styles.containerLogo}>
                        <Image
                            source={defaultImage}
                            style={{}}
                            resizeMode="contain"
                        />
                        {renderLogo()}
                    </View>
                    <View style={styles.containerTitle}>
                        <Image
                            source={require("../../assets/hand_touch.png")}
                            style={{}}
                            resizeMode="contain"
                        />
                        {ocupada ? (
                            <>
                                <Text style={styles.titles}>Toque na tela para novos pedidos.</Text>
                            </>
                        ) : (
                            <>
                                <Text style={styles.titles}>Seja bem vindo! Toque na tela para iniciar.</Text>
                            </>
                        )}
                    </View>
                </View>
            </TouchableOpacity>
        </>
    );
}

export default RestScreen;