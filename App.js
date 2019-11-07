/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Users from './screens/Users';
import Join from './screens/Join';
import Add from './screens/Add'
import Edit from './screens/Edit'
import Welcome from './screens/Welcome'

const AppNavigator = StackNavigator({
  Welcome: { screen: Welcome
},
  ScreenOne: { screen: Users},
  Join: { screen: Join},
  ScreenTwo: { screen: Add},
  ScreenThree: {screen: Edit}
}, { headerMode: 'none' })

export default class App extends Component {
  render() {
    return (
      <AppNavigator />
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
