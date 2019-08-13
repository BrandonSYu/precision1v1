import React from 'react';
import TargetBox from './TargetBox.jsx';
import styled from 'styled-components';
import Sound from 'react-sound';

const GameBox = styled.div`
    border-style: solid;
    border-width: medium;
    height : 750px;
    background-image : url("supermario2.png");
    background-size : 1900px 750px;
    background-repeat : repeat;
`;

class Game extends React.Component{//timelimit, difficulty factor, speed
    constructor(props){
        super(props);
        this.state = {
            socket : null,
            start : false,
            scoreOne : 0,
            scoreTwo : 0,
            timeLimit : 59,
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
            var scoreOne = document.getElementById('scoreOne');
            scoreOne.innerHTML = `${data["scoreOne"]}`;
            var scoreTwo = document.getElementById('scoreTwo');
            scoreTwo.innerHTML = `${data["scoreTwo"]}`;
        })  
        this.props.socket.on('targetclickblue', function(data){
            console.log("Delete this Blue target GLOBALLY " + data["id"]);
            console.log(JSON.stringify(data) + 'from target')
            var element = document.getElementById("blueTarget" + data["id"]);
            element.parentNode.removeChild(element);
            var scoreOne = document.getElementById('scoreOne');
            scoreOne.innerHTML = `${data["scoreOne"]}`;
            var scoreTwo = document.getElementById('scoreTwo');
            scoreTwo.innerHTML = `${data["scoreTwo"]}`;
        })
        this.props.socket.on('start', function(data){
            var curr = parseInt(data["timer"]);
            
            setInterval(function(){ curr -= 1; 
                if(curr > -1){
                    var timer = document.getElementById('timer');
                    timer.innerHTML = `${curr}`;
                }
            }, 1000);
            if(curr === 0){
                timer.innerHTML = `GAME OVER!`
            }
        })
    }
    handleStart(){//spawn random targets of both color, start timer countdown, 
        // this.setState({started : true});
        console.log('GAME START')
        this.state.socket.emit('start', {
        })
        this.setState({start : true});
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
                <Sound url="wiimenu.mp3"
                loop={true}
                autoLoad = {true}
                playStatus={Sound.status.PLAYING}
                playFromPosition={10 /* in milliseconds */}
                onLoading={this.handleSongLoading}
                onPlaying={this.handleSongPlaying}
                onFinishedPlaying={this.handleSongFinishedPlaying}/>
                {this.state.socket ? 
                <GameBox>
                <div>Game Box Here</div>
                <div>SessionID: {this.state.sessionId}</div>
                <div>Player1 Score: </div>
                <div id="scoreOne">{this.state.scoreOne}</div>
                <div>Player2 Score: </div>
                <div id="scoreTwo">{this.state.scoreTwo}</div>
                <div id = "timer">{this.state.timeLimit}</div>
                <button onClick={()=>this.handleStart()}>START</button>

                <TargetBox socket={this.state.socket} handleClickRed={this.handleClickRed.bind(this)} handleClickBlue={this.handleClickBlue.bind(this)}/>
                </GameBox>
            : <div></div>}
            </div>
        )
    }
}
export default Game;