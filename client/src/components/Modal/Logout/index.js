import React from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LogoutModal (props) {
    
    const LogoutEvent=()=>{
        console.log('LogoutEvent')
        axios.get('/api/users/logout').then(response => {
            if (response.status === 200) {
              //console.log(response)
              props.history.push("/");
            } else {
              alert('Log Out Failed')
            }
          });
    }
        return (
            <>
                {/**/}
                <div className="modal fade" id='logoutModal' tabIndex="-1" role="dialog" aria-labelledby='logoutModalLabel'
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content p-4" >

                            <div className="modal-header">
                                <div className="modal-title" id="logoutModal" > 로그아웃 하시겠습니까?</div>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                            <div className="modal-body">"Logout"하고 싶다면 Logout 버튼을 클릭해주세요</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-primary" type="button" data-dismiss="modal" onClick={LogoutEvent}>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>



            </>
        )
    }
    export default withRouter(LogoutModal);
