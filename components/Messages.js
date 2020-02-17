import React, { Component } from 'react';
import { Dimensions, Text, View, StyleSheet, FlatList, Button, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333940',
    borderRadius: 5,
    width: "100%",
    padding: 10,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row'
  },
  date: {
    color: '#6C757D',
  },
  replies: {
    color: '#6C757D',
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
})

function Item({ item }) {
  return (
    <TouchableWithoutFeedback >
      <View style={styles.card}>
        <Text
          style={{
            color:"#6c757d"
          }}>
          {item.author}
        </Text>
        <Text
          style={{
            color: "#ffffff",
            marginTop: 5,
            marginBottom: 5
          }}>
          {item.message}
        </Text>
        <View style={styles.row}>
          <View style={styles.leftContainer}>
            <Text style={styles.date}>{this.date(item.date)}</Text>
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.row}>
              <FontAwesomeIcon style={{marginRight: 5}} color='#6c757d' icon='comment'/>
              <Text style={styles.replies}>{item.replies.length} {item.replies.length != 1 ? 'replies' : 'reply'}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

date = (messageDate) => {
  var end = moment();
  var start = moment(messageDate);
  return start.from(end);
}