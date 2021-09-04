import React ,{useState}from 'react'
//Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll';
import Footer from '../../../components/Footer'
import ProposalDialog from './ProposalDialog'

import { makeStyles, withStyles  } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

import ListItem from '@material-ui/core/ListItem';




const tabStyles = makeStyles((theme)=>({
    root: {
      backgroundColor: theme.palette.background,
    },
  }));

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
  
  const paginationStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
  
  

function Congress() {
    const [title, settitle] = useState()
    const [content, setcontent] = useState()

    const onChange = (content) => {
        setcontent(content)
    };

    const tab=tabStyles();
    const classes = useStyles();
    const pagination =paginationStyles();
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const quorum=10;
    const total=25;

    const [data,setData]=useState([
        {id:"0",title:"직업활동 세금 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"},
        {id:"1",title:"직업활동 세금 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"},
        {id:"2",title:"직업활동 세금 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"},
        {id:"3",title:"직업활동 세금 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"},
        {id:"4",title:"직업활동 세금 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"},
        {id:"5",title:"직업활동 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"},
        {id:"5",title:"직업활동 개정안", student:"배미혜", ayes:4, detail:"세금이 너무 높습니다"},

       
    ])

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

      
        return (
          <div
            className="row justify-content-center"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >

    <div className="card-body d-none d-sm-inline ">
                        <div className="row no-gutters align-items-center mx-4">
                        <div className="col-2 mr-2">
                        <div className="h6 mb-0 text-gray-800 font-weight-bold">만료일</div></div>
                        <div className="col mr-2">
                        <div className="h6 mb-0 text-gray-800 font-weight-bold text-center">제목</div></div>
                        <div className="col-auto h6 mb-0 text-gray-800 font-weight-bold">동의율</div></div>

                        </div>

                    <hr className="m-0 py-1"/>

          <Pagination 
          className="col-12"
          showFirstButton
          showLastButton
          count={Math.ceil(data.length/5)} 
          color="primary" 
          renderItem={(params) =>(
          
          <List className="col-lg-8 ">
              {console.log("pagination",(params.page-1)*5+","+params.page*5-1)}
              {console.log("pagination page",params.page)}

              {data.slice((params.page-1)*5,params.page*5-1).map((item)=>(
                  <div>
                    <div className="card-body" id={"suggest"+item.id}>
                        <div className="row no-gutters align-items-center">
                        <div className="col-2 mr-2 d-none d-sm-inline">
                        <div className="mb-0 font-weight-bold text-gray-500">D-10</div></div>
                        <div className="col mr-2">
                        <div className="h6 mb-0 text-gray-800 font-weight-bold ">{item.title}</div></div>
                        <div className="col-auto h5 font-weight-bold text-primary">{Math.round(item.ayes/quorum*100)+"%"}</div></div>

                        <div className="d-block d-sm-none">
                        <div className="py-2"></div>
                        <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                        <div className="mb-0 font-weight-bold text-gray-500">~ 10/2</div></div>
                        <div className="col-auto text-gray-500">배미혜</div></div></div></div>

                    <hr className="m-0"/></div>
              ))}
          </List>
          
          )}
            
            />

          </div>
        );
      }

    return (
        <div>
            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">

                 
                 
                {/* <!-- End of Sidebar --> */}

                {/* <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* <!-- Main Content --> */}
                    <div id="content">

                        {/* <!-- Topbar --> */}
                        <Topbar />
                        {/* <!-- End of Topbar --> */}

                        {/* <!-- Begin Page Content --> */}
                        <div className="container-fluid">

                            {/* <!-- Page Heading --> */}

                            <PageHeading title="국회(입법)"></PageHeading>
                            {/* <h3>제안리스트</h3> */}
                            {/* <!-- Content Row --> */}
                            {/* <ProposalDialog/>
                            <Fab color="primary" aria-label="add"><AddIcon /></Fab> */}
                            <div className="row justify-content-center">
                                <div className="col-12">
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        centered>
                
                        <Tab label="법률 제안" />
                        <Tab label="안건 투표" />

                        </Tabs>

                        
                        <TabPanel value={value} index={0}></TabPanel>
                        <TabPanel value={value} index={1}></TabPanel>
                        </div>

</div>

                        </div>
                        {/* <!-- /.container-fluid --> */}

                    </div>
                    {/* <!-- End of Main Content --> */}

                    {/* <!-- Footer --> */}
                    <Footer />
                    {/* <!-- End of Footer --> */}

                </div>
                {/* <!-- End of Content Wrapper --> */}

            </div>
            {/* <!-- End of Page Wrapper --> */}

            {/* <!-- Scroll to Top Button--> */}

            <ScrollToTop />
        </div>

    )
}

export default Congress
