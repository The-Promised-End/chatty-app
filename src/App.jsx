import React, { Component } from 'react';

import home from '../styles/home.scss';
import NavBar from './Navbar.jsx';
import Message from './Message.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: 1
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: 2
        }
      ]
    }
    this.newChatMessage = this.newChatMessage.bind(this);
  }


  componentWillMount() {

  }


  newChatMessage(content) {
    console.log("we are able to receive the content ",content);
    const id = this.state.messages[this.state.messages.length - 1].id + 1
    console.log('id',id);
    const newMessage = {id: id, username: "thomas", content: content.content};
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})
  }

  render() {
    console.log("Rendering <App/>");
    return (
      <div>
        <NavBar />
        <MessageList messages={ this.state.messages }/>
        <ChatBar currentUser={ this.state.currentUser}
          newChatMessage={this.newChatMessage} />
      </div>
    );
  }

}

export default App;