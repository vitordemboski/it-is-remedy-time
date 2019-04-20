import React, { Component } from 'react';
import { ListItem, Left, Body, Text } from 'native-base';
import { View, TouchableWithoutFeedback, Image, Animated } from 'react-native';
import Styles from '../../../theme/variables/styles';
import moment from 'moment';
import 'moment/locale/pt-br';
import Icone from '../../../../assets/icones/medicamento.png';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Item extends Component {

  ontem = () => {
    return moment().subtract(1, 'day');
  }

  animateIn = () => {
    Animated.timing(this.state.scale, {
      toValue: 0.95,
      duration: 200
    }).start();
  }
  animateOut = () => {
    Animated.timing(this.state.scale, {
      toValue: 1,
      duration: 200
    }).start();
  }

  state = {
    scale: new Animated.Value(1),
    disabled: false,
    finalizado: this.props.item.STATUS === 'F'
  }

  getTimeAgo = (date) => {
    return moment(date).fromNow();
  }

  calculaTempoRestante = (historico) => {
    const diaAtual = moment();
    let dataDose = null;
    historico.forEach(hist => {
      const data = hist.data;
      if (dataDose === null) {
        if (diaAtual.isBefore(data)) {
          dataDose = data;
        }
      }
    });
    if (dataDose === null) {
      this.props.onFinalizarRemedio(this.props.item);
      this.setState({ finalizado: true });
    } else {
      return this.getTimeAgo(dataDose)
    }
  }

  render() {
    const { item, onPressNovo, onPressVisualizar } = this.props;
    const { finalizado } = this.state;
    const itemVisualizar = item.COMPARTIMENTO;
    const onPress = itemVisualizar ? () => onPressVisualizar(item) : () => onPressNovo();

    return (
      <View style={{ padding: 10 }}>
        <Animated.View style={{ alignSelf: 'center', width: '100%', opacity: finalizado ? 0.3 : null, borderRadius: 20, elevation: 2, backgroundColor: '#FFF', transform: [{ scale: this.state.scale }] }}>
          <TouchableWithoutFeedback disabled={this.state.disabled} onPressIn={() => this.animateIn()} onPressOut={() => this.animateOut()} onPress={() => { onPress(); this.setState({ disabled: true }) }}>
            <ListItem>
              <View style={{
                alignSelf: 'flex-start', backgroundColor: Styles.colorPrimary,
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
                  {finalizado ? <Text style={{ color: "#333333", fontSize: 10 }}>
                    Finalizado
                  </Text> :
                    <Text style={{ color: "#333333", fontSize: 10 }}>
                      {itemVisualizar ? 'Proxima dose' : null}
                    </Text>
                  }
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ color: "#333333", fontSize: 12 }} numberOfLines={1}>
                    {itemVisualizar ? 'Tratamento de ' + item.NOMETRATAMENTO : null}
                  </Text>
                  <Text style={{ color: "#333333", fontSize: 10, marginLeft: 4 }}>
                    {itemVisualizar ? finalizado ? '' : this.calculaTempoRestante(item.HISTORICO) : null}
                  </Text>
                </View>
              </Body>
            </ListItem>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>
    );
  }
}
