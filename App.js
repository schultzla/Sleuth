import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faUserSecret, faComments, faComment } from '@fortawesome/free-solid-svg-icons'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Feed from './components/Feed';
import Submission from './components/Submission';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { navigationRef } from './components/RootNavigation';
import DetailedMessage from './components/DetailedMessage';
import DropdownAlert from 'react-native-dropdownalert';
import DropDown from './components/DropDown';

library.add(faUserSecret, faEdit, faComments, faComment)

const Stack = createStackNavigator();

export default class App extends Component {

  render() {
    return (
      <NavigationContainer ref={navigationRef}>
        <Header/>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}
          initialRouteName='Feed'>
          <Stack.Screen name="Feed" component={Feed}/>
          <Stack.Screen name='Post' component={Submission} options={{
            gestureEnabled: false
          }} />
          <Stack.Screen name='Reply' component={DetailedMessage}/>
        </Stack.Navigator>

        <NavBar/>

        <DropdownAlert ref={(ref) => DropDown.setDropDown(ref)} />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#282c34'
  },
  nav: {
    width: '100%'
  }
})