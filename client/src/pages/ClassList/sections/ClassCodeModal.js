import React, { Component } from "react";
import $ from "jquery";
import ClipboardJS from "clipboard";
import ShareIcon from "@material-ui/icons/Share";
import "../../../styles/css/classCodeModal.css";

export default class ClassCodeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: props.className,
      id: props.id,
      entrycode: props.entrycode,
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
        <div>
          <a
            className="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target={`#${this.state.id}Modal`}
          >
            {/*    <i className={this.state.icon}></i>*/}
            <ShareIcon />
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
                <img src="img/background-main2.png" /> {/*이미지*/}
                <div className="modal-header justify-content-center">
                  <div className="modal-code" id="DisplayCodeModal">
                    <span>국가 : {this.state.className}</span>
                  </div>
                </div>
                <div className="form-inline mt-2">
                  <div className="row" style={{ width: "100%" }}>
                    <div className="col ml-2">
                      <div className="form-group mb-2 mt-2" id="entryCodeText">
                        <strong>참가코드: </strong>
                      </div>
                      <div
                        className="form-group mx-sm-1 mb-2"
                        style={{ display: "inline" }}
                      >
                        <label htmlFor="CopyCode" className="sr-only">
                          참가코드
                        </label>
                        <input
                          type="text"
                          id="CopyCode"
                          className="form-control"
                          placeholder="Invite Code"
                          defaultValue={this.state.entrycode}
                        />
                      </div>
                      <div
                        className="btn btn-info btn-clipboard"
                        id="entryCodebtn"
                        data-clipboard-action="copy"
                        data-clipboard-target="#CopyCode"
                      >
                        Copy
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
