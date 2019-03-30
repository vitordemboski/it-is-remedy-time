import React, { Component } from 'react';
import {
  Image, Text,
  ScrollView, TouchableOpacity,
  TouchableHighlight, StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Container, Header, Right, Body, View, Drawer, Thumbnail } from 'native-base';
import {
  enviaMensagem
} from './actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Styles from '../../theme/variables/styles';
import Toast from 'react-native-simple-toast';
import logoSatc from '../../../assets/logo/logoSatc.png';
import SideBar from './SideMenu';
import Item from './Item';
import Usuario from '../../../assets/icones/usuario.png';

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

  closeDrawer = () => {
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };

  state = {
    refreshing: false,
  }
  
  onClickVisualizar = (item) => {
     alert('Nome: '+item.DESCRICAO+'\nTratamento: '+item.NOMETRATAMENTO);
  }

  render() {
    const {
      history,
      url,
      listaRemedio
    } = this.props;
    return (
      <Drawer
        ref={(ref) =>  this.drawer = ref }
        content={<SideBar history={history} navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}
        side='right'
        openDrawerOffset={0.4}
        panCloseMask={0.4}
      >
        <Container>
          <Header hasTabs noShadow style={{ height: 60, marginBottom: 10, backgroundColor: Styles.colorPrimary }}>
            <Body style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <Image source={logoSatc} style={{ width: 30, height: 34, resizeMode: 'contain' }} />
            </Body>
            <Right style={{ marginTop: 6, alignItems: 'center' }}>
              <View style={{ marginLeft: 10, flexDirection: 'row' }}>
                <Thumbnail source={Usuario} small />
              </View>
              <TouchableOpacity onPress={() => this.openDrawer()} style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 3, height: 50, width: 30 }}>
                <Icon name='navicon' size={18} color='#FFF' style={{ marginLeft: 10, opacity: 0.3 }} />
              </TouchableOpacity>
            </Right>
          </Header>
          <Container>
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, backgroundColor: '#FFF' }} >
              <View style={{ backgroundColor: Styles.backgroundList, flex: 1 }}>
                <View style={{ marginTop: 20 }}>
                  <Text style={styles.textoCompartimento}>
                    Compartimento 1
                  </Text>
                  <Item
                    item={listaRemedio[0]}
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
                    onPressNovo={() => history.push('/novo', { compartimento: 3 })}
                    onPressVisualizar={(item) => this.onClickVisualizar(item)}
                  />
                </View>
              </View>
            </ScrollView>
          </Container>
        </Container>
      </Drawer>
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
});

const AppPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

export default AppPage;
