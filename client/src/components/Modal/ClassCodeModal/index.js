import React, { Component } from "react";
import $ from "jquery";
import ClipboardJS from "clipboard";
export default class ClassCodeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: this.props.icon ? this.props.icon : "fas fa-smile",
    };
  }
  componentDidMount() {
    $(document).ready(function () {
      new ClipboardJS(".btn");
    });
  }
  render() {
    return (
      <>
        <a
          className="dropdown-item"
          href="#"
          data-toggle="modal"
          data-target={`#${this.state.id}Modal`}
        >
          <i className={this.state.icon}></i>
        </a>
        <div
          className="modal fade"
          id={`${this.state.id}Modal`}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={`#${this.state.id}ModalLabel`}
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content p-4">
              <img src="https://assets.tvo.org/prod/s3fs-public/styles/full_width_1280/public/article-thumbnails/kids%20in%20classNameroom.JPG?KgEyQTBORydSiHj.xIj8ROjMdJvgPW4r&itok=G4OLcZhp" />

              <div className="modal-header">
                <div className="modal-code" id="DisplayCodeModal">
                  {" "}
                  className : 꿈나무
                </div>
              </div>
              <div className="form-inline">
                <div className="form-group mb-2">
                  <strong>참가코드: </strong>
                </div>
                <div className="form-group mx-sm-1 mb-2">
                  <label htmlFor="CopyCode" className="sr-only">
                    참가코드
                  </label>
                  <input
                    type="text"
                    id="CopyCode"
                    className="form-control"
                    placeholder="Invite Code"
                  />
                  <button
                    type="button"
                    className="btn btn-info btn-clipboard"
                    data-clipboard-action="copy"
                    data-clipboard-target="#CopyCode"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
