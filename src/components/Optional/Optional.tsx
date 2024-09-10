import React, { useContext } from 'react';
import { View } from 'react-native';
import { IProdutosOptions } from '../../@types/Produto';
import { AdditionalContext } from '../../Context/AdditionalContext';
import CheckBox from '../CheckBox/CheckBox';
import { styles } from './styles';


const RenderOptions = ({ item }: { item: IProdutosOptions }) => {
    const {
        optionsData,
        setOptionsData,
    } = useContext<any>(AdditionalContext);

    const items = [{ id: item.foId.toString(), text: item.foDescricao, }];

    const toggleOption = (item: IProdutosOptions) => {
        console.log(optionsData)
        if (optionsData) {
            item.isSelected = !item.isSelected
            setOptionsData([...optionsData])
        }
    };

    return (
        <View style={styles.optionsItem}>
            <CheckBox
                options={items}
                selected={[item.isSelected ? item.foId.toString() : '']}
                onChange={() => toggleOption(item)}
            />
        </View>
    );
};

export default RenderOptions;
