import React, { useState } from "react";
import ClassCard from "./ClassCard";
import Draft from "../../components/Editor";
// form dialog (react metrial ui)
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//수정
function FormDialog(props) {
  const [classtitle, setclasstitle] = useState("");
  const [classcontent, setclasscontent] = useState({});

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onTitleChange = (e) => {
    setclasstitle(e.target.value); //e.currentTarget.value
  };
  const onContentChange = (value) => {
    /*editor에서 현재 editor 값 넘겨줌 */
    setclasscontent(value);
  };

  const handleSubmit = (e) => {
    //데이터 저장
    //e.preventDefault();
    // axios.post('/api/classes/:classId/laws',{"title":lawtitle,"content":lawcontent,"issuedate":issuedate})
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
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
        <DialogContent>
          <DialogContentText>
            등록하고자 하는 학급 이름과 설정을 입력해주세요
          </DialogContentText>
          <div className="form-inline mb-3">
            <label className="mr-2 my-1" htmlFor="newclasstitle">
              클래스 이름
            </label>
            <input
              type="text"
              onChange={onTitleChange}
              className="form-control"
              id="newclasstitle"
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
          {/* <Draft type="create" onChange={onContentChange} /> */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            취소
          </Button>
          <Button onClick={handleClose} color="primary">
            저장
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function ClassListDetail() {
  return (
    <div className="row">
      {/*<!--className 추가-->*/}
      <div className="col-lg-3">
        <div className="card mb-4">
          <div className="card-body">{FormDialog()}</div>
        </div>
      </div>

      {/* 데이터 만큼 */}
      <ClassCard
        title="햇빛반"
        img="https://assets.tvo.org/prod/s3fs-public/styles/full_width_1280/public/article-thumbnails/kids%20in%20classroom.JPG?KgEyQTBORydSiHj.xIj8ROjMdJvgPW4r&itok=G4OLcZhp"
        comment="햇빛반은 6-3반!"
      ></ClassCard>
    </div>
  );
}

export default ClassListDetail;
