import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/_actions";



function SignIn(props) {

  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  useEffect(() => {
    document.getElementById('body').className = 'bg-gradient-primary'
  }, [])

 
  return (
    <div className="container">
      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center">

        <div className="col-xl-10 col-lg-12 col-md-9">

          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">TaxMate에 오신 걸 환영합니다</h1>
                    </div>
                    <Formik
                      initialValues={{
                        email: initialEmail,
                        password: '',
                      }}
                      validationSchema={Yup.object().shape({
                        email: Yup.string()
                          .email('Email is invalid')
                          .required('Email is required'),
                        password: Yup.string()
                          .min(6, 'Password must be at least 6 characters')
                          .required('Password is required'),
                      })}
                      onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                          let dataToSubmit = {
                            email: values.email,
                            password: values.password
                          };
                          //console.log(values)
                          dispatch(loginUser(dataToSubmit))
                            .then(response => {
                              console.log(response)
                              if (response.payload.loginSuccess) {
                                window.localStorage.setItem('userId', response.payload.userId);
                                if (rememberMe === true) {
                                  //console.log(values)
                                  window.localStorage.setItem('rememberMe', values.email);
                                } else {
                                  localStorage.removeItem('rememberMe');
                                }
                                props.history.push("/classes");
                              } else {
                                setFormErrorMessage('Check out your Account or Password again')
                              }
                            })
                            .catch(err => {
                              setFormErrorMessage('Check out your Account or Password again')
                              setTimeout(() => {
                                setFormErrorMessage("")
                              }, 3000);
                            });
                          setSubmitting(false);
                        }, 500);
                      }}
                    >
                      {props => {
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
                          <>
                            <form onSubmit={handleSubmit} className="user">
                              <div className="form-group">
                                <input id="email" type="email"
                                  className="form-control form-control-user"
                                  placeholder="이메일을 입력해주세요..."
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur} />
                              </div>
                              <div className="form-group">
                                <input id="password" type="password"
                                  className="form-control form-control-user"
                                  placeholder="비밀번호"
                                  vlaue={values.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur} />
                              </div>
                              <div className="form-group">
                                <div className="custom-control custom-checkbox small">
                                  <input id="rememberMe" type="checkbox"
                                    className="custom-control-input"
                                    onChange={handleRememberMe} 
                                    checked={rememberMe}
                                  />
                                  <label className="custom-control-label" htmlFor="rememberMe">Remember Me</label>
                                </div>
                              </div>

                              <button type="submit"
                                className="btn btn-primary btn-user btn-block"
                                disabled={isSubmitting} onSubmit={handleSubmit}>
                                Login
                              </button>
                              <hr />
                              <a href="/classes" className="btn btn-google btn-user btn-block">
                                <i className="fab fa-google fa-fw"></i> Google으로 로그인
                              </a>
                              <a href="/classes" className="btn btn-facebook btn-user btn-block">
                                <i className="fab fa-facebook-f fa-fw"></i> Facebook으로 로그인
                              </a>
                            </form>

                          </>
                        );
                      }}
                    </Formik>

                    <hr />
                    <div className="text-center">
                      <a className="small" href="forgot-password.html">비밀번호를 잊어버리셨습니까?</a>
                    </div>
                    <div className="text-center">
                      <Link className="small" to="/signup">계정 생성</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  )

}

export default withRouter(SignIn);