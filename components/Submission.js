import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import Filter from 'bad-words';

export default class Submission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      author: "",
      messages: [],
      messageError: null,
      authorError: null,
      error: false
    };
    this.messageInput = React.createRef();
    this.authorInput = React.createRef();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={this.props.viewStyle}>
          <TextInput
            style={{ color: "#ffffff", marginTop: '5%', padding: 5, height: 40, width: '85%', textAlign: "left", borderRadius: 5 }}
            backgroundColor="#333940"
            placeholderTextColor="#6C757D"
            placeholder="Username (Optional)"
            selectionColor="#FFC106"
            onChangeText={(author) => { this.updateAuthor(author) }}
            ref={this.authorInput}
            enablesReturnKeyAutomatically={true}
            keyboardAppearance='dark'
          />

          <TextInput
            style={{ color: "#ffffff", padding: 5, width: '85%', textAlign: "left", borderRadius: 5, marginVertical: 10, height: 150 }}
            multiline={true}
            placeholderTextColor="#6C757D"
            backgroundColor="#333940"
            placeholder="Message"
            selectionColor="#FFC106"
            onChangeText={(message) => { this.updateMessage(message) }}
            ref={this.messageInput}
            enablesReturnKeyAutomatically={true}
            keyboardAppearance='dark'
            maxLength={140}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={this.addMessage}
          >
            <Text> Submit </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  validateAuthor = () => {
    const { author } = this.state;
    if (author.match('(?!^ +$)^.+$') == null) {
      this.setState({
        authorError: author.length > 0 ? "Author must be 3 characters" : null
      },
        function () {
          if (author.length > 0) {
            this.props.dropdown.alertWithType('error', 'Error', this.state.authorError);
          }
        })
    } else {
      this.setState({
        authorError: author.length > 0 ? (author.length < 3 ? 'Author must be more than 3 characters' : null) : null
      },
        function () {
          if (author.length < 3 && author.length > 0) {
            this.props.dropdown.alertWithType('error', 'Error', this.state.authorError);
          }
        })
    }

    if (author.length === 0) {
      return false;
    } else {
      return author.length < 3;
    }
  }

  validateMessage = () => {
    const { message } = this.state;
    if (message.match('(?!^ +$)^.+$') == null) {
      this.setState({
        messageError: "Message contains illegal spaces",
        error: true
      },
        function () {
          this.props.dropdown.alertWithType('error', 'Error', this.state.messageError);
        }
      );
      return true;
    } else {
      this.setState({
        messageError: message.length <= 0 ? (message.length > 140 ? 'Message must be less than 140 characters' : 'Message is empty') : null,
        error: message.length <= 0 ? (message.length > 140 ? true : true) : false
      },
        function () {
          if (message.length > 140) {
            this.props.dropdown.alertWithType('error', 'Error', this.state.messageError);
          }
        }
      );
    }

    if (message.length > 0 && message.length < 140) {
      return false;
    } else {
      return true;
    }
  }

  addMessage = () => {
    Keyboard.dismiss();
    var valMsg = this.validateMessage();
    var valAuth = this.validateAuthor();
    if (valMsg || valAuth) {
      return;
    } else {
      var filter = new Filter()
      fetch('https://anon.logamos.pw/api/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: filter.clean(this.state.message),
          author: this.state.author === "" ? "Anonymous" : filter.clean(this.state.author)
        })
      })
        .then(data => data.json())
        .then(result => {
          this.setState({ messages: [result, ...this.state.messages] })
          this.props.dropdown.alertWithType('success', 'Posted', "Message posted!");
        })
        .catch(error => {
          console.log(error)
          this.props.dropdown.alertWithType('error', 'Error', error);
        })
      this.messageInput.current.clear();
      this.authorInput.current.clear();
      this.setState({
        message: "",
        author: "",
        error: true
      })
    }
  }

  updateMessage = (message) => {
    this.setState({
      message: message,
      error: false,
      messageError: null
    });
  }

  updateAuthor = (author) => {
    this.setState({
      author: author,
      error: false,
      authorError: null
    });
  }

}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFC106',
    padding: 10,
    width: '85%',
    borderRadius: 5
  }
})