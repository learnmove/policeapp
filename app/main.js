import React, { Component } from 'react';
import {Provider} from 'react-redux'
import {Router} from 'react-native-router-flux'
import store from './AppContainer/store/store'
import scenes from './AppContainer/scene'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default class Main extends Component {
  render(){
    return(
      <Provider store={store()}>
        <Router scenes={scenes}></Router>
      </Provider>
    )
  }
}
