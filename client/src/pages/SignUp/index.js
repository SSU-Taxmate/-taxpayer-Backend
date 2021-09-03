import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { registerUser } from "../../redux/_actions/index";
import { useDispatch } from "react-redux";

var Authcheck ;
var AuthNum=0 ; //이메일 확인시 1, 아니면 0

function SignUp(props) {
  useEffect(() => {
    document.getElementById("body").className = "bg-gradient-primary";
  });
  const handleSubmit2= (e) => {
    {
      const data = {
        email: e.target.value
      };
      alert("인증번호가 발송되었습니다 이메일을 확인해주세요");
      axios
        .post(`/api/users/email`, data)
        .then(function (response) {
          console.log(response.data);
          Authcheck=response.data;
        })
        .catch(function (error) {
          console.log(error);
          console.log("testing fine error");
        });
    };

  }
  const handleSubmit3= (e) => {
    {
      const data = {
        emailverify: e.target.value
      };
      if (e.target.value == Authcheck){
        alert("이메일 인증이 완료되었습니다");
        AuthNum=1; //이메일 인증완료
        e.currentTarget.disabled = true ; //성공했으니 다시 못누르게하기
      }
      else {
        alert("이메일 확인 코드를 다시 확인해주세요");
        AuthNum=0; //이메일 인증실패. 다시요구하기
      }
    };

  }

  

  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-0">
          {/* <!-- Nested Row within Card Body --> */}
          <div className="row">
            <div className="col-lg-5 d-none d-lg-block bg-register-image"></div>
            <div className="col-lg-7">
              <div className="p-5">
                <div className="text-center">
                  <h1 className="h4 text-gray-900 mb-4">계정 생성</h1>
                </div>
                <Formik
                  initialValues={{
                    email: "",
                    name: "",
                    sId: "",
                    password: "",
                    confirmPassword: "",
                    emailverify: "",
                  }}
                  validationSchema={Yup.object().shape({
                    name: Yup.string().required("이름을 입력해주세요"),
                    sId: Yup.string().required("번호를 입력해주세요"),
                    email: Yup.string()
                      .email("유효하지 않은 이메일입니다")
                      .required("이메일을 입력해주세요"),
                    password: Yup.string()
                      .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
                      .required("비밀번호를 입력해주세요"),
                    confirmPassword: Yup.string()
                      .oneOf(
                        [Yup.ref("password"), null],
                        "Passwords must match"
                      )
                      .required("Confirm Password is required"),
                  })} //해당하는 정보를 만족하지 않으면 넘어가지 않음.
                  onSubmit={(values, { setSubmitting }) => {
                    //alert(JSON.stringify(values, null, 2))
                    setTimeout(() => {
                      let dataToSubmit = { //이곳에 송신할 데이터 추가.
                        email: values.email,
                        password: values.password,
                        name: values.name,
                        AuthNum: AuthNum,
                      };

                      dispatch(registerUser(dataToSubmit)).then((response) => {
                        if (response.payload.success) {
                          props.history.push("/signup");
                        } else {
                          alert(response.payload.err.errmsg);
                        }
                      });

                      setSubmitting(false);
                    }, 500);
                    /*  */
                  }}
                >
                  {(props) => {
                    const {
                      values,
                      touched,
                      errors,
                      dirty,
                      isSubmitting,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      handleReset,
                    } = props;
                    return (
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              id="name"
                              placeholder="이름"
                              className={
                                errors.confirmPassword &&
                                touched.confirmPassword
                                  ? "form-control form-control-user err"
                                  : "form-control form-control-user"
                              }
                              type="text"
                              value={values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.name && touched.name && (
                              <div className="input-feedback">
                                {errors.name}
                              </div>
                            )}
                          </div>
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              id="sId"
                              placeholder="번호"
                              className={
                                errors.confirmPassword &&
                                touched.confirmPassword
                                  ? "form-control form-control-user err"
                                  : "form-control form-control-user"
                              }
                              type="number"
                              value={values.sId}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.sId && touched.sId && (
                              <div className="input-feedback">{errors.sId}</div>
                            )}
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              id="email"
                              placeholder="이메일 주소"
                              className="form-control form-control-user"
                              type="email"
                              value={values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.email && touched.email && (
                              <div className="input-feedback">
                                {errors.email}
                              </div>
                            )}
                          </div>
                          <button
                            type="submit"
                            value={values.email}
                            onClick={handleSubmit2}
                            className="col-sm-5 mb-5 mb-sm-0 btn btn-primary"
                            style={{ marginLeft: "1rem" }}
                            
                          >
                            이메일 인증받기
                          </button>
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              id="emailverify"
                              placeholder="이메일 확인 코드"
                              className="form-control form-control-user"
                              type="verifycode"
                              value={values.emailverify}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <button
                            type="submit"
                            value={values.emailverify}
                            onClick={handleSubmit3}
                            className="col-sm-5 mb-5 mb-sm-0 btn btn-primary"
                            style={{ marginLeft: "1rem" }}
                            
                          >
                            이메일 인증확인
                          </button>
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <div className="row">
                              <div className="form-check">
                                가입 유형<br></br> 선택
                              </div>

                              <div
                                className="form-check"
                                style={{ marginLeft: "1rem" }}
                              >
                                <div className="col ">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                  />
                                  <label
                                    className="form-check-label"
                                    for="flexRadioDefault1"
                                  >
                                    선생님
                                  </label>
                                </div>
                                <div className="col">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    checked
                                  />
                                  <label
                                    className="form-check-label"
                                    for="flexRadioDefault2"
                                  >
                                    학생
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              id="password"
                              placeholder="비밀번호"
                              className="form-control form-control-user"
                              type="text"
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.password && touched.password && (
                              <div className="input-feedback">
                                {errors.password}
                              </div>
                            )}
                          </div>
                          <div className="col-sm-6">
                            <input
                              id="confirmPassword"
                              placeholder="비밀번호 확인"
                              className="form-control form-control-user"
                              type="text"
                              value={values.confirmPassword}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.confirmPassword &&
                              touched.confirmPassword && (
                                <div className="input-feedback">
                                  {errors.confirmPassword}
                                </div>
                              )}
                          </div>
                        </div>
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                        >
                          회원가입
                        </button>

                        <hr />
                        <Link
                          to="/classes"
                          className="btn btn-google btn-user btn-block"
                        >
                          <i className="fab fa-google fa-fw"></i> Google로 회원
                          가입하기
                        </Link>
                        <Link
                          to="/classes"
                          className="btn btn-facebook btn-user btn-block"
                        >
                          <i className="fab fa-facebook-f fa-fw"></i>
                          Facebook으로 회원 가입하기
                        </Link>
                      </form>
                    );
                  }}
                </Formik>

                <hr />
                <div className="text-center">
                  <a className="small" href="forgot-password.html">
                    비밀번호를 잊어버리셨습니까?
                  </a>
                </div>
                <div className="text-center">
                  <Link className="small" to="/signin">
                    이미 계정이 있나요? 로그인하러가기!
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
