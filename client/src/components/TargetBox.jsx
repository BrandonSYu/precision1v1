import React from 'react';
import TargetP1 from './TargetP1.jsx';
import TargetP2 from './TargetP2.jsx';
import styled from 'styled-components';

const Box = styled.div`
    display:flex;
    flex-direction : column;
    z-index : 5;
    background-color : white;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

class TargetBox extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            redTargetList : [{0 : ["200", "300"]}, {1 : ["1000", "200"]}, {2 : ["1000", "200"]}, {3 : ["630", "740"]}, {4 : ["20", "699"]}],
            blueTargetList : [{0 : ["500", "80"]}, {1 : ["20", "30"]}, {2 : ["99", "50"]}, {3 : ["1200", "30"]}, {3 : ["200", "300"]}, {4 : ["230", "800"]}],
        }
    }

    render(){
        return(
            <div>
                <Box>
                    {this.state.redTargetList.map((item) => <div id={"redTarget" + Object.keys(item)[0].toString()}><TargetP1 socket={this.props.socket} handleClickRed={this.props.handleClickRed} id={Object.keys(item)[0]} x={Object.values(item)[0][0]} y = {Object.values(item)[0][1]}/></div>)}
                    {this.state.blueTargetList.map((item) => <div id= {"blueTarget" +  Object.keys(item)[0].toString()}><TargetP2 socket={this.props.socket} handleClickBlue={this.props.handleClickBlue} id={Object.keys(item)[0]} x={Object.values(item)[0][0]} y = {Object.values(item)[0][1]}/></div>)}
                </Box>
            </div>
        )
    }
}

export default TargetBox;