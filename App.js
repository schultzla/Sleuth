import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      author: '',
      messages: []
    };
  }

  componentDidMount() {
    try {
      const allMessages = [];
      fetch('https://anon.logamos.pw/api/v1/messages')
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

  render() {
    return (
      <View
        style={{ flex: 3, paddingTop: 100, alignItems: "center", backgroundColor: "#282c34" }}
      >
        <FontAwesomeIcon size={70} color={'#FFC106'} icon={faUserSecret} />
        <TextInput
          style={{ marginTop: 20, padding: 5, height: 40, width: 350, textAlign: "left", borderRadius: 5 }}
          backgroundColor="#333940"
          placeholderTextColor="#6C757D"
          placeholder="Username (Optional)"
          selectionColor="#FFC106"
        />
        <TextInput
          style={{ color: "#ffffff", padding: 5, width: 350, textAlign: "left", borderRadius: 5, marginVertical: 10, height: 150 }}
          multiline={true}
          placeholderTextColor="#6C757D"
          backgroundColor="#333940"
          placeholder="Message"
          selectionColor="#FFC106"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text> Submit </Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.messages}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item._id}
        >

        </FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFC106',
    padding: 10,
    width: 350,
    borderRadius: 5
  }
})

function Item({ item }) {
  return (
    <View>
      <Text>{item.message}</Text>
    </View>
  );
}