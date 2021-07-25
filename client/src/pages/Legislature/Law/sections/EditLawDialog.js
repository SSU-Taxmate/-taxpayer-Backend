import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import { Button } from '@material-ui/core';
import axios from 'axios';
import Draft from '../../../../components/Editor';
const moment=require('moment-timezone');

function EditLawDialog(props) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [editedLaw, setEditedLaw] = useState(props.data)
    const handleSubmit = (e) => {
        //e.preventDefault();
        
        axios.put('/api/classes/:classId/laws', editedLaw)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    };
    const getDate=(date)=>{
        let localtime=moment(date).tz('Asia/Seoul').format()
        return localtime
      }
    
    const onChange = (content) => {
        //console.log(content)
        setEditedLaw({"_id":editedLaw._id, "title": editedLaw.title, 'content': content ,"issuedate":getDate(new Date())});
    };

    return (
        <>
            <div>        
            <button onClick={handleOpen} className='btn btn-outline-primary mb-3' >수정</button>
            </div>
            <Dialog aria-labelledby="law-dialog-title" open={open}>
                <DialogTitle id="law-dialog-title">법 수정</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>


                        <label className="mr-2 my-1" htmlFor={`${editedLaw.title}lawtitle`}>제목</label>
                        <div className="form-inline mb-3">
                            <input readOnly={true} type="text" className="form-control" id={`${editedLaw.title}lawtitle`} defaultValue={editedLaw.title}></input>
                            <sub className="pl-3 mt-3">시행일 : {getDate(editedLaw.issuedate).split('T')[0]} {getDate(editedLaw.issuedate).split('T')[1].split('+')[0]}</sub>{/* */}
                        </div>

                        <label className="mr-2 my-1" htmlFor="lawcontent">내용</label>
                        {editedLaw &&
                            <Draft type='edit' content={{ 'content': editedLaw.content }} onChange={onChange} />

                        }

                        <div>
                            정말 수정하시겠습니까?
                            발행일이 변경됩니다.
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={handleClose} type="submit">네</Button>
                        <Button color="primary" onClick={handleClose}>아니요</Button>
                    </DialogActions>
                </form>

            </Dialog>
        </>
    )
}

export default EditLawDialog

