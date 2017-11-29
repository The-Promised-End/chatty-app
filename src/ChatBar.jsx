import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ''
    }
    this.onEnterKey = this.onEnterKey.bind(this);
    this.onNewContent = this.onNewContent.bind(this);
    // this.newChatMessage = this.newChatMessage.bind(this);
  }

  onNewContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  onEnterKey(event) {
    if(event.key == 'Enter'){
      this.props.newChatMessage({content: this.state.content});
      this.setState({content: ''});
    }
  }

  render() {
    const user = this.props.currentUser.name;
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder={ user } />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER"
          onChange={this.onNewContent} value={this.state.content}
          onKeyPress={this.onEnterKey} />
      </footer>
    );
  }
}

export default ChatBar;