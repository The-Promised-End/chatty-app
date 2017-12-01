import React, { Component } from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
      username: 'Bob'
    }
    this.onEnterKey = this.onEnterKey.bind(this);
    this.onNewContent = this.onNewContent.bind(this);
    this.onNewUser = this.onNewUser.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    // this.newChatMessage = this.newChatMessage.bind(this);
  }

  onNewUser(event) {
    this.setState({
      username: event.target.value
    });
  }
  onNewContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  onUsernameChange(event){

    var newUsername = this.state.username;

    if(event.key == 'Enter'){
      var newMessage = {
        newUsername: newUsername,
        type: 'Notification'
      }

      this.props.newChatMessage(newMessage);

      this.setState({
        content: '',
        username: newUsername
      });
    }

  }

  //used to send the new message
  onEnterKey(event) {
    if(event.key == 'Enter'){

      this.props.newChatMessage({
        content: this.state.content,
        username: this.state.username,
        type: 'NewMessage'
      });
      this.setState({
        content: '',
        username: this.state.username
      });
    }
  }

  render() {
    const user = this.props.currentUser.name;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={ user }
        onChange={this.onNewUser} value = {this.state.username} onKeyPress={this.onUsernameChange} />

        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          onChange={this.onNewContent} value={this.state.content}
          onKeyPress={this.onEnterKey} />
      </footer>
    );
  }
}

export default ChatBar;