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
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary" href="/">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>



            </>
        )
    }
}
