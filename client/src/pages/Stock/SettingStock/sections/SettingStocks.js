import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, TableBody, TableCell, TableHead, TableRow, TableFooter, TablePagination } from '@material-ui/core';
import { useSelector } from "react-redux";
import Loading from '../../../../components/Loading';
import Error from '../../../../components/Error'

import DeleteStockDialog from './DeleteStockDialog';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import AddStockDialog from './AddStockDialog'
import moment from 'moment-timezone';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from "react-router-dom";

function SettingStocks() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [stocks, setstocks] = useState([]);
    let classData = useSelector(state => state.classInfo.classData);
    const column = ['삭제', '이름', '설명', '상장 폐지 예정', '자세히보기'];

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
    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get(`/api/stocks/manage`, { params: { classId: classData.classId } });
            //console.log("/api/stocks/manage", result.data);
            setstocks(result.data)
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        fetchData();
    }, [classData.classId])
    return (
        <div>
            {isError&&<Error/>}
            {isLoading ?
                <Loading /> : (
                    <>
                        <AddStockDialog />
                        <Table aria-label="setting-table" size="small">
                            <TableHead>
                                <TableRow>
                                    {column.map((v, i) =>
                                        <TableCell key={i}>{v}</TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0 ?
                                    stocks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : stocks
                                ).map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell style={{ width: '1rem' }}><DeleteStockDialog stockId={row._id} /></TableCell>
                                        <TableCell style={{ width: '5rem' }}>
                                            {row.stockName}
                                        </TableCell>
                                        <TableCell >{row.description}</TableCell>
                                        <TableCell>{row.ondelete ? moment(row.ondeleteDay).tz('Asia/Seoul').format('YYYY-MM-DD') : ''}</TableCell>
                                        <TableCell >
                                            <Link
                                                to={
                                                    {
                                                        pathname:"/classes/:classId/stock/manage/detail",
                                                        state:{stockId:row._id}
                                                    }
                                                }
                                            >
                                                <ArrowForwardIosIcon />
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: '모두', value: -1 }]}
                                        colSpan={5}
                                        count={stocks.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: { 'aria-label': '한 페이지 당 열수' },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </>
                )
            }

        </div>
    )
}


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

export default SettingStocks
