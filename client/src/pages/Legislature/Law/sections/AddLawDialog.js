import React, { useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Draft from '../../../../components/Editor';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import { blue } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

export default function AddLawDialog(props) {
    const classes = useStyles();
    const { onClose, open } = props;
    const [lawtitle,setlawtitle]=useState('')
    const [lawcontent, setlawcontent] = useState({})//{title:'',content:''}

    const handleClose = () => {
        onClose();
    };
    const handleSubmit = (e) => {
        //e.preventDefault();
        const issuedate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString()
        axios.post('/api/classes/:classId/laws',{"title":lawtitle,"content":lawcontent,"issuedate":issuedate})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    const onTitleChange = (e) => {
        setlawtitle(e.target.value);
      };
    const onContentChange = (value) => {/*editor에서 현재 editor 값 넘겨줌 */
        setlawcontent(value);
      };
    return (
        <Dialog aria-labelledby="law-dialog-title" open={open}>
            <DialogTitle id="law-dialog-title">법 추가</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <div className="form-inline mb-3">
                        <label className="mr-2 my-1" htmlFor='newlawtitle'>제목</label>
                        <input type="text" onChange={onTitleChange} className="form-control" id='newlawtitle'/>
                    </div>
                    <label className="mr-2 my-1" htmlFor='newlawcontent'>내용</label>
                    <Draft type='create' onChange={onContentChange} />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleClose} type="submit">추가</Button>
                    <Button color="primary" onClick={handleClose}>취소</Button>
                </DialogActions>
            </form>

        </Dialog>
    );
}

AddLawDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

