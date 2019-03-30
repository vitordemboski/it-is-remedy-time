import React from 'react';
import { View } from 'react-native';

const Separador = (props) => (
  <View style={{ height: props.height ? props.height : 1, backgroundColor: props.backgroundColor || '#dedede' }} />
);

export default Separador;
