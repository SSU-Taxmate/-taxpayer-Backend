import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ShowChartIcon from '@material-ui/icons/ShowChart';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading'

const listStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background,
        position: 'relative',
        overflow: 'auto',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    inline: {
        display: 'inline',
    },
}));


function StockPanel() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    let classData = useSelector(state => state.classInfo.classData);
    const joinedUser = useSelector(state => state.classUser);

    const classes = listStyles();

    let today = new Date();

    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    const date = month + '/' + day;

    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/dashboard/stock`, { params: { classId: classData.classId, studentId: joinedUser.classUser } })
                console.log(result.data)
                setData(result.data)//Alert로 사용자에게 보여주기
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [])
    return (
        <>
            {isError && <Error></Error>}
            {isLoading ?
                <Loading /> : (
                    data &&
                    <>
                        <div className="row justify-content-center ">
                            <div className="col-xl-10 col-md-10 ">
                                <div className=" h-100 py-4">
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <ShowChartIcon className="text-gray-300" fontSize="large" />
                                        </div>
                                        <div className="col mx-4">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">주식</div>
                                            <div className="h5 mb-0 font-weight-bold text-gray-800">오늘의 뉴스</div>
                                        </div>

                                        <div className="col-auto"><span>{date}</span></div>
                                    </div>

                                    <div className="py-2"></div>
                                    <div>
                                        <List className={classes.root} dense={true}>
                                            {data.hint.map((item, i) => (
                                                <div key={i} >
                                                    <ListItem >
                                                        <ListItemText primary={item.prices[0].hint} />
                                                    </ListItem>
                                                    <hr className="m-2" />
                                                </div>))}

                                        </List>
                                    </div>


                                </div>
                            </div>

                        </div>

                        {data.exist&&
                            <div className="row justify-content-center">
                            <div className="col-xl-10 col-md-10 ">
                                <div className="row justify-content-center">


                                    <div className="col-xl-6 col-md-6 col-6 ">
                                        <div className=" h-100 py-2">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        평가 수익률</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{data.evaluatedProfit}%</div>    </div>

                                                <div className="col-auto d-flex">
                                                    {data.evaluatedProfit >= 0 ?
                                                        <ArrowDropUpIcon fontSize="large" className="text-danger" /> : <ArrowDropDownIcon fontSize="large" className="text-primary" />}
                                                </div>


                                            </div></div></div>
                                    <div className="col-xl-6 col-md-6 col-6">
                                        <div className=" h-100 py-2">
                                            <div className="row no-gutters align-items-center">
                                                <div className="col mr-2">
                                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                        평균 등락률</div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{data.fluctuation}%</div>    </div>

                                                <div className="col-auto d-flex">
                                                    {data.fluctuation >= 0 ?
                                                        <ArrowDropUpIcon fontSize="large" className="text-danger" /> : <ArrowDropDownIcon fontSize="large" className="text-primary" />}
                                                </div>


                                            </div></div></div>

                                </div></div>
                        </div>
                        }

                    </>
                )
            }
        </>
    )


}



export default StockPanel;
