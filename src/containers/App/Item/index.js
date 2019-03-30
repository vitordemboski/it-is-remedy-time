import React, { Component } from 'react';
import { ListItem, Left, Body, Text } from 'native-base';
import { View, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import Styles from '../../../theme/variables/styles';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icone from '../../../../assets/icones/medicamento.png';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Item extends Component {

  ontem = () => {
    return moment().subtract(1, 'day');
  }

  getTimeAgo = (date) => {
    return date.fromNow();
  }

  render() {
    const { item, onPressNovo, onPressVisualizar } = this.props;
    const itemVisualizar = item.COMPARTIMENTO;
    const dataInicio = itemVisualizar ? moment(item.DATAFINAL) : null;
    const onPress = itemVisualizar ? () => onPressVisualizar(item) : () => onPressNovo();
    return (
      <View style={{ padding: 10 }}>
        <ListItem onPress={onPress} style={{ backgroundColor: '#CCC', marginLeft: 0, paddingLeft: 17, borderRadius: 20 }}>
          <View style={{
            alignSelf: 'flex-start', backgroundColor: Styles.colorDarker,
            elevation: 2, justifyContent: 'center', borderRadius: 25,
            height: 50, width: 50, alignItens: 'center'
          }} >
            {itemVisualizar ?
              <Image source={Icone} style={{ height: 40, width: 40, resizeMode: 'contain', marginLeft: 5 }} />
              : <Icon name='plus' size={25} color='#FFF' style={{ marginLeft: 15 }} />}
          </View>
          <Body>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 3 }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12, width: '60%' }} numberOfLines={1} >
                {itemVisualizar ? item.DESCRICAO : null}
              </Text>
              <Text style={{ color: "#333333", fontSize: 10 }}>
                {itemVisualizar ? 'Proxima dose' : null}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: "#333333", fontSize: 12 }} numberOfLines={1}>
                {itemVisualizar ? 'Tratamento de ' + item.NOMETRATAMENTO : null}
              </Text>
              <Text style={{ color: "#333333", fontSize: 10 }}>
                {itemVisualizar ? this.getTimeAgo(dataInicio) : null}
              </Text>
            </View>
          </Body>
        </ListItem>
      </View >
    );
  }
}
