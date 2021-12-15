import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
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
function TodayNews() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    let classData = useSelector(state => state.classInfo.classData);

    let today = new Date();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);
    const date = month + '/' + day;

    const [data, setData] = useState();
    const classes = listStyles();
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get(`/api/dashboard/stock/news`, { params: { classId: classData.classId } })
                console.log(result.data)
                setData(result.data)
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [])
    return (
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
                            {isError ? <Error /> :
                                isLoading ? <Loading /> :
                                    data && data.map((item, i) => (
                                        <div key={i} >
                                            <ListItem >
                                                <ListItemText primary={item.prices[0].hint} />
                                            </ListItem>
                                            <hr className="m-2" />
                                        </div>))
                            }
                        </List>
                    </div>


                </div>
            </div>

        </div>
    )
}

export default TodayNews
