import React from 'react';
import styled from 'styled-components';


const TargetOne = styled.div`
    color : red;
    font-size : 30px;
    height : 20%;
    width : 50px;
`;

class TargetP1 extends React.Component{
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
        this.props.socket.on('targetclickred', function(data){
            console.log("Delete this RED target GLOBALLY " + data["id"]);
            console.log(JSON.stringify(data) + 'from target')
            var element = document.getElementById("redTarget" + data["id"]);
            element.parentNode.removeChild(element);
        })
    }
    targetClick(){
        // console.log("Delete RED target from this client")
        // this.setState({alive : false});
        console.log(this.props.id)
        this.props.handleClickRed(this.props.id);
    }
    render(){
        return(
            <div>
                <TargetOne onClick = {()=>this.targetClick()} className="fas fa-bullseye" />
            </div>
        )
    }
}

export default TargetP1;