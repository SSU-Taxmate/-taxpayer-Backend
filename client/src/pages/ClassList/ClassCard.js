import React, { Component } from "react";
import ClassCodeModal from "../../components/Modal/ClassCodeModal";
class ClassCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title ? this.props.title : " ",
      img: this.props.img ? this.props.img : "",
      comment: this.props.comment ? this.props.comment : "",
    };
  }

  render() {
    return (
      <div className="col-lg-3">
        {/*<!-- Dropdown Card Example -->*/}
        <div className="card shadow mb-4">
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              <i className="fas fa-star"></i>
              <a href="/classes/:classId">{this.state.title} </a>
            </h6>
            {/*<!--꿈나무반 card 시작-->*/}
            <div className="dropdown no-arrow">
              <ClassCodeModal
                id="displaycode"
                icon="fas fa-external-link-alt"
              ></ClassCodeModal>

              {/*<!--참가코드 생성 창 띄우기-->*/}
              <a
                className="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              {/*<!--꿈나무 반 설정-->*/}
              <div
                className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                aria-labelledby="dropdownMenuLink"
              >
                <div className="dropdown-header">{this.state.title}설정:</div>
                <a className="dropdown-item" href="#">
                  삭제
                </a>
                <a className="dropdown-item" href="#">
                  뭐시기
                </a>
              </div>
            </div>
            {/* <!--꿈나무반 card 끝-->*/}
          </div>
          {/*<!-- Card Body 사진을 올리면 사이즈에 맞게 조정해서 fit하게 들어가기 -->*/}
          <div className="card-body">
            <img className="card-img-bottom rounded" src={this.state.img}></img>
            <br></br>
            <p>{this.state.comment}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ClassCard;
