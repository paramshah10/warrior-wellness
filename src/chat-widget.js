import React, { Component } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

class ChatWidget extends Component {
    componentDidMount() {
        addResponseMessage("Welcome to this awesome chat!");
    }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
        addResponseMessage("How are you?");
    }

    render() {
        return (
            <Widget
                handleNewUserMessage={this.handleNewUserMessage}
                title="My new awesome title"
                subtitle="And my cool subtitle"
            />
        );
    }
}

export default ChatWidget;