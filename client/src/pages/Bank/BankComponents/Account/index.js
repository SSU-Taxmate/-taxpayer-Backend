import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Transfer from '../Transfer';
import { useSelector } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import moment from 'moment-timezone';
function Account(props) {
    const joinedUser = useSelector(state => state.classUser);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [history, sethistory] = useState([]);
    const [startdate, setstartdate] = useState(moment().subtract(7, 'd').format('YYYY-MM-DD'));//7일전내역까지
    const [enddate, setenddate] = useState(moment().format('YYYY-MM-DD'));//현재날짜
    const column = ['날짜', '입/출금', '값', '메모'];
    const handlestartdate = (e) => {
        setstartdate(e.target.value)
    }
    const handleenddate = (e) => {
        setenddate(e.target.value)
    }
    const onhandleclick = (e) => {
        fetchData();
    }
    const getDate=(date)=>{
        let localtime=moment(date).tz('Asia/Seoul').format('YYYY-MM-DD')
        return localtime
      }
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get(`/api/students/${joinedUser.classUser}/account/history`, { params: { startDate: startdate, endDate: moment(enddate).add(1, 'd').format('YYYY-MM-DD') } })
            //console.log("/api/students/:id/account/history", result.data);
            const temp = result.data
            const res = []
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].transactionType == 1) {//입금
                    res.push({ id: temp[i]._id, transactionType: '입금', amount: temp[i].amount, date: getDate(temp[i].date.split('T')[0]), memo: temp[i].memo })
                } else {//출금
                    res.push({ id: temp[i]._id, transactionType: '출금', amount: temp[i].amount, date: getDate(temp[i].date.split('T')[0]), memo: temp[i].memo })
                }
            }
            sethistory(res)

        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div id="account">
            <div className="row py-3 justify-content-center">
                <div className="account-card shadow justify-content-center col-md-12 bg-white">
                    <div className="text-sm">{props.user}님의 계좌</div>
                    <div className="text-center py-4" > <h1> $ {props.balance} </h1></div>
                    <hr />
                    <div className="accordion">
                        <div className="justify-content-center d-flex" id="headingOne">
                            <div className="p-2"><button className="btn" type="button" data-toggle="collapse" data-target="#transfer" aria-expanded="true" aria-controls="collapseOne">
                                이체
                            </button>
                            </div>

                            <div className="p-2">
                                <button className="btn collapsed" type="button" data-toggle="collapse" data-target="#bank_statement" aria-expanded="false" aria-controls="collapseTwo">
                                    이용내역
                                </button>
                            </div>
                        </div>

                        <div id="transfer" className="collapse" aria-labelledby="transfer" >
                            <div><Transfer /></div>
                        </div>
                        <div id="bank_statement" className="collapse" aria-labelledby="bank_statement" >
                            <div style={{ textAlign: 'right' }}>
                                <input id='startDate' defaultValue={startdate}
                                    max={moment().format('YYYY-MM-DD')}
                                    type='date' onChange={handlestartdate} style={{ marginRight: '3px' }}></input>
                                <input id='endDate' defaultValue={enddate}
                                    min={startdate} max={moment().format('YYYY-MM-DD')}
                                    type='date' onChange={handleenddate} style={{ marginRight: '3px' }}></input>
                                <button onClick={onhandleclick}>조회하기</button>
                            </div>
                            {history &&
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            {column.map((v, i) =>
                                                <TableCell key={i}>{v}</TableCell>
                                            )}

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {history.map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    {row.transactionType}
                                                </TableCell>
                                                <TableCell align="right">{row.amount}</TableCell>
                                                <TableCell>{row.memo}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )




}

export default Account;

