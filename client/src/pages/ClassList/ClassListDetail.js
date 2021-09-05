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

import FirstStep from "../ClassList/sections/FirstStep";
import SecondStep from "../ClassList/sections/SecondStep";
import CloseIcon from "@material-ui/icons/Close";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
/*selectedClass구분해서 Store에저장하기 위해서
import {selectClass} from '../../redux/_actions'; */
function ClassListDetail() {
  const [classes, setclasses] = useState([]);
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
                (user.userData.role === 0 ? <FormDialog /> : <FormDialog2 />)}
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
            date={info.createdAt}
            entrycode={info.entrycode}
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

const steps = [FirstStep, SecondStep];
const label = ["국가코드 입력", "시민권 발급"];

function FormDialog2() {
  const [open, setOpen] = useState(false); //전체 dialog open
  const [activeStep, setActiveStep] = useState(0); //순서

  const [errmsg, seterrmsg] = useState(""); //step마다 생기는 errmsg

  const [data, setdata] = React.useState({
    entryCode: undefined,
  });

  const [entryClass, setclass] = React.useState({
    entryClass: undefined,
  });
  /* user값 받아오기 */
  let user = useSelector((state) => state.user);

  const handleChange = (type) => (e) => {
    setdata({ ...data, [type]: e.target.value });
    console.log(e);
    console.log("테스트", data);
  };

  //전체 dialog open/close
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleNext = () => {
    if (activeStep === 0) {
      if (data.entryCode === undefined) {
        //국가코드 입력 없이 다음으로 넘어갈때
        return seterrmsg("국가 코드를 입력해주세요");
      } else {
        //클래스 데이터 설정
        console.log("hello", data.entryCode);
        const result = axios
          .get("/api/classes/findClass", {
            params: { entryCode: data.entryCode },
          })
          .then(function (response) {
            console.log(response);
            if (response.data == null) {
              return seterrmsg("해당 국가가 없습니다.");
            } else {
              setclass({
                entryClass: response.data,
              });
            }
            console.log("첫번째 스탭", data.class);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else if (activeStep === 1) {
      if (entryClass.entryClass === undefined) {
        //국가코드 입력 없이 다음으로 넘어갈때
        return seterrmsg("해당 국가가 없습니다. 이전으로 돌아가세요");
      } else {
        onSubmit();
      }
    }
    seterrmsg("");
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setdata({
      entryCode: undefined,
    });
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    seterrmsg("");
  };
  const handleReset = () => {
    setdata({
      entryCode: undefined,
    });
    setActiveStep(0);
  };
  console.log("data1", data);
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <FirstStep
            data={data}
            handleChange={handleChange}
            seterrmsg={seterrmsg}
          />
        );
      case 1:
        // return (
        //   <SecondStep
        //     data={data}
        //     handleChange={handleChange}
        //     // balance={balance}
        //   />
        // );
        return <SecondStep data={entryClass} handleChange={handleChange} />;

      // case 2:
      // return <ConfirmStep data={data} handleChange={handleChange} />;
      default:
        return "Unknown stepIndex";
    }
  }
  const finish = () => {
    alert("가입이 완료되었습니다.");
    window.location.reload();
  };

  const onSubmit = (e) => {
    // e.preventDefault();
    console.log("handleSubmit", user.userData._id);
    //데이터 저장
    axios
      .post("/api/classes/join", {
        classInfo: entryClass.entryClass,
        entrycode: data.entryCode,
        userId: user.userData._id,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.success === true) {
          finish();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // handleNext();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <IconButton onClick={handleClickOpen}>
        {/* <Icon color="primary">add_circle</Icon> */}
        <img src="img/nationality.png" style={{ width: "4rem" }}></img>
      </IconButton>
      새로운 시민권 발급 받기
      <Dialog open={open} aria-labelledby="dialog-depositjoin">
        <DialogTitle id="dialog-depositjoin">
          시민권 발급
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{label[index]}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeStep === steps.length ? (
              <div>
                <div>시민권 발급이 완료되었습니다.</div>
                <div style={{ display: "block", float: "right" }}>
                  <Button onClick={handleClose}>닫기</Button>
                </div>
              </div>
            ) : (
              <div style={{ display: "block", alignContent: "center" }}>
                <div style={{ display: "block" }}>
                  {getStepContent(activeStep)}
                </div>
                <span style={{ color: "red" }}>{errmsg}</span>
                {activeStep === steps.length - 1 && (
                  <Button onClick={handleReset}>초기화</Button>
                )}
                <div style={{ display: "block", float: "right" }}>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    이전
                  </Button>

                  {activeStep === steps.length - 1 ? (
                    <Button
                      onClick={onSubmit}
                      variant="contained"
                      color="primary"
                    >
                      확인
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      color="primary"
                    >
                      다음
                    </Button>
                  )}
                </div>
              </div>
            )}
          </>
        </DialogContent>
      </Dialog>
    </div>
  );
}
