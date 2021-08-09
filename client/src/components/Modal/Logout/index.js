import React from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent,DialogTitle } from '@material-ui/core';
import {  useDispatch } from "react-redux";
import {logoutUser} from '../../../redux/_actions'
function LogoutModal(props) {
    const { onClose, open } = props;
    //console.log(props.open)
    const dispatch = useDispatch()
    
    const LogoutEvent = () => {
       // console.log('LogoutEvent')
        dispatch(logoutUser()).then(response => {
            //console.log('LOGOUTUSER3',response.payload)
            response=response.payload
            if (response.status === 200) {
                //console.log(response)
                props.history.push("/");
            } else {
                alert('Log Out Failed')
            }
        })
    }
    const handleClose = () => {
        onClose();
    };

    return (
        <>
            {/**/}
            <Dialog onClose={handleClose} open={open}>
                <DialogContent>
                    <DialogTitle > 로그아웃 하시겠습니까?</DialogTitle>
                    <div className="modal-body">"Logout"하고 싶다면 Logout 버튼을 클릭해주세요</div>
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
