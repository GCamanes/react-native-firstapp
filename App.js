/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View } from 'react-native';
import { AppState, NetInfo } from 'react-native'
import { Image, TouchableHighlight, ScrollView, Share, TextInput } from 'react-native'
import MyButton from './components/button'

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

const imgLinkSW = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1200px-Star_Wars_Logo.svg.png"
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      appState: AppState.currentState,
      isConnected: true,
      email: "",
      emailAlertShow: true
    }
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
    this._handleConnectivityChange = this._handleConnectivityChange.bind(this);
    this._handlEmailInput = this._handlEmailInput.bind(this);
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
  }

  _onImgPress(message) {
    Share.share({message: message, title: "test share", url: imgLinkSW});
  }

  _handlEmailInput(text) {
    this.setState({
      email: text,
      emailAlertShow: !EMAIL_REGEX.test(text)
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>{instructions}</Text>
        <Text>Current OS is: {workingOS}</Text>
        <Text>Connectivity: {(this.state.isConnected) ? ("connected") : ("not connected")}</Text>

        <MyButton />

        <TextInput keyboardType="email-address"
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this._handlEmailInput(text)}
        />

        {
          (this.state.emailAlertShow) ? (
            <View style={{backgroundColor: 'red'}} hide={this.state.emailAlertHide}>
              <Text style={{color: 'white'}}>email not valid !</Text>
            </View>
          ) : (
            null
          )
        }

        <ScrollView>
          <TouchableHighlight onPress={() => this._onImgPress("image boba fett")}>
            <Image
              style={{width: 100, height: 100}}
              source={require('./assets/bobafett.jpg')}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._onImgPress("image star wars")}>
            <Image
              style={{width: 170, height: 100}}
              source={{uri:imgLinkSW }}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._onImgPress("image boba fett")}>
            <Image
              style={{width: 100, height: 100}}
              source={require('./assets/bobafett.jpg')}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._onImgPress("image star wars")}>
            <Image
              style={{width: 170, height: 100}}
              source={{uri:imgLinkSW }}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._onImgPress("image boba fett")}>
            <Image
              style={{width: 100, height: 100}}
              source={require('./assets/bobafett.jpg')}
            />
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this._onImgPress("image star wars")}>
            <Image
              style={{width: 170, height: 100}}
              source={{uri:imgLinkSW }}
            />
          </TouchableHighlight>
        </ScrollView>
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
