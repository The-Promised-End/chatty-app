import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {

    /* [messageDataObjects].map(messageDataObject => messagePresentation) => [messagePresentation]*/
    const messageComponents = this.props.messages.map((message) => {
      return <Message
        content= {message.content}
        key={message.id}
        username={message.username}/>
    });
    return (
        <div className="messages">
          {messageComponents}
{/*          <div className="message system">
           Anonymous1 changed their name to nomnom.
           </div>*/}
       </div>
    )
  }
}
export default MessageList;
console.log("Rendering <MessageList />");