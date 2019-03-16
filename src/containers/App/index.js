import React, { Component } from 'react';
import {
  StyleSheet, Text, Image,
  ScrollView, TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Tab, Tabs, Right, Body, Fab, Button, View, Drawer } from 'native-base';
import {
  enviaMensagem
} from './actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../theme/variables/styles';
import Toast from 'react-native-simple-toast';
import logoSatc from '../../../assets/logo/logoSatc.png';
import Pesquisar from './Pesquisar';
import SideBar from '../Config';
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

  onChangePesquisar = () => {
    this.setState({ pesquisar: !this.state.pesquisar, textoPesquisa: '' });
  }

  changeTab = (tab) => {
    if (tab.i === 0) {

    } else if (tab.i === 1) {

    }
  }

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };

  state = {
    refreshing: false,
    pesquisar: false,
    textoPesquisa: ''
  }

  onChangeTextPesq = (texto) => {
    this.setState({ textoPesquisa: texto });
  }

  render() {
    const {
      history,
      url
    } = this.props;
    const { pesquisar, textoPesquisa } = this.state;
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} >
        <Container>
          {pesquisar ?
            <Header hasTabs noShadow style={{ marginBottom: 0 }}>
              <Pesquisar onChangeTextPesq={(texto) => this.onChangeTextPesq(texto)} textoPesquisa={textoPesquisa}
                onBack={() => this.onChangePesquisar()} />
            </Header>
            : (<Header hasTabs noShadow style={{ marginBottom: 10 }}>
              <Body style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.openDrawer()} style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3, height: 50, width: 30 }}>
                  <Icon name='navicon' size={18} color='#000' style={{ opacity: 0.3 }} />
                </TouchableOpacity>
              </Body>
              <Right style={{ marginTop: 6, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.onChangePesquisar()} style={{ alignItems: 'center', justifyContent: 'center', height: 50, width: 30 }}>
                  <Icon name='search' size={18} color='#000' style={{ opacity: 0.3 }} />
                </TouchableOpacity>
                <View style={{ marginLeft: 10, marginTop: 5 }}>
                  <Image source={logoSatc} style={{ width: 30, height: 34, resizeMode: 'contain' }} />
                </View>
              </Right>
            </Header>)}
          <Container>
            <Tabs tabBarBackgroundColor='transparent' tabBarUnderlineStyle={{
              backgroundColor: Styles.tabBarUnderlineStyle, width: '20%', marginLeft: '11%', height: 3
            }}
              locked onChangeTab={this.changeTab}>
              <Tab heading='Á Tomar' activeTextStyle={styles.textoAtivado} textStyle={styles.texto}>
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }} >
                  <View style={{ backgroundColor: Styles.backgroundList, flex: 1 }}>

                  </View>
                </ScrollView>
              </Tab>
              <Tab heading='Tomadas' activeTextStyle={styles.textoAtivado} textStyle={styles.texto}>
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }} >
                  <View style={{ backgroundColor: Styles.backgroundList, flex: 1 }}>

                  </View>
                </ScrollView>
              </Tab>
            </Tabs>
            <Fab onPress={() => { }}>
              <Icon name='plus' />
            </Fab>
          </Container>
        </Container>
      </Drawer>
    );
  }
}
const styles = StyleSheet.create({
  textoAtivado: {
    color: '#080808',
    fontSize: 14,
    fontWeight: 'bold'
  },
  texto: {
    color: '#080808',
    fontSize: 14,
  },
  topLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  }
});

const mapStateToProps = (state) => {
  const app = state.app;
  const config = state.config
  return {
    url: config.get('url'),
    loading: app.get('loading'),
    sucesso: app.get('sucesso'),
    error: app.get('error'),
  };
};

const mapDispatchToProps = (dispatch) => ({
  onEnviarMensagem: (msg) => dispatch(loadRecebidas(msg)),
});

const AppPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppPage;
