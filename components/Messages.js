import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import moment from 'moment';

export default class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: []
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
        >
        </FlatList>

      </View>
    );
  }

  async getMessages() {
    try {
      const allMessages = [];
      await fetch('https://anon.logamos.pw/api/v1/messages')
        .then((response) => response.json())
        .then((responseJson) => {
          allMessages.push(...responseJson);
          allMessages.sort((a, b) => (a.time > b.time ? 1 : -1));
        })
      this.setState({
        messages: allMessages
      })
    } catch (e) {
      console.log(e);
    }
  }

  componentDidMount = () => {
    this.getMessages();
    setInterval(this.getMessages, 5000)
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
    <View style={styles.card}>
      <Text style={{ color: "#ffffff", textAlign: 'center', padding: 10 }}>{item.message}</Text>
      <Text style={{ color: "#6C757D", textAlign: 'center' }}>{this.date(item.date)} from {item.author}</Text>
    </View>
  );
}

date = (messageDate) => {
  var end = moment();
  var start = moment(messageDate);
  return start.from(end);
}