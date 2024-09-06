import React, { useContext } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Icon from 'react-native-feather';
import { formatPrice } from '../../utils/format';
import { styles } from './styles';
import { IProdutosAdditional } from '../../@types/Produto';
import { AdditionalContext } from '../../Context/AdditionalContext';

const RenderAdditionals = ({ item }: { item: IProdutosAdditional }) => {
    const { additionalCounters, setAdditionalCounters } = useContext<any>(AdditionalContext);
    const additionalCounter = additionalCounters[item.faId] || 0;

    const handleIncrementAdditional = (faId: number) => {
        setAdditionalCounters((prevCounters: any) => {
            const updatedCounters = { ...prevCounters };
            updatedCounters[faId] = (updatedCounters[faId] || 0) + 1;
            return { ...updatedCounters };
        });
    };

    const handleDecrementAdditional = (faId: number) => {
        setAdditionalCounters((prevCounters: any) => {
            const updatedCounters = { ...prevCounters };
            if (updatedCounters[faId] && updatedCounters[faId] > 0) {
                updatedCounters[faId] -= 1;
            }
            return { ...updatedCounters };
        });
    };

    return (
        <View key={item.faId} style={styles.additionalItem}>
            <View style={styles.row}>
                <View style={styles.infoContainer}>
                    <Text style={styles.additionalLabel}>{item.faDescricao}</Text>
                    <Text style={styles.additionalPrice}>{formatPrice(item.faPrecoVenda)}</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity
                        style={styles.buttonDecrement}
                        onPress={() => handleDecrementAdditional(item.faId)}
                        accessibilityLabel="Decrement Button"
                    >
                        <Icon.Minus strokeWidth={5} height={20} width={20} stroke="#bd1717" />
                    </TouchableOpacity>

                    <Text style={styles.count}>{additionalCounter}</Text>

                    <TouchableOpacity
                        style={styles.buttonAdd}
                        onPress={() => handleIncrementAdditional(item.faId)}
                        accessibilityLabel="Increment Button"
                    >
                        <Icon.Plus strokeWidth={5} height={20} width={20} stroke="#057a42" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default RenderAdditionals;
