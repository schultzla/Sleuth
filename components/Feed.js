import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Messages from './Messages';
import DropdownAlert from 'react-native-dropdownalert';


export default class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Feed'
    }
  }

  render() {
    return (
      <View style={styles.view}>

        <Messages viewStyle={styles.view} />

        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </View>
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