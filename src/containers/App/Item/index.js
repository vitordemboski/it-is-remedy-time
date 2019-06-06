import React, { Component } from 'react';
import { ListItem, Left, Body, Text } from 'native-base';
import { View, TouchableWithoutFeedback, Image, Animated, StyleSheet } from 'react-native';
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
    finalizado: this.props.item.STATUS === 'F',
    tempoRestante: '',
    colorDarkerAnimated: new Animated.Value(0),
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
  componentDidMount = () => {
    const { item } = this.props;
    if (item.COMPARTIMENTO) {
      const tempoRestante = this.calculaTempoRestante(item.HISTORICO);
      this.setState({ tempoRestante });
      if (item.STATUS === 'F') {
        this.animacaoFinalizado();
      }
    }
  }

  animacaoFinalizado = () => {
    const duration = 600
    Animated.sequence([
      Animated.timing(this.state.colorDarkerAnimated, {
        toValue: 1,
        duration
      }),
      Animated.timing(this.state.colorDarkerAnimated, {
        toValue: 0,
        duration
      }),
    ]).start(() => this.animacaoFinalizado());
  }

  render() {
    const { item, onPressNovo, onPressVisualizar, compartimento } = this.props;
    const { finalizado, disabled, scale, tempoRestante, colorDarkerAnimated } = this.state;
    const itemVisualizar = item.COMPARTIMENTO;
    const onPress = itemVisualizar ? () => onPressVisualizar(item) : () => onPressNovo();
    let ViewItem = null;
    if (itemVisualizar && !finalizado) {
      ViewItem = (
        <ListItem>
          <View style={{ alignSelf: 'flex-start', backgroundColor: Styles.colorPrimary, elevation: 2, justifyContent: 'center', borderRadius: 25, height: 50, width: 50, alignItens: 'center' }} >
            <Image source={Icone} style={{ height: 40, width: 40, resizeMode: 'contain', marginLeft: 5 }} />
          </View>
          <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
            <View style={{ width: '67%', marginLeft: 10 }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12, alignSelf: 'flex-start' }} numberOfLines={1} >
                {item.DESCRICAO}
              </Text>
              <Text style={{ color: "#333333", fontSize: 12, alignSelf: 'flex-start' }} numberOfLines={1}>
                {'Tratamento de ' + item.NOMETRATAMENTO}
              </Text>
            </View>
            <View>
              <Text style={{ color: "#333333", fontSize: 11 }}>
                Proxima dose
              </Text>
              <Text style={{ color: "#333333", fontSize: 11, marginTop: 2 }}>
                {tempoRestante}
              </Text>
            </View>
          </View>
        </ListItem>
      );
    } else if (finalizado) {
      ViewItem = (
        <ListItem>
          <View style={{ alignSelf: 'flex-start', backgroundColor: Styles.colorPrimary, elevation: 2, justifyContent: 'center', borderRadius: 25, height: 50, width: 50, alignItens: 'center' }} >
            <Image source={Icone} style={{ height: 40, width: 40, resizeMode: 'contain', marginLeft: 5 }} />
          </View>
          <Body style={{ flexDirection: 'row' }}>
            <View style={{ width: '65%' }}>
              <Text style={{ color: "#000", fontWeight: "bold", fontSize: 12, width: '60%' }} numberOfLines={1} >
                {item.DESCRICAO}
              </Text>
              <Text style={{ color: "#333333", fontSize: 12 }} numberOfLines={1}>
                {'Tratamento de ' + item.NOMETRATAMENTO}
              </Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: "#333333", fontSize: 9 }}>
                REMEDIOS ACABARAM
              </Text>
            </View>
          </Body>
        </ListItem>
      );
    } else {
      ViewItem = (
        <ListItem>
          <View style={{ alignSelf: 'flex-start', backgroundColor: Styles.colorPrimary, elevation: 2, justifyContent: 'center', borderRadius: 25, height: 50, width: 50, alignItens: 'center' }} >
            <Icon name='plus' size={25} color='#FFF' style={{ marginLeft: 15 }} />
          </View>
        </ListItem>
      );
    }
    const colorDarker = colorDarkerAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1]
    });
    const spring = colorDarkerAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.01]
    });
    return (
      <View style={{ marginTop: 20 }}>
      <Text style={styles.textoCompartimento}>
        Compartimento {compartimento}
        </Text>
      <Animated.View style={{ padding: 10, transform: [{ scale }] }}>
        {finalizado ? <View style={{ position: 'absolute', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', alignSelf: 'center', borderRadius: 20, elevation: 2, top: 10 }}>
          <Animated.Text style={{ color: '#FFF', fontWeight: '500', opacity: colorDarker, transform: [{ scale: spring }] }}>
            Remedios acabaram
          </Animated.Text>
        </View> : null}
        <View style={{ alignSelf: 'center', width: '100%', borderRadius: 20, elevation: 2, backgroundColor: '#FFF', opacity: finalizado ? 0.3 : null }}>
          <TouchableWithoutFeedback disabled={disabled} onPressIn={() => this.animateIn()} onPressOut={() => this.animateOut()} onPress={() => onPress()}>
            {ViewItem}
          </TouchableWithoutFeedback>
        </View>
      </Animated.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textoCompartimento: {
    alignSelf: 'center',
    color: Styles.colorPrimary,
    fontSize: 14,
    borderBottomWidth: 0.5,
    borderColor: '#CCC'
  }
});
