import React, { Component } from "react";
import { View, StyleSheet } from 'react-native';
import Message from './Message'
import Replies from './Replies'

export default class DetailedMessage extends Component {

  constructor(props) {
    super(props)
    this.style = props.route.params.style
  }

  render() {
    return (
      <View style={styles.view}>
        <View style={{flex: 1, width: '100%', marginTop: '5%'}}>
          <Message clickable={false} item={this.props.route.params.item} />
          
          <Replies item={this.props.route.params.item} style={{ flex: 1, width: '100%', marginTop: '5%' }}/>
        </View>
      </View>
    )
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