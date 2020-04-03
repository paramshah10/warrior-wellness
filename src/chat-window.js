import React, {Component} from 'react';
import {Launcher} from 'react-chat-window';

import { CometChat } from "@cometchat-pro/chat";

/////initialize cometChat

var appID = "162528093d8ef33";
var region = "us";
var appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion(region).build();
CometChat.init(appID, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
    // You can now call login function.
  },
  error => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);

////////create user

let apiKey = "d9acdcf72ee2eef8fb5181a7403440902f7abb3f";
var uid = "user1";
var name = "Param";

var user = new CometChat.User(uid);

user.setName(name);

CometChat.createUser(user, apiKey).then(
    user => {
        console.log("user created", user);
    },error => {
        console.log("error", error);
    }
)

/////////login
var UID = "SUPERHERO1";
//var apiKey = "API_KEY";

CometChat.login(UID, apiKey).then(
  user => {
    console.log("Login Successful:", { user });    
  },
  error => {
    console.log("Login failed with exception:", { error });    
  }
);

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
      <form onSubmit={(e)=> {
            e.preventDefault();
            this._sendMessage(this.textArea.value);         //use _send message to reply to messages
            this.textArea.value = '';
        }}>
        <div>Test the chat window by sending a message:</div>
        <textarea
            ref={(e) => { this.textArea = e; }}
            className="demo-test-area--text"
            placeholder="Write a test message...."
        />
        <button> Send Message! </button>
    </form>
    </div>
    )
  }
}

export default ChatWindow;