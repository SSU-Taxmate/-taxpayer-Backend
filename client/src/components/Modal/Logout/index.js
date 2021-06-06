import React, { Component } from 'react'
export default class LogoutModal extends Component {

    render() {
        return (
            <>
                {/**/}
                <div className="modal fade" id='logoutModal' tabIndex="-1" role="dialog" aria-labelledby='logoutModalLabel'
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content p-4" >

                            <div className="modal-header">
                                <div className="modal-title" id="logoutModal" > 로그아웃 하시겠습니까?</div>
                                <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                            <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div class="modal-footer">
                                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a class="btn btn-primary" href="login.html">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>



            </>
        )
    }
}
