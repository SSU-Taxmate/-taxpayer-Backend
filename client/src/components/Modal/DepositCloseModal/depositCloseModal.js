import React, { Component } from 'react'
export default class DepositCloseModal extends Component {

    render() {
        return (
            <>
                {/**/}
                <div className="modal fade" id='depositCloseModal' tabIndex="-1" role="dialog" aria-labelledby='depositCloseLabel'
                    aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content p-4" >

                            <div className="modal-header">
                                <div className="modal-title" id="depositCloseModal" > 예금을 해지하시겠습니까?</div>
                                <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>

                            <div className="modal-body">Select "Logout" below if you are ready to end your current session.</div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
                                <a className="btn btn-primary" href="login.html">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>



            </>
        )
    }
}
