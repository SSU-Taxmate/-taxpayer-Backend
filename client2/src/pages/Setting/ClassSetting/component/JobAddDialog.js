import React, { useState } from 'react'
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField'
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { IconButton } from '@material-ui/core';
import { useSelector } from 'react-redux';
import axios from 'axios';
export default function JobAddDialog() {
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState()
    let classData = useSelector(state => state.classInfo.classData);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const onChange = (e) => {

        const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
        setInputs({
            ...inputs, // 기존의 input 객체를 복사한 뒤
            [name]: value // name 키를 가진 값을 value 로 설정
        });

    };
    const onhandlesubmit = (e) => {
        axios.post("/api/jobs", {
            ...inputs,
            classId: classData.classId,
          })
          .then(response => {
            console.log(response);
            handleClose();
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
        <>

            <IconButton onClick={handleClickOpen}><AddRoundedIcon /></IconButton>
            <Dialog
                open={open}
                aria-labelledby="dialog-deposit-close"
                onClose={handleClose}
            >
                <div className="card col-lg-12 p-0">


                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">직업 추가</h6>
                        <div className="dropdown no-arrow">
                            <IconButton onClick={onhandlesubmit}><CheckRoundedIcon /></IconButton>
                        </div>
                    </div>
                    <div className="card-body">

                        <div className="row" style={{'alignItems':'center'}}>
                            <div className="text-center font-weight-bold m-2 job-label">직업이름</div>
                            <div className="seperator-gray m-2"></div>
                            <TextField
                                className="text-gray-900 text-center m-2 job-input"
                                name="name"
                                required
                                onChange={onChange}
                                variant="outlined"
                                size="small"
                                margin="none"

                            />
                        </div>

                        <div className="row"style={{'alignItems':'center'}}>
                            <div className="text-center font-weight-bold m-2 label job-label">월급</div>
                            <div className="seperator-gray m-2"></div>
                            <TextField
                                className="text-gray-900 text-center m-2 job-input"
                                name="salary"
                                required
                                onChange={onChange}
                                variant="outlined"
                                size="small"
                                margin="none"
                            />
                        </div>
                        <div className='row'style={{'alignItems':'center'}}>
                            <div className="font-weight-bold m-2 job-label">모집인원</div>
                            <div className="seperator-gray m-2"></div>
                            <TextField
                                className="text-gray-900 m-2 job-input"
                                name="recruitment"
                                required
                                onChange={onChange}
                                variant="outlined"
                                size="small"
                                margin="none"
                            />
                        </div>
                        <hr />

                        <div className="row">
                            <div className="text-center font-weight-bold mx-2 job-label">업무내용</div>
                        </div>

                        <div className="row py-2">
                            <TextField
                                className="text-gray-900 text-center m-2 job-input col-lg-12 px-4"
                                name="whatdo"
                                required
                                multiline
                                rows={4}
                                onChange={onChange}
                                variant="outlined"
                                margin="none"
                            />
                        </div>
                    </div>
                </div>



            </Dialog>
        </>
    )
}
