import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectClass, selectUser } from "../../redux/_actions";
import ClassCodeModal from "../../components/Modal/ClassCodeModal";

function ClassCard(props) {
  const dispatch = useDispatch();
  let user = useSelector((state) => state.user);
  return (
    <div className="col-lg-3">
      {/*<!-- Dropdown Card Example -->*/}
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">
            <i className="fas fa-star"></i>
            <Link
              to={`/classes/${props.id}`}
              onClick={() => {
                dispatch(selectClass({ classId: props.id }));
                if (user.userData.role == 1) {
                  dispatch(
                    selectUser({ classId: props.id, userId: user.userData._id })
                  );
                }
              }}
            >
              {props.title}
            </Link>
          </h6>
          {/*<!--꿈나무반 card 시작-->*/}
          <div className="dropdown no-arrow">
            <ClassCodeModal
              id={`${props.title}displaycode`}
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
              <div className="dropdown-header">{props.title}설정:</div>
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
          <img className="card-img-bottom rounded" src={props.img}></img>
          <br></br>
          <p>{props.comment}</p>
        </div>
      </div>
    </div>
  );
}

export default ClassCard;
