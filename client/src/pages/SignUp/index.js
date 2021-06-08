import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

class SignUp extends Component {
    componentWillMount(){
        document.getElementById('body').className='bg-gradient-primary'
      }

    render() {
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
                      <form className="user">
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input type="text" className="form-control form-control-user" id="FirstName" placeholder="성" />
                          </div>
                          <div className="col-sm-6">
                            <input type="text" className="form-control form-control-user" id="LastName" placeholder="이름" />
                          </div>
                        </div>
                        <div className="form-group">
                          <input type="email" className="form-control form-control-user" id="InputEmail" placeholder="이메일 주소" />
                        </div>
                        <div className="form-group row">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input type="password" className="form-control form-control-user" id="InputPassword" placeholder="비밀번호" />
                          </div>
                          <div className="col-sm-6">
                            <input type="password" className="form-control form-control-user" id="RepeatPassword" placeholder="비밀번호 확인" />
                          </div>
                        </div>
                        <div className="form-group row">
                          <div className="col">
                            <input type="password" className="form-control form-control-user" id="entrycode" placeholder="참가코드" />
                          </div>
                          
                        </div>
                        <Link className="btn btn-primary btn-user btn-block" to="/">회원가입</Link>

                        <hr/>
                        <a href="index.html" className="btn btn-google btn-user btn-block">
                          <i className="fab fa-google fa-fw"></i> Google로 로그인하기
                        </a>
                        <a href="index.html" className="btn btn-facebook btn-user btn-block">
                          <i className="fab fa-facebook-f fa-fw"></i> Facebook으로 로그인하기
                        </a>
                      </form>
                      <hr/>
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">비밀번호를 잊어버리셨습니까?</a>
                      </div>
                      <div className="text-center">
                        <Link className="small" to="/">이미 계정이 있나요? 로그인하러가기!</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        
          </div>
        )
    }
}

export default withRouter(SignUp);