import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Transfer from './TransferSection'
import { useSelector } from "react-redux";

import moment from 'moment-timezone';
import {Table,TableBody,TableCell, TableHead, TableRow,TableFooter, TablePagination } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import IconButton from '@material-ui/core/IconButton';

function Account(props) {
    const joinedUser = useSelector(state => state.classUser);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [history, sethistory] = useState([]);
    const [startdate, setstartdate] = useState(moment().tz('Asia/Seoul').subtract(7, 'd').format('YYYY-MM-DD'));//7일전내역까지
    const [enddate, setenddate] = useState(moment().tz('Asia/Seoul').format('YYYY-MM-DD'));//현재날짜
    const column = ['날짜', '입/출금', '값', '잔액','메모'];
    /*페이지 */
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /*날짜 선택*/
    const handlestartdate = (e) => {
        setstartdate(e.target.value)
    }
    const handleenddate = (e) => {
        setenddate(e.target.value)
    }
    const onhandleclick = (e) => {
        fetchData();
    }
    const getDate = (date) => {
        let localtime = moment(date).tz('Asia/Seoul').format('YYYY-MM-DD')
        return localtime
    }
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get(`/api/students/${joinedUser.classUser}/account/history`, 
            { params: { startDate: moment(startdate).tz('Asia/Seoul').startOf('day').utc().format(), 
                endDate: moment(enddate).tz('Asia/Seoul').endOf('day').utc().format() } })
            //console.log("/api/students/:id/account/history", result.data);
            const temp = result.data
            const res = []
            for (let i = 0; i < temp.length; i++) {
                if (temp[i].transactionType == 1) {//입금
                    res.push({ id: temp[i]._id, transactionType: '입금', amount: temp[i].amount, 
                    date: getDate(temp[i].date),
                    afterbalance:temp[i].afterbalance,
                    memo: temp[i].memo })
                } else {//출금
                    res.push({ id: temp[i]._id, transactionType: '출금', amount: temp[i].amount,
                    date: getDate(temp[i].date), 
                    afterbalance:temp[i].afterbalance,
                    memo: temp[i].memo })
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
                                    max={moment().tz('Asia/Seoul').format('YYYY-MM-DD')}
                                    type='date' onChange={handlestartdate} style={{ marginRight: '3px' }}></input>
                                <input id='endDate' defaultValue={enddate}
                                    min={startdate} max={moment().tz('Asia/Seoul').format('YYYY-MM-DD')}
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
                                        {(rowsPerPage>0?
                                        history.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
                                        :history
                                        ).map((row, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{row.date}</TableCell>
                                                <TableCell >
                                                    {row.transactionType}
                                                </TableCell>
                                                <TableCell align="right">{row.amount}</TableCell>
                                                <TableCell align="right">{row.afterbalance}</TableCell>
                                                <TableCell>{row.memo}</TableCell>
                                            </TableRow>
                                        ))}
                                        
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                                count={history.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                    inputProps: { 'aria-label': 'rows per page' },
                                                    native: true,
                                                }}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                                ActionsComponent={TablePaginationActions}
                                            />
                                        </TableRow>
                                    </TableFooter>
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


const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }));
function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <div className={classes.root}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
  