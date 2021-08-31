import React, { useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../../redux/_actions/index";
import { useDispatch } from "react-redux";

/**SignupForm부분을 추가해야 함 */

function SignUp(props) {
  useEffect(() => {
    document.getElementById("body").className = "bg-gradient-primary";
  });
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
<<<<<<< HEAD
                  initialValues={{ //내가 보내줘야되는 값들의 초깃값.
                    email: '',
                    name: '',
                    sId: '',
                    password: '',
                    confirmPassword: '',
                    entryCode: ''
                  }}
                  validationSchema={Yup.object().shape({ //만약 입력하지 않았다면.
                    name: Yup.string()
                      .required('이름을 입력해주세요'),
                    sId: Yup.string()
                      .required('번호를 입력해주세요'),

                    email: Yup.string()
                      .email('유효하지 않은 이메일입니다') //yup.XX 는 타입을 검증하는 함수.
                      .required('이메일을 입력해주세요'),
=======
                  initialValues={{
                    email: "",
                    name: "",
                    sId: "",
                    password: "",
                    confirmPassword: "",
                    entryCode: "",
                  }}
                  validationSchema={Yup.object().shape({
                    name: Yup.string().required("이름을 입력해주세요"),
                    sId: Yup.string().required("번호를 입력해주세요"),

                    email: Yup.string()
                      .email("유효하지 않은 이메일입니다")
                      .required("이메일을 입력해주세요"),
>>>>>>> 0894d699bc3670587e918df3e078b9a6cf118c5c
                    password: Yup.string()
                      .min(6, "비밀번호는 최소 6자 이상이어야 합니다.")
                      .required("비밀번호를 입력해주세요"),
                    confirmPassword: Yup.string()
<<<<<<< HEAD
                      .oneOf([Yup.ref('password'), null], 'Passwords must match')
                      .required('Confirm Password is required'),
                    entryCode: Yup.string()
                      .required('선생님이 알려준 entryCode를 입력하세요'),
                  })} //여기까지 initialvalue.
                  onSubmit={(values, {setSubmitting }) => {
=======
                      .oneOf(
                        [Yup.ref("password"), null],
                        "Passwords must match"
                      )
                      .required("Confirm Password is required"),
                    entryCode: Yup.string().required(
                      "선생님이 알려준 entryCode를 입력하세요"
                    ),
                  })}
                  onSubmit={(values, { setSubmitting }) => {
>>>>>>> 0894d699bc3670587e918df3e078b9a6cf118c5c
                    //alert(JSON.stringify(values, null, 2))
                    setTimeout(() => {
                      let dataToSubmit = {
                        email: values.email,
                        password: values.password,
                        name: values.name,
<<<<<<< HEAD
                        entryCode: values.entryCode
                      }; //보낼 데이터에 대해서 저장.
=======
                        entryCode: values.entryCode,
                      };
>>>>>>> 0894d699bc3670587e918df3e078b9a6cf118c5c

                      dispatch(registerUser(dataToSubmit)).then((response) => {
                        if (response.payload.success) {
                          props.history.push("/signin");
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
<<<<<<< HEAD
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            id="email"
                            placeholder="이메일 주소"
                            className="form-control form-control-user"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur} />
                          {errors.email && touched.email && (
                            <div className="input-feedback">{errors.email}</div>
                          )}
                        </div>
                        <button className="col-sm-3 mb-5 mb-sm-0 btn btn-primary">이메일 인증받기</button>
                        {/* <button onClick={this.sendEmail} class="col-sm-3 mb-5 mb-sm-0 btn btn-primary">이메일 인증받기</button> */}
=======
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
                            type="button"
                            class="col-sm-5 mb-5 mb-sm-0 btn btn-primary"
                            style={{ marginLeft: "1rem" }}
                          >
                            이메일 인증받기
                          </button>
>>>>>>> 0894d699bc3670587e918df3e078b9a6cf118c5c
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              id="emailverify"
                              placeholder="이메일 확인 코드"
                              className="form-control form-control-user"
                              type="verifycode"
                            />
                          </div>
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <div class="row">
                              <div class="form-check">
                                가입 유형<br></br> 선택
                              </div>

                              <div
                                class="form-check"
                                style={{ marginLeft: "1rem" }}
                              >
                                <div class="col ">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexRadioDefault1"
                                  >
                                    선생님
                                  </label>
                                </div>
                                <div class="col">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    checked
                                  />
                                  <label
                                    class="form-check-label"
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
                        {/* <div className="form-group">
                          <input
                            id="entryCode"
                            placeholder="참가코드"
                            className="form-control form-control-user"
                            type="entryCode"
                            value={values.entryCode}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.entryCode && touched.entryCode && (
                            <div className="input-feedback">{errors.entryCode}</div>
                          )}
                        </div> */}
<<<<<<< HEAD
                        <button disabled={isSubmitting} className="btn btn-primary btn-user btn-block" type="submit">회원가입</button>
                        {/* <button onClick={handleSubmit} disabled={isSubmitting} className="btn btn-primary btn-user btn-block" type="submit">회원가입</button> */}
=======
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="btn btn-primary btn-user btn-block"
                          type="submit"
                        >
                          회원가입
                        </button>

>>>>>>> 0894d699bc3670587e918df3e078b9a6cf118c5c
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
                          <i className="fab fa-facebook-f fa-fw"></i>{" "}
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

<<<<<<< HEAD


export default withRouter(SignUp);
=======
export default withRouter(SignUp);
>>>>>>> 0894d699bc3670587e918df3e078b9a6cf118c5c
