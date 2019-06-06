import React, { Component } from 'react';
import { View, Image, StatusBar, AsyncStorage } from 'react-native';
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import { Container, Content, Text } from 'native-base';
import { API_URL } from '../../sdk/constants';
import { loadUrl } from '../Config/actions';
import logoSatc from '../../../assets/logo/logoSatcCinza.png';
import logoIcone from '../../../assets/logo/ic_launcher.png';
import { loadRemedio, enviaMensagem } from '../App/actions';
import NotifService from '../../PushConfig';

class Splash extends Component {

  constructor(props) {
    super(props);
    this.notif = new NotifService(this.onRegis.bind(this), this.onNotif.bind(this));
  }

  onRegis = (token) => {
    console.log(token);
  }

  onNotif(notif) {
    const { onEnviaMensagem } = this.props;
    onEnviaMensagem(notif.data.compartimento);
    console.log(notif);
    console.log('mensagem', notif.data.compartimento);
  }

  state = {
    page: '/',
    timer: false,
  }

  componentWillMount() {
    this.setState({ page: '/app' });
  }

  componentDidMount = async () => {
    const { onLoadUrl, onLoadRemedio } = this.props;
    setTimeout(() => (this.setState({ timer: true })), 2000);
    const lista = await AsyncStorage.getItem('listaRemedio');
    if (lista === null) {
      AsyncStorage.setItem('listaRemedio', JSON.stringify([{}, {}, {}]));
    } else {
      onLoadRemedio(JSON.parse(lista));
    }
    const url = await API_URL();
    onLoadUrl(url);
  }

  render() {
    const { page, timer } = this.state;
    const redirectPage = ((page != '/') && (timer)) ? (<Redirect to={page} />) : null;

    return (
      <Container>
        {redirectPage}
        <StatusBar hidden={true} />
        <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' }}>
          <View style={{ alignItems: 'center',  justifyContent: 'center' }}>
            <Image source={logoIcone} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
          </View>
          <View style={{ marginTop: '10%', elevation: 1 }}>
            <Text style={{ color: '#aaaaaa', fontSize: 25, fontWeight: 'bold', letterSpacing: 1.5 }}>It's remedy time</Text>
          </View>
        </Content>
      </Container>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLoadUrl: (url) => dispatch(loadUrl(url)),
  onLoadRemedio: (listaRemedio) => dispatch(loadRemedio(listaRemedio)),
  onEnviaMensagem: (compartimento) => dispatch(enviaMensagem(compartimento))
});

const SplashPage = connect(
  null,
  mapDispatchToProps,
)(Splash);

export default SplashPage;
