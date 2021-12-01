import React, { Component } from 'react';

class CardDropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  componentDidMount() {
    this.setState({ title: this.props.title ? this.props.title : 'Card'});
}

render() {
  return (
    <div className="card shadow mb-4">
      {/* <!-- Card Header - Dropdown --> */}
      <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
        <h6 className="m-0 font-weight-bold text-primary">{this.state.title}</h6>
        <div className="dropdown no-arrow">
          <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in" aria-labelledby="dropdownMenuLink">
            <div className="dropdown-header">수정/저장</div>
            <a className="dropdown-item" href="#">저장</a>
          </div>
        </div>
      </div>
      {/* <!-- Card Body --> */}
      <div className="card-body">
        {this.props.children}
      </div>
    </div>
  )
}
}

export default CardDropdown;