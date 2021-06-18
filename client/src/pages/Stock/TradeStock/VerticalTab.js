import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from '../../../components/Tab/TabPanel';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    display: 'flex',
    height: 400,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  //vertical tab 테마 설정 const useStyles=
  const classes = useStyles();
  //무슨 값일까panel
  const [value, setValue] = useState(0);
const [tabItem, setTabItem] = useState(props.tabItem)
  //tab menu선택할 때 마다 변경되는 값
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <sub className="text-gray-600 pl-2">2020.08.15. 10시 업데이트</sub>

      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Stock"
          className={classes.tabs}
        >
          {tabItem.map((item, i) => {
            return (<Tab label={item.title} {...a11yProps(i)} />)
          })
          }

        </Tabs>

        {tabItem.map((item, i) => {
          return (
            <TabPanel value={value} index={i}>
              <div
                className="font-weight-bold text-info text-uppercase mb-1"
              >
                {item.title}
                <i
                  className="fas fa-chart-area text-gray-300"
                ></i>

              </div>
              <div className="row">
                <p className="h2 pl-1">{item.money}</p>
                <p className="p-2 text-danger">
                  <i className="fas fa-arrow-up"></i>
                  20 (+0.13%)
                </p>
              </div>
            </TabPanel>
          )
        })}
      



      </div>
    </div>
  );
}