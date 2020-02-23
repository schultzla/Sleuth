import React, { Component } from 'react';
import { Dimmensions, TouchableOpacity, Text, View, StyleSheet, FlatList, Button, TouchableWithoutFeedback, Modal, Dimensions } from 'react-native';
import Message from './Message'

export default class Messages extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      refreshing: false
    };
    
    this.getMessages = this.getMessages.bind(this);
    this.listRef = React.createRef();
  }

  render() {
    return (
      <View style={this.props.viewStyle}>

        <FlatList
          data={this.state.messages}
          renderItem={({ item }) => <Message clickable={true} item={item}/>}
          keyExtractor={item => item._id}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.refreshing}
          onRefresh={this.getMessages}
          ref={this.listRef}
        >
        </FlatList>
      </View>
    );
  }

  async getMessages() {
    if (this._isMounted) {
      try {
        this.setState({
          refreshing: true
        })
        const allMessages = [];
        await fetch('https://anon.logamos.pw/api/v1/messages')
          .then((response) => response.json())
          .then((responseJson) => {
            allMessages.push(...responseJson);
            allMessages.sort((a, b) => (a.time > b.time ? 1 : -1));
          })
        this.setState({
          messages: allMessages,
          refreshing: false
        })
      } catch (e) {
        console.log(e);
        this.setState({
          refreshing: false
        })
      }

    }
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.getMessages();
  }

  componentWillUnmount = () => {
    this._isMounted = false;
  }
}