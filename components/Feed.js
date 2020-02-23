import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import Messages from './Messages';


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