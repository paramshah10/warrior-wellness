import React, {Component} from 'react';
import {Launcher} from 'react-chat-window';
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";



//class for react-chat-window
class ChatWindow extends Component {
 
  constructor() {
    super();
    this.state = {
      messageList: [],
      newMessagesCount: 0,
      isOpen: false,
    };
  }
 
  componentDidMount(){
    /////initialize firebase
    // TODO: Replace the following with your app's Firebase project configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBd7KiM7D2q22t3AF5ZJd14dRgNtxUFynQ",
      authDomain: "chat-app-demo-88083.firebaseapp.com",
      databaseURL: "https://chat-app-demo-88083.firebaseio.com",
      projectId: "chat-app-demo-88083",
      storageBucket: "chat-app-demo-88083.appspot.com",
      messagingSenderId: "156783601000",
      appId: "1:156783601000:web:c37c752214b3949c7f62dd",
      measurementId: "G-ZYT0ZF0ZMN"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const messaging = firebase.messaging();
    messaging.usePublicVapidKey('BC2Wcv7Y2Ac5wOXNYMrIRMpCHfwR4uq0DzEVfIcDBdFJ7PwxQQrLo_zxx5vbvmkJwXLGxvL-8dWm2YXwCg99Wps');

    messaging.requestPermission()
    .then(function() {
      console.log('Have persmission');
      return messaging.getToken();
    })
    .then(function(token) {
      console.log(token);   //normally send it to server so you can actually send a message to that token later on
    })
    .catch(function(err){
      console.log('Error occured!');
    })

    // Get Instance ID token. Initially this makes a network call, once retrieved
    // subsequent calls to getToken will return from cache.
    messaging.getToken().then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
        // sendTokenToServer(currentToken);
        // updateUIForPushEnabled(currentToken);
      } else {
        // Show permission request.
        console.log('No Instance ID token available. Request permission to generate one.');
        // Show permission UI.
        // updateUIForPushPermissionRequired();
        // setTokenSentToServer(false);
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // showToken('Error retrieving Instance ID token. ', err);
      // setTokenSentToServer(false);
    });
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message]
    })
    console.log(`New message`);
  }
 
  _onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);
    this.setState({
      messageList: [...this.state.messageList, {
        type: 'file', author: 'me',
        data: {
          url: objectURL,
          fileName: fileList[0].name
        }
      }]
    });
  }

  _sendMessage(text) {
    const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1;
    if (text.length > 0) {
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [...this.state.messageList, {
          author: 'them',
          type: 'text',
          data: { text }
        }]
      })
      console.log(`New message: ${text}`);
    }
  }
 
  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0
    });
  }

  render() {
    return (
    <div>
      <Launcher
        agentProfile={{
          teamName: 'react-chat-window-param',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        onFilesSelected={this._onFilesSelected.bind(this)}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        showEmoji
      />
      
    </div>
    )
  }
}

export default ChatWindow;