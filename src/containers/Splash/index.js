import React, { Component } from 'react';
import { View, Image, StatusBar } from 'react-native';
import { Redirect } from 'react-router-native';
import { connect } from 'react-redux';
import { Container, Content, Text } from 'native-base';
import { API_URL } from '../../sdk/constants';
import { loadUrl } from '../Config/actions';
import logoSatc from '../../../assets/logo/logoSatcCinza.png';
import satc from '../../../assets/satc/satc.png';

class Splash extends Component {
  state = {
    page: '/',
    timer: false,
  }

  componentWillMount() {
    this.setState({ page: '/app' });
  }

  componentDidMount = async () => {
    const { onLoadUrl } = this.props;
    const url = await API_URL();
    onLoadUrl(url);
    setTimeout(() => (this.setState({ timer: true })), 2500);
  }

  render() {
    const { page, timer } = this.state;
    const redirectPage = ((page != '/') && (timer)) ? (<Redirect to={page} />) : null;

    return (
      <Container>
        {redirectPage}
        <StatusBar hidden={true} />
        <Content contentContainerStyle={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
          <View style={{ alignItems: 'center', position: 'absolute', justifyContent: 'center' }}>
            <Image source={satc} style={{ width: 200, height: 200, resizeMode: 'contain' }} />
          </View>
          <View style={{
            flex: 1, flexDirection: 'row', paddingLeft: 20, paddingRight: 20, paddingBottom: 70,
            alignItems: 'flex-end'
          }}>
            <View style={{
              borderWidth: 1, borderColor: "#dcdcdc", borderRadius: 8,
              opacity: 0.71, flexDirection: 'row', paddingLeft: 20, paddingTop: 15, paddingBottom: 15, paddingRight: 20
            }}>
              <Image source={logoSatc} style={{ width: 30, height: 34, marginRight: 20, resizeMode: 'contain' }} />
              <View>
                <Text style={{ color: "#aaaaaa", fontSize: 14, letterSpacing: 0.16 }}>Um produto</Text>
                <Text style={{ color: "#aaaaaa", fontSize: 14, letterSpacing: 0.16 }}>Faculdade Satc</Text>
              </View>
            </View>
          </View>
        </Content>
      </Container>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLoadUrl: (url) => dispatch(loadUrl(url)),
});

const SplashPage = connect(
  null,
  mapDispatchToProps,
)(Splash);

export default SplashPage;