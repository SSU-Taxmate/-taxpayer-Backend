import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  //<Tab label="Kosdaq" {...a11yProps(1)} />      <Tab label="dollar" {...a11yProps(2)} />
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

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
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  //vertical tab 테마 설정 const useStyles=
  const classes = useStyles();
  //무슨 값일까panel
  const [value, setValue] = useState(0);
//  const [tabItem, setTabItem] = useState(['kosdaq', 'kospi', 'gold'])
const [tabItem, setTabItem] = useState([{title:'kosdaq',money:'100'},{title:'kospi',money:'200'},{title:'gold',money:'300'}])
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