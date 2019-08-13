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
            redTargetList : [{0 : ["200", "300"]}, {1 : ["1000", "200"]}, {2 : ["1000", "200"]}, {3 : ["630", "400"]}, {4 : ["200", "300"]}, {5 : ["900", "355"]}, {6 : ["600", "450"]}, {7 : ["1000", "432"]}, {8 : ["1400", "355"]}],
            blueTargetList : [{0 : ["500", "200"]}, {1 : ["20", "500"]}, {2 : ["99", "200"]}, {3 : ["1200", "460"]}, {4 : ["200", "300"]}, {5 : ["230", "800"]}, {6 : ["544", "222"]}, {7 : ["1500", "355"]}, {8 : ["1500", "675"]}],
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