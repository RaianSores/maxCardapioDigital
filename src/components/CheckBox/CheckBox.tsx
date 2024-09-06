import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Icon from 'react-native-feather';
import { themeColors } from '../../theme/theme';
import { styles } from './styles';

interface Option {
  id: string;
  text: string;
};

interface CheckBoxProps {
  options: Option[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  selected?: string[];
};

const CheckBox: React.FC<CheckBoxProps> = ({ options = [], onChange, multiple = false, selected = [] }) => {

  function toggle(id: string) {
    const data = calcularSelected(id);
    onChange(data);
  };

  function calcularSelected(id: string) {
    let index = selected.indexOf(id);
    let arrSelecteds = [...selected];
    if (index !== -1) {
      arrSelecteds.splice(index, 1);
    } else {
      multiple ? arrSelecteds.push(id) : (arrSelecteds = [id]);
    }
    return arrSelecteds;
  };

  return (
    <View style={styles.container}>
      {options.map((op, index) => (
        <View style={styles.optionContainer} key={index}>
          <Text style={styles.opText}>{op.text}</Text>
          <TouchableOpacity
            style={[
              styles.touchable,
              {
                backgroundColor:
                  selected.findIndex(i => i === op.id) !== -1
                    ? themeColors.bgColor(1)
                    : '#FFF',
              },
            ]}
            onPress={() => toggle(op.id)}>
            {selected.findIndex(i => i === op.id) !== -1 ? (
              <Icon.Check
                stroke={'#FFF'}
                width={30}
                height={30}
              />
            ) : null}
          </TouchableOpacity>

        </View>
      ))}
    </View>
  );
};

export default CheckBox;
