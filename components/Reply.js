import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import * as RootNavigation from './RootNavigation.js';

export default class Reply extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.card}>
          <Text
            style={{
              color: "#6c757d"
            }}>
            {this.props.item.author}
          </Text>
          <Text
            style={{
              color: "#ffffff",
              marginTop: 5,
              marginBottom: 5
            }}>
            {this.props.item.message}
          </Text>
          <View style={styles.row}>
            <View style={styles.leftContainer}>
              <Text style={styles.date}>{this.date(this.props.item.date)}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  date = (messageDate) => {
    var end = moment();
    var start = moment(messageDate);
    return start.from(end);
  }
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333940',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginLeft: 10,
    marginRight: 10,

    elevation: 3,
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