import React, { Component } from 'react'
import $ from 'jquery'
export default class Popover extends Component {
 
    componentDidMount(){
        $(function () {
            $('[data-toggle="popover"]').popover({trigger:'hover'});
          });
    }
    componentWillUnmount() {
       
    }
    render() {
        return (
            <i
            className={`fas fa-${this.props.icon}`}
            id={this.props.id}
            data-container="body"
            data-toggle="popover"
            data-placement="right"
            data-content={this.props.children}
          ></i>
        )
    }
}
