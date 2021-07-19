import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardCollapse from '../../../../components/Cards/Collapse'
import Viewer from '../../../../components/Editor/Viewer';
export default function PreviewDialog(props) {
    const {laws}=props;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button className='btn btn-outline-primary ml-4 mb-3' onClick={handleClickOpen}>
                미리보기
            </button>
            <Dialog
                fullScreen
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"학생들에게 이렇게 보여집니다."}</DialogTitle>
                <DialogContent>
                   { laws.map((law, i) => (
                       <CardCollapse title={law.title}area_id={`id${law.title}`} key={law.title}><Viewer content={law.content}/></CardCollapse>
                   ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}