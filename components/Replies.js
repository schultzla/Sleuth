import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Reply from './Reply'

export default class Replies extends Component {
  _isMounted = false;

  constructor(props) {
    super(props)

    this.state = {
      replies: [],
      refreshing: false
    }

    this.getReplies = this.getReplies.bind(this);
  }

  async getReplies(refresh) {
    if (this._isMounted) {
      try {
        this.setState({
          refreshing: refresh
        })
        const allReplies = [];
        await fetch('https://anon.logamos.pw/api/v1/messages/' + this.props.item._id)
          .then((response) => response.json())
          .then((responseJson) => {
            allReplies.push(...responseJson.replies);
            allReplies.sort((a, b) => (a.time > b.time ? 1 : -1));
          })
        this.setState({
          replies: allReplies,
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

  componentDidMount() {
    this._isMounted = true;
    this.getReplies(false);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <View style={this.props.style}>
        <FlatList
          data={this.state.replies}
          renderItem={({ item }) => <Reply item={item} />}
          keyExtractor={item => item._id}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
          refreshing={this.state.refreshing}
          onRefresh={() => {this.getReplies(true)}}
        >
        </FlatList>
      </View>
    )
  }
}