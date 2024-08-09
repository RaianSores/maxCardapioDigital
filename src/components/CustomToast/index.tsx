import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const CustomToast = ({ message, type }: any) => {
  let backgroundColor = 'rgba(0, 0, 0, 0.8)';
  if (type === 'error') {
    backgroundColor = 'red';
  } else if (type === 'warning') {
    backgroundColor = 'orange';
  } else if (type === 'success') {
    backgroundColor = 'green';
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default CustomToast;
