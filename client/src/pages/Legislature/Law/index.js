import React, { useEffect, useState } from 'react';
import axios from 'axios'
//Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll';
import Footer from '../../../components/Footer'
import {List, ListItem } from '@material-ui/core';
import Draft from '../../../components/Editor';
export default function Law() {

  const [laws, setlaws] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [err, setIsError] = useState(false);
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

  const handleListItemClick = (_id, action_type) => {
    if (action_type === 'delete') {
     
          setlaws(laws.filter(law => law._id !== _id));
          //console.log('delete',value,action_type)

          axios.delete('/api/classes/:classId/laws',{params: {_id:_id}})
          .then(function (response) {
            console.log(response);
          })
          // 응답(실패)
          .catch(function (error) {
            console.log(error);
          })
          
    }else if (action_type==='update'){
      //setlaws(...laws,value)
      console.log(_id)
    }
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

              <PageHeading title="법"><h5>시행일 2021-06-26</h5></PageHeading>
              <List>
                {/* <!-- Content Row --> */}
                {isLoading ? <div>Loading</div> :
                  laws.map((law, i) => (
                    <ListItem key={law.title} >
                      <div className='col-11'>
                        <form>
                                <div className="form-inline mb-3">
                                    <label className="mr-2 my-1" htmlFor="lawtitle">제목</label>
                                    <input type="text" className="form-control" id="lawtitle" defaultValue={law.title}></input>
                                </div>
                                <div className="form-inline">

                                    <label className="mr-2 my-1" htmlFor="lawcontent">내용</label>
                                    <Draft id='lawcontent' editorState={law.content}/>
                                </div>
                            </form>
                      </div>
                      <div className='col-1'>
                        <div className='row-*'>
                        <button onClick={() => handleListItemClick(law._id, 'update')} className='btn btn-md btn-outline-primary mb-2'>등록</button>
                        <button onClick={() => handleListItemClick(law._id, 'delete')} className='btn btn-md btn-outline-warning mt-2'>삭제</button>
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


