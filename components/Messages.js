import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet, FlatList, Button, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';

export default class Messages extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      refreshing: false
    };

    this.getMessages = this.getMessages.bind(this);
  }

  render() {
    return (
      <View style={this.props.viewStyle}>
        <FlatList
          data={this.state.messages}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item._id}
          style={{ width: '85%', marginTop: '5%' }}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.refreshing}
          onRefresh={this.getMessages}
        >
        </FlatList>
      </View>
    );
  }

  capMessages() {
    if (this.state.messages.length > 25) {
      var extras = this.state.messages.splice(25, this.state.messages.length - 1);
      extras.map(val => {
        return fetch('/api/v1/messages/' + val._id, {
          method: 'DELETE'
        })
          .then(data => data.json())
          .catch(error => console.log(error))
      })

    }
  }

  async getMessages() {
    if (this._isMounted) {
      this.capMessages();
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333940',
    borderRadius: 5,
    padding: 20,
    width: "100%",
    marginBottom: 10
  }
})

function Item({ item }) {
  return (
    <TouchableWithoutFeedback >
      <View style={styles.card}>
        <Text style={{ color: "#ffffff", textAlign: 'center', padding: 10 }}>{item.message}</Text>
        <Text style={{ color: "#6C757D", textAlign: 'center' }}>{this.date(item.date)} from {item.author}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

date = (messageDate) => {
  var end = moment();
  var start = moment(messageDate);
  return start.from(end);
}