import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

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
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="kospi" {...a11yProps(0)} />
        <Tab label="Kosdaq" {...a11yProps(1)} />
        <Tab label="dollar" {...a11yProps(2)} />
        <Tab label="S-Group" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />

      </Tabs>
      <TabPanel value={value} index={0}>
        <div
          className="text-xl font-weight-bold text-info text-uppercase mb-1"
        >
          kospi
                                  <i
            className="fas fa-chart-area text-gray-300"
          ></i>
          <sub className="text-gray-600 pl-2"
          >2020.08.15.</sub
          >
    
        </div>
        <div className="row">
          <p className="h2 pl-1">1921</p>
          <p className="p-2 text-danger">
            <i className="fas fa-arrow-up"></i>
                                    20 (+0.13%)
                                  </p>
        </div>

     
      </TabPanel>
      <TabPanel value={value} index={1}>
        코스닥
      </TabPanel>
      <TabPanel value={value} index={2}>
        달러
      </TabPanel>
      <TabPanel value={value} index={3}>
        삼성그룹
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>

    </div>
    </div>
  );
}