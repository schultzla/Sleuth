import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      author: ''
    };
  }

  render() {
    return (
      <View 
        style={{ flex: 3, paddingTop: 200, alignItems: "center", backgroundColor: "#282c34" }}
      >
        <TextInput 
          style={{ padding: 5, height: 40, width: 350, textAlign: "left", borderRadius: 5 }} 
          backgroundColor="#333940" 
          placeholderTextColor="#6C757D" 
          placeholder="Username (Optional)" 
        />
        <TextInput 
          style={{ color: "#ffffff", padding: 5, height: 40, width: 350, textAlign: "left", borderRadius: 5, marginVertical: 10, height: 200 }} 
          multiline={true} 
          placeholderTextColor="#6C757D" 
          backgroundColor="#333940" 
          placeholder="Message" 
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.onPress}
        >
          <Text> Submit </Text>
        </TouchableOpacity>
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