import React, { Component } from 'react';
import './App.css';
import CustomerChat from './messenger.js';
import ChatWindow from './chat-window.js';
import ChatWidget from './chat-widget.js';
import Messenger from './messenger.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Messenger />
        </header>
        {/* <CustomerChat /> */}
        
        {/* <ChatWindow />  */}

        {/* <ChatWidget /> */}

      </div>
    );
  }
}

export default App;
