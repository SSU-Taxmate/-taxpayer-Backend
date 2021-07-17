import React, { useEffect, useState } from 'react';
import axios from 'axios'
//Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll';
import Footer from '../../../components/Footer'
import { List, ListItem } from '@material-ui/core';
import Draft from '../../../components/Editor';
import AddLawDialog from './sections/AddLawDialog';
import PreviewDialog from './sections/PreviewDialog'
export default function Law() {

  const [laws, setlaws] = useState([])
  const [updateTime, setupdateTime] = useState('****-**-**')
  const [isLoading, setIsLoading] = useState(false)
  const [err, setIsError] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get('/api/classes/:classId/laws');
        //console.log(result.data)
        setlaws(result.data);
      } catch (error) {
        setIsError(true);

      }
      setIsLoading(false);

    };
    fetchData();
  }, [])

  /******** item 각각에 붙어있는 버튼 *********/
  const handleListItemClick = (claw, action_type) => {
    if (action_type === 'delete') {

      setlaws(laws.filter(law => law._id !== claw._id));
      //console.log('delete',value,action_type)

      axios.delete('/api/classes/:classId/laws', { params: { _id: claw._id } })
        .then(function (response) {
          console.log(response);
        })
        // 응답(실패)
        .catch(function (error) {
          console.log(error);
        })

    } else if (action_type === 'update') {
      claw.issuedate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString()
      axios.put('/api/classes/:classId/laws', claw)
        .then(function (response) {
          console.log(response)
        })

    }
  };
  const onChange = (title, value) => {
    //너무 많이 불리는 거 같은데
    setlaws(laws.map((v, i) => { if (v.title === title) { v.content = value } return v }));
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">

        {/* <!-- Sidebar --> */}
        <Sidebar />
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
              <PageHeading title="법"><PreviewDialog laws={laws}/></PageHeading> 

              <button onClick={handleOpen} className='btn btn-outline-primary ml-4 mb-3' style={{ width: '87%' }}>+</button>
              <AddLawDialog open={open} onClose={handleClose} />

              <List>

                {/* <!-- Content Row --> */}
                {isLoading ? <div>Loading</div> :
                  laws.length == 0 ? <div>법 추가 부탁</div> :
                    laws.map((law, i) => (
                      <ListItem key={law._id} >
                        <div className='col-11'>

                          <div className="form-inline mb-3">
                            <label className="mr-2 my-1" htmlFor={`${law.title}lawtitle`}>제목</label>
                            <input readOnly={true} type="text" className="form-control" id={`${law.title}lawtitle`} defaultValue={law.title}></input>
                            <sub className="pl-3 mt-3">시행일 : {law.issuedate.split('T')[0]} {law.issuedate.split('T')[1].split('.')[0]}</sub>
                          </div>

                          <label className="mr-2 my-1" htmlFor="lawcontent">내용</label>
                          <Draft type='edit' content={law} onChange={onChange} />

                        </div>
                        <div className='col-1'>
                          <div className='row-*'>
                            <button onClick={() => handleListItemClick(law, 'update')} className='btn btn-md btn-outline-primary mb-2' type="submit">수정</button>
                            <button onClick={() => handleListItemClick(law, 'delete')} className='btn btn-md btn-outline-warning mt-2'>삭제</button>
                          </div>
                        </div>
                      </ListItem>
                    )

                    )
                }

              </List>



            </div>
            {/* <!-- /.container-fluid --> */}

          </div>
          {/* <!-- End of Main Content --> */}

          {/* <!-- Footer --> */}
          < Footer />
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


