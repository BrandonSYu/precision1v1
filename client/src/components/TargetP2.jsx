import React from 'react';
import styled from 'styled-components';

const TargetTwo = styled.div`
    color : blue;
    font-size : 30px;
    height : 20%;
    width : 50px;
`;

class TargetP2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            alive : true,
            id : null,
            x : 0,
            y : 0
        }
        this.targetClick = this.targetClick.bind(this);
    }
    componentDidMount(){
        this.setState({id : this.props.id, x : this.props.x, y : this.props.y})
        this.props.socket.on('targetclickblue', function(data){
            console.log("Delete this Blue target GLOBALLY " + data["id"]);
            console.log(JSON.stringify(data) + 'from target')
            var element = document.getElementById("blueTarget" + data["id"]);
            element.parentNode.removeChild(element);
        })
    }
    targetClick(){
        // console.log("Delete Blue target from this client")
        // this.setState({alive : false});
        console.log(this.props.id)
        this.props.handleClickBlue(this.props.id);
    }
    render(){
        return(
            <div>
                    <TargetTwo onClick = {()=>this.targetClick()} className="fas fa-bullseye" />
            </div>
        )
    }
}

export default TargetP2;