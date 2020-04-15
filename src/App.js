import React, { Component } from 'react';
import './App.css';
import ChatWindow from './chat-window - Firebase.js';
import ChatWidget from './chat-widget.js';
import Messenger from './messenger.js';

class App extends Component {
  render() {
    return (
      <div>
          {/* <Messenger /> */}

          <ChatWindow />

          {/* <ChatWidget /> */}
      </div>
    );
  }
}

export default App;
