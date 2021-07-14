import React from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Dialog, DialogActions } from '@material-ui/core';

function LogoutModal(props) {
    const { onClose,  open } = props;
console.log(props.open)
    const LogoutEvent = () => {
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
    const handleClose = () => {
        onClose();
    };
    
    return (
        <>
            {/**/}
            <Dialog onClose={handleClose} open={open}>
                    <div className="modal-content" >
                        <div className="modal-header">
                            <div className="modal-title" id="logoutModal" > 로그아웃 하시겠습니까?</div>
                        </div>
                        <div className="modal-body">"Logout"하고 싶다면 Logout 버튼을 클릭해주세요</div>
                        <div className="modal-footer">
                            <DialogActions>
                            <button className="btn btn-secondary" type="button" data-dismiss="modal"onClick={onClose}>Cancel</button>
                            <button className="btn btn-primary" type="button" data-dismiss="modal" onClick={LogoutEvent}>Logout</button>
                            </DialogActions>
                        </div>
                    </div>
            </Dialog>


        </>
    )
}
export default withRouter(LogoutModal);
