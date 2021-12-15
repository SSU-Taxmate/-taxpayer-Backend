import React, { Component } from 'react';

class CardCollapse extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ''
        }
    }

    componentDidMount() {
        this.setState({ title: this.props.title ? this.props.title : 'Basic Card Example' });
        this.setState({ area_id: this.props.area_id ? this.props.area_id :"bb" })
    this.setState({ body: this.props.body ? this.props.body : "This is a collapsable card example using Bootstrap's built in collapse functionality. <strong>Click on the card header</strong> to see the card body collapse and expand!" })
    }
    render() {
        return (
            <div className="card shadow mb-4">
                {/* <!-- Card Header - Accordion --> */}
                <a href={`#${this.state.area_id}`} className="d-block card-header py-3" data-toggle="collapse" role="button" aria-expanded="true" aria-controls={this.state.area_id}>
                    <h6 className="m-0 font-weight-bold text-primary">{this.state.title}</h6>
                </a>
                {/* <!-- Card Content - Collapse --> */}
                <div className="collapse show" id={this.state.area_id}>
                    <div className="card-body">
                        {/* 어떤 child가 들어올지 예상못함.https://ko.reactjs.org/docs/composition-vs-inheritance.html */}
                        {this.props.children}
                  </div>
                </div>
            </div>
        )
    }
}

export default CardCollapse;