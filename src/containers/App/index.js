import React, { Component } from 'react';
import {
  Image, Text,
  ScrollView, TouchableOpacity,
  TouchableHighlight, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Right, Body, View, Thumbnail } from 'native-base';
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
import { Separador, Footer } from '../../components';

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
    tab: 0
  }

  onClickVisualizar = (item) => {
    this.props.history.push('/remedio', { item })
  }
  onChangeTab = (tab) => {
    this.setState({ tab });
  }

  render() {
    const { history, url, listaRemedio, onFinalizarRemedio } = this.props;
    const { menuIsOpen, tab } = this.state;
    return (
      <SideMenu menuPosition='right' isOpen={menuIsOpen} onChange={(isOpen) => this.setState({ menuIsOpen: isOpen })}
        menu={menuIsOpen ? (<SideBar history={history} url={url} menuIsOpen={menuIsOpen}
          closeMenu={() => this.setState({ menuIsOpen: false })} />) : null}>
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
