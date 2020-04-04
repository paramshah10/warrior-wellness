import React, { Component } from 'react';
import './App.css';
import CustomerChat from './messenger.js';
import ChatWindow from './chat-window.js';
import ChatWidget from './chat-widget.js';
import Messenger from './messenger.js'
import MessengerSendToMessenger from 'react-messenger-send-to-messenger';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Messenger />
          <MessengerSendToMessenger 
            pageId="100902811579573"
            appId="203947964382425"
            />
        </header>
        {/* <CustomerChat /> */}
        
        {/* <ChatWindow />  */}

        {/* <ChatWidget /> */}

      </div>
    );
  }
}

export default App;
