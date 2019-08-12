import React from 'react';

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            socket : null,
            typed : false,
        };
        this.handleSend = this.handleSend.bind(this);
        this.handleKey = this.handleKey.bind(this);
    }
    componentDidMount(){
        this.setState({socket : this.props.socket})
        this.props.socket.on('chat', function(data){
            output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
        });
        this.props.socket.on('typing', function(data){
            var handle = data["handle"];
            // console.log(handle)
            var handleId = "handle" + handle;
            console.log("Handle ID: " + handleId);
            //console.log(JSON.stringify(data))
            if(data["typing"]===null){
                var element = document.getElementById(handleId);
                element.parentNode.removeChild(element);
            }else{
                feedback.innerHTML += `<p id=${handleId}><em>` + handle + ' is typing a messsage...</em></p>';
            }
        });
    }
    handleSend(){
        console.log("sending")
        var message = document.getElementById('message'),
        handle = document.getElementById('handle');
    //   output = document.getElementById('output');


// Emit events

    this.state.socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
    console.log('Message sent from client')

    }
    handleKey(){
        console.log('KEYPRESS from CHAT client')
        var handle = document.getElementById('handle');
        console.log(handle.value)
        var message = document.getElementById('message').value;
        if(message.length > 0 && !this.state.typed){
            this.setState({typed : true})
            this.state.socket.emit('typing', {
                handle : handle.value
            });
        } else if(message.length === 0){
            console.log('HERE')
            this.setState({typed : false})
            this.state.socket.emit('typing', {
                handle : handle.value,
                typing : null
            });
        }
        // if(message.value.length > 1){
        //     console.log('Already Typing')
        // }else{
        //     this.state.socket.emit('typing', handle.value);
        // }
    }
    
    render(){
        return(
            <div>
            <div id="precision-chat">
            <h2>Precision Chat</h2>
            <div id="chat-window">
                <div id="output"></div>
                <div id="feedback"></div>
            </div>
            <input id="handle" type="text" placeholder="Username" />
            <input id="message" type="text" placeholder="Message" onChange = {()=>this.handleKey()}/>
            <button id="send" onClick={() => this.handleSend()}>Send</button>
        </div>
            </div>
        )
    }
}

export default Chat;