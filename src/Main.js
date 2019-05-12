import React, { Component } from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, AndroidBackButton } from 'react-router-native';
import { Provider } from 'react-redux';
import store from './store';
import getTheme from './theme/components';
import { StyleProvider, Root } from 'native-base';
import pfi from './theme/variables/pfi';

import App from './containers/App';
import Config from './containers/Config';
import Splash from './containers/Splash';
import NovoRemedio from './containers/Remedio/NovoRemedio';
import Remedio from './containers/Remedio/VisualizarRemedio';

export default class Main extends Component {



  render() {
    return (
      <StyleProvider style={getTheme(pfi)}>
        <Provider store={store}>
          <Root>
            <NativeRouter >
              <View style={{ flex: 1 }}>
                <AndroidBackButton />
                <Route exact path="/" component={Splash} />
                <Route exact path="/app" component={App} />
                <Route exact path="/config" component={Config} />
                <Route exact path="/novo" component={NovoRemedio} />
                <Route exact path="/remedio" component={Remedio} />
              </View>
            </NativeRouter>
          </Root>
        </Provider>
      </StyleProvider>
    );
  }
}
