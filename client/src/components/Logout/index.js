import React from 'react'
import { withRouter } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent,DialogTitle } from '@material-ui/core';
import {  useDispatch } from "react-redux";
import {logoutUser} from '../../redux/_actions'
function LogoutModal(props) {
    const { onClose, open } = props;
    const dispatch = useDispatch()
    
    const LogoutEvent = () => {
        dispatch(logoutUser()).then(response => {
            response=response.payload
            if (response.status === 200) {
                props.history.push("/");
            } else {
                alert('로그아웃에 실패하였습니다.')
            }
        })
    }
    const handleClose = () => {
        onClose();
    };

    return (
        <>
            <Dialog onClose={handleClose} open={open}>
                <DialogContent>
                    <DialogTitle > 로그아웃 하시겠습니까?</DialogTitle>
                    <div className="modal-body">로그아웃하고 싶다면 Logout 버튼을 클릭해주세요</div>
                    <DialogActions>
                        <button className="btn btn-secondary" type="button" data-dismiss="modal" onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" type="button" data-dismiss="modal" onClick={LogoutEvent}>Logout</button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    )
}
export default withRouter(LogoutModal);
