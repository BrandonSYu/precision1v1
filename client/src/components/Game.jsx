import React from 'react';
import TargetBox from './TargetBox.jsx';
import styled from 'styled-components';

const GameBox = styled.div`
    border-style: solid;
    border-width: medium;
    height : 750px;
`;

class Game extends React.Component{//timelimit, difficulty factor, speed
    constructor(props){
        super(props);
        this.state = {
            socket : null,
            start : false,
            scoreOne : 0,
            scoreTwo : 0,
            timeLimit : 30,
            sessionId : null,
        }
        this.handleStart = this.handleStart.bind(this);
        this.handleClickRed = this.handleClickRed.bind(this);
        this.handleClickBlue = this.handleClickBlue.bind(this);
    }
    componentDidMount(){
        console.log(this.props.sessionId);
        this.setState({socket : this.props.socket, sessionId : this.props.sessionId});
        this.props.socket.on('targetclickred', function(data){
            console.log("Delete this RED target GLOBALLY " + data["id"]);
            console.log(JSON.stringify(data) + 'from target')
            var element = document.getElementById("redTarget" + data["id"]);
            element.parentNode.removeChild(element);
            this.setState({scoreOne : data["scoreOne"], scoreTwo : data["scoreTwo"]})
        })
        this.props.socket.on('targetclickblue', function(data){
            console.log("Delete this Blue target GLOBALLY " + data["id"]);
            console.log(JSON.stringify(data) + 'from target')
            var element = document.getElementById("blueTarget" + data["id"]);
            element.parentNode.removeChild(element);
            this.setState({scoreOne : data["scoreOne"], scoreTwo : data["scoreTwo"]})
        })

    }
    handleStart(){//spawn random targets of both color, start timer countdown, 
        // this.setState({started : true});
        console.log('GAME START')
        this.state.socket.emit('start', {
        })

    }
    handleClickRed(id){
        console.log('Client: RED TARGET HAS BEEN CLICKED')
        console.log(id)
        console.log(this.state.sessionId);
        this.state.socket.emit('targetclickred', {
            sessionId : this.state.sessionId,
            scoreOne : this.state.scoreOne,
            scoreTwo : this.state.scoreTwo,
            id : id
        })
    }
    handleClickBlue(id){
        console.log('Client: Blue TARGET HAS BEEN CLICKED')
        console.log(this.state.sessionId);
        this.state.socket.emit('targetclickblue', {
            sessionId : this.state.sessionId,
            scoreOne : this.state.scoreOne,
            scoreTwo : this.state.scoreTwo,
            id : id
        })
    }

    random(){

    }
    
    render(){
        return(
            <div>
                {this.state.socket ? 
                <GameBox>
                <div>Game Box Here</div>
                <div>SessionID: {this.state.sessionId}</div>
                <div>Player1 Score: </div>
                <div id="scoreOne">{this.state.scoreOne}</div>
                <div>Player2 Score: </div>
                <div id="scoreTwo">{this.state.scoreTwo}</div>
                <button onClick={()=>this.handleStart()}>START</button>
                {/* <TargetP1 handleClickRed = {()=>this.handleClickRed()}/> */}
                <TargetBox socket={this.state.socket} handleClickRed={this.handleClickRed.bind(this)} handleClickBlue={this.handleClickBlue.bind(this)}/>
                </GameBox>
            : <div></div>}
            </div>
        )
    }
}
export default Game;