import React, { Component } from 'react';
import './App.css';
import ChatWindow from './chat-window.js';
import ChatWidget from './chat-widget.js';
import Messenger from './messenger.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Messenger />

          {/* <ChatWindow />  */}

          {/* <ChatWidget /> */}
        </header>
      </div>
    );
  }
}

export default App;
