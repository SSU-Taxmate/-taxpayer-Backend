import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Error from "../../components/Error";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
/*selectedClass구분해서 Store에저장하기 위해서
import {selectClass} from '../../redux/_actions'; */
function ClassListDetail() {
  const dispatch = useDispatch();
  const [classes, setclasses] = useState([]);
  const [updateTime, setupdateTime] = useState("****-**-**");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const handleCardClicked = (e) => {
    console.log(e.target, "HNANANANNAN");
  };
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get("/api/classes");
        //console.log(result.data.classes)
        setclasses(result.data.classes);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="row">
      {/*<!--className 추가-->*/}
      <div className="col-lg-3">
        <div className="card mb-4">
          <div className="card-body">
            {user.userData &&
              (user.userData.role == 0 ? <FormDialog /> : "hello")}
          </div>
        </div>
      </div>

      {/* 데이터 만큼 */}
      {isError && <Error></Error>}
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        classes.map((info, i) => (
          <ClassCard
            key={info._id}
            title={info.name}
            img={info.image}
            comment={info.comment}
            onClick={handleCardClicked}
            user={user.userData}
          ></ClassCard>
        ))
      )}
    </div>
  );
}

export default ClassListDetail;
//수정
function FormDialog() {
  const [classname, setclassname] = useState("");
  const [classcontent, setclasscontent] = useState("");
  const [open, setOpen] = useState(false);
  let user = useSelector((state) => state.user);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onTitleChange = (e) => {
    setclassname(e.target.value); //e.currentTarget.value
  };
  const onContentChange = (e) => {
    /*editor에서 현재 editor 값 넘겨줌 */
    setclasscontent(e.target.value);
  };

  const handleSubmit = (e) => {
    //e.preventDefault();
    //console.log('handleSubmit',user.userData._id)
    //데이터 저장
    axios
      .post("/api/classes", {
        name: classname,
        image:
          "https://assets.tvo.org/prod/s3fs-public/styles/full_width_1280/public/article-thumbnails/kids%20in%20classroom.JPG?KgEyQTBORydSiHj.xIj8ROjMdJvgPW4r&itok=G4OLcZhp",
        comment: classcontent,
        teacher: user.userData._id,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Button color="primary" onClick={handleClickOpen}>
        <i className="far fa-plus-square fa-2x"></i>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">학급 추가</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <DialogContentText>
              등록하고자 하는 학급 이름과 설정을 입력해주세요
            </DialogContentText>

            <div className="form-inline mb-3">
              <label className="mr-2 my-1" htmlFor="newclassname">
                클래스 이름
              </label>
              <input
                type="text"
                onChange={onTitleChange}
                className="form-control"
                id="newclassname"
              />
            </div>
            <label className="mr-2 my-1" htmlFor="newclasscontent">
              클래스 설명
            </label>
            <input
              type="text"
              onChange={onContentChange}
              className="form-control"
              id="newclasscontent"
              required
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="primary">
              취소
            </Button>
            <Button type="submit" onClick={handleClose} color="primary">
              저장
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
