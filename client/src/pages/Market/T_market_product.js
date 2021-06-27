import React, { Component } from 'react';

//Navigation
import Card from '../../components/Cards/MiniCard';
class T_market_porduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: this.props.title ? this.props.title : ' ',
            img: this.props.img ? this.props.img : '',
            comment: this.props.comment ? this.props.comment : ''
        }
    }
    
    componentWillMount() {
        document.getElementById('body').className = 'page-top'
    }

    render() {
        return (
            

            <Card title={this.state.title} img={this.state.img} comment={this.state.comment}/>
            
        )
    }
}
// page/classlistDEtail 참고하기

export default T_market_porduct;