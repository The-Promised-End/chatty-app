import React, { Component } from 'react';

import home from '../styles/home.scss';
import NavBar from './Navbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = null;
    this.state = {
      currentUser: {
        name: 'Bob'
      }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      userCount: 0
    };
    this.newChatMessage = this.newChatMessage.bind(this);
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.addEventListener('message', msg => {
      const message = JSON.parse(msg.data);

      switch (message.type) {
        case 'UserCount':
          this.setState({ userCount: message.userCount });
          break;
        default:
          this.setState({ messages: [...this.state.messages, message] });
      }
    });
  }

  sendPayload(data) {

    this.socket.send(JSON.stringify(data));
  }

  sendMessage(content) {
    this.sendPayload({
      type: 'message',
      content,
      username: this.state.currentUser.name
    });
  }

  sendNotification(content) {
    this.sendPayload({
      type: 'notification',
      content,
      username: this.state.currentUser.name
    });
  }

  newChatMessage(content) {
    var tempMessage = content;

    //if condition for the Notification where user name changes its name from old to new
    if (tempMessage.type === 'Notification') {
      this.sendNotification(
        this.state.currentUser.name +
          ' has changed named to ' +
          content.newUsername
      );
      this.state.currentUser.name = content.newUsername;
    } else if (tempMessage.type === 'NewMessage') {
      this.sendMessage(content.content);
    }
  }

  render() {
    return (
      <div>
        <nav className='navbar'>
          <a href='/' className='navbar-brand'>
            Chatty
          </a>
          <a href='/' className='navbar-count'>
            {this.state.userCount} users currently online
          </a>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          newChatMessage={this.newChatMessage}
        />
      </div>
    );
  }
}

export default App;