import React, { Component } from 'react';
import {
  Image, Text,
  ScrollView, TouchableOpacity,
  StyleSheet, Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Right, Body, View, Thumbnail, Spinner } from 'native-base';
import {
  finalizarRemedio
} from './actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../theme/variables/styles';
import Toast from 'react-native-simple-toast';
import logoSatc from '../../../assets/logo/logoSatc.png';
import SideBar from './SideMenu';
import Item from './Item';
import Usuario from '../../../assets/icones/usuario.png';
import SideMenu from 'react-native-side-menu';
import { Separador, Footer, MyCarousel } from '../../components';
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
import 'moment/locale/pt-br';

class App extends Component {

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    if (error) {
      Toast.show(error);
    }
    const { loading } = nextProps;
    if (!loading) {
      this.setState({ refreshing: false });
    }
  }

  state = {
    refreshing: false,
    menuIsOpen: false,
    tab: 0,
    datas: [],
    indiceMes: 0
  }
  compare(a, b) {
    if (moment(a.data).isBefore(b.data)) {
      return -1;
    }
    if (moment(a.data).isAfter(b.data)) {
      return 1;
    }
    // a deve ser igual a b
    return 0;
  }
  calculaDatas = (listaRemedio) => {
    let listaHistorico = [];

    if (listaRemedio[0].HISTORICO) {
      listaHistorico = listaHistorico.concat(listaRemedio[0].HISTORICO);
    }
    if (listaRemedio[1].HISTORICO) {
      listaHistorico = listaHistorico.concat(listaRemedio[1].HISTORICO);
    }
    if (listaRemedio[2].HISTORICO) {
      listaHistorico = listaHistorico.concat(listaRemedio[2].HISTORICO);
    }
    let listaData = [];
    let listaDataItem = [];

    listaHistorico.forEach((item) => {
      if (!listaData.includes(moment(item.data).format('DD/MM/YYYY'))) {
        const data = moment(item.data).format('DD/MM/YYYY');
        let arrayItens = []
        listaHistorico.forEach((item2) => {
          if (data === moment(item2.data).format('DD/MM/YYYY')) {
            arrayItens.push(item2);
          }
        });
        listaData.push(data);
        arrayItens = arrayItens.sort(this.compare);
        console.log(arrayItens);
        listaDataItem.push({ data, itens: arrayItens });
      }
    });
    console.log(listaDataItem)

    this.setState({ datas: listaDataItem });
  }

  onClickVisualizar = (item) => {
    this.props.history.push('/remedio', { item })
  }
  componentDidMount = () => {
    const { listaRemedio } = this.props;
    this.calculaDatas(listaRemedio)
  }

  onChangeTab = (tab) => {
    this.setState({ tab });
  }
  meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

  render() {
    const { history, url, listaRemedio, onFinalizarRemedio } = this.props;
    const { menuIsOpen, tab, datas, indiceMes } = this.state;

    let container = null;
    if (tab === 0) {
      container = (
        <View style={{ backgroundColor: Styles.backgroundList, flex: 1 }}>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.textoCompartimento}>
              Compartimento 1
              </Text>
            <Item
              item={listaRemedio[0]}
              onFinalizarRemedio={onFinalizarRemedio}
              onPressNovo={() => history.push('/novo', { compartimento: 1 })}
              onPressVisualizar={(item) => this.onClickVisualizar(item)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.textoCompartimento}>
              Compartimento 2
              </Text>
            <Item
              item={listaRemedio[1]}
              onFinalizarRemedio={onFinalizarRemedio}
              onPressNovo={() => history.push('/novo', { compartimento: 2 })}
              onPressVisualizar={(item) => this.onClickVisualizar(item)}
            />
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.textoCompartimento}>
              Compartimento 3
              </Text>
            <Item
              item={listaRemedio[2]}
              onFinalizarRemedio={onFinalizarRemedio}
              onPressNovo={() => history.push('/novo', { compartimento: 3 })}
              onPressVisualizar={(item) => this.onClickVisualizar(item)}
            />
          </View>
        </View>

      )
    } else {
      if (datas.length === 0) {
        container = (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#a3a3a3', fontWeight: 'bold', fontSize: 22, textAlign: 'center' }}>
              {'Voce não possue\ntratamentos em andamento'}
            </Text>
          </View>
        )
      } else {
        container = (
          <View style={{ backgroundColor: Styles.backgroundList, flex: 1 }}>
            <Carousel
              ref={(c) => this._carousel = c}
              data={datas}
              renderItem={MyCarousel}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width / 1.4}

            />
            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginBottom: '5%' }}>
              {indiceMes === 0 ? null : < TouchableOpacity onPress={() => this.setState({ indiceMes: indiceMes - 1 })}>
                <Icon name='chevron-left' size={20} />
              </TouchableOpacity>}
              <Text style={{ fontSize: 20, color: Styles.colorPrimary, width: '30%', textAlign: 'center', fontWeight: '500' }}>
                {this.meses[indiceMes]}
              </Text>
              {indiceMes === this.meses.length - 1 ? null : <TouchableOpacity onPress={() => this.setState({ indiceMes: indiceMes + 1 })}>
                <Icon name='chevron-right' size={20} />
              </TouchableOpacity>}
            </View>
          </View >
        )
      }

    }


    return (
      <SideMenu menuPosition='right' isOpen={menuIsOpen} onChange={(isOpen) => this.setState({ menuIsOpen: isOpen })}
        menu={<SideBar history={history} url={url} menuIsOpen={menuIsOpen}
          closeMenu={() => this.setState({ menuIsOpen: false })} />}>
        <Container>
          <Header hasTabs noShadow style={{ backgroundColor: Styles.colorPrimary }}>
            <Body style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Image source={logoSatc} style={{ width: 30, height: 34, resizeMode: 'contain' }} />
            </Body>
            <Right style={{ marginTop: 6, alignItems: 'center' }}>
              <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                <Thumbnail source={Usuario} small />
              </View>
              <TouchableOpacity onPress={() => this.setState({ menuIsOpen: true })} style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3, height: 50, width: 30 }}>
                <Icon name='navicon' size={18} color='#FFF' style={{ marginLeft: 10, opacity: 0.3 }} />
              </TouchableOpacity>
            </Right>
          </Header>
          <Container>
            <ScrollView
              style={{ backgroundColor: Styles.backgroundList }}
              contentContainerStyle={{ flexGrow: 1 }} >
              {container}
            </ScrollView>
          </Container>
          <Separador />
          <Footer tab={tab} onChangeTab={(tab) => this.onChangeTab(tab)} />
        </Container>
      </SideMenu>
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
})

const mapStateToProps = (state) => {
  const app = state.app;
  const config = state.config
  return {
    url: config.get('url'),
    loading: app.get('loading'),
    sucesso: app.get('sucesso'),
    error: app.get('error'),
    listaRemedio: app.get('listaRemedio')
  };
};

const mapDispatchToProps = (dispatch) => ({
  onFinalizarRemedio: (item) => dispatch(finalizarRemedio(item)),
});

const AppPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppPage;
