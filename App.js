/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AppState} from 'react-native';
import { NetInfo } from 'react-native'

const workingOS = Platform.select({
  ios: 'iOS',
  android: 'android',
});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      isConnected: true
    }
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this._handleConnectivityChange = this._handleConnectivityChange.bind(this);
  }
  
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    NetInfo.isConnected.addEventListener('connectionChange', this._handleConnectivityChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    NetInfo.isConnected.removeEventListener('connectionChange', this._handleConnectivityChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  _handleConnectivityChange = isConnected => {
    this.setState({ isConnected: isConnected });
    console.log(this.state.isConnected);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text>Current state is: {this.state.appState}</Text>
        <Text>Current OS is: {workingOS}</Text>
        <Text>Connectivity: {(this.state.isConnected) ? ("connected") : ("not connected")}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
