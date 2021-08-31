import React, { useEffect, useState } from "react";
import ClassCard from "./ClassCard";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import axios from "axios";
import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

/*selectedClass구분해서 Store에저장하기 위해서
import {selectClass} from '../../redux/_actions'; */
function ClassListDetail() {
  const [classes, setclasses] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get("/api/classes", {
          params: { userId: user.userData._id, role: user.userData.role },
        }); //
        setclasses(result.data);
        console.log(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [user]);
  return (
    <div className="row">
      {/*<!--className 추가-->*/}
      <div className="col-lg-3">
        <div
          className="row justify-content-center align-items-center"
          style={{ height: 450 }}
        >
          <div className="card m-40">
            <div className="card-body">
              {user.userData &&
                (user.userData.role === 0 ? (
                  <FormDialog />
                ) : (
                  "새로운 국가 시민권 얻기"
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* 데이터 만큼 */}
      {isError && <Error></Error>}
      {isLoading ? (
        <Loading />
      ) : (
        classes &&
        classes.map((info, i) => (
          <ClassCard
            id={info._id}
            key={info._id}
            title={info.name}
            img={info.image}
            comment={info.comment}
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
  /* user값 받아오기 */
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
        teacherId: user.userData._id,
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
      <IconButton onClick={handleClickOpen}>
        <AddIcon fontSize="large" />
      </IconButton>
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
