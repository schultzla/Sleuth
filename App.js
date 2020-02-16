import React, { Component } from 'react';
import { Keyboard, Text, TextInput, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment';
import Filter from 'bad-words';
import DropdownAlert from 'react-native-dropdownalert';

export default class App extends Component {
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

    this.getMessages = this.getMessages.bind(this);
  }

  validateAuthor = () => {
    const { author } = this.state;
    if (author.match('(?!^ +$)^.+$') == null) {
      this.setState({
        authorError: author.length > 0 ? "Author must be 3 characters" : null
      },
        function () {
          this.dropDownAlertRef.alertWithType('error', 'Error', this.state.authorError);
        })
    } else {
      this.setState({
        authorError: author.length > 0 ? (author.length < 3 ? 'Author must be more than 3 characters' : null) : null
      },
        function () {
          if (author.length < 3 && author.length > 0) {
            this.dropDownAlertRef.alertWithType('error', 'Error', this.state.authorError);
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
        messageError: "Message is empty",
        error: true
      },
        function () {
          this.dropDownAlertRef.alertWithType('error', 'Error', this.state.messageError);
        }
      );
      return true;
    } else {
      this.setState({
        messageError: message.length <= 0 ? (message.length > 140 ? 'Message must be less than 140 characters' : 'Message is empty') : null,
        error: message.length <= 0 ? (message.length > 140 ? true : true) : false
      })
    }

    if (message.length > 0 && message.length < 140) {
      return false;
    } else {
      return true;
    }
  }

  addMessage = event => {
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
        })
        .catch(error => console.log(error))
      this.message = ""
      this.author = ""
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

  render() {
    return (
      <View
        style={{ flex: 1, alignItems: "center", backgroundColor: "#282c34" }}
      >
        <FontAwesomeIcon style={{ marginTop: '10%' }} size={70} color={'#FFC106'} icon={faUserSecret} />

        <TextInput
          style={{ marginTop: 20, padding: 5, height: 40, width: '85%', textAlign: "left", borderRadius: 5 }}
          backgroundColor="#333940"
          placeholderTextColor="#6C757D"
          placeholder="Username (Optional)"
          selectionColor="#FFC106"
          onChangeText={(author) => { this.updateAuthor(author) }}
        />

        <TextInput
          style={{ color: "#ffffff", padding: 5, width: '85%', textAlign: "left", borderRadius: 5, marginVertical: 10, height: 150 }}
          multiline={true}
          placeholderTextColor="#6C757D"
          backgroundColor="#333940"
          placeholder="Message"
          selectionColor="#FFC106"
          onChangeText={(message) => { this.updateMessage(message) }}

        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.addMessage}
        >
          <Text> Submit </Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.messages}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={item => item._id}
          style={{ width: '85%' }}
          showsVerticalScrollIndicator={false}
        >
        </FlatList>

        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#FFC106',
    padding: 10,
    width: '85%',
    borderRadius: 5,
    marginBottom: 20
  },
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